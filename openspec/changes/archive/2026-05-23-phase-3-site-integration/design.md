## Context

Після Фази 2 маємо дві незалежні системи зі спільною PostgreSQL як єдиним мостом. CRM пише у `crm_*` таблиці та читає site-таблиці через SQLAlchemy `SiteBase` (readonly). NestJS пише у site-таблиці через Prisma. Cross-service комунікація вже є одним прецедентом: CRM → NestJS `/internal/storage/*` через HTTP з `X-Internal-Key`. Цей патерн масштабується на нові internal endpoints.

Сайт (Next.js) є публічним фасадом — клієнти взаємодіють без реєстрації. Гараж потребує Phone OTP авторизації. CRM — закритий back-office для staff.

## Goals / Non-Goals

**Goals:**
- Замкнути петлю: Booking (сайт) → Lead (CRM) → WorkOrder → ServiceRecord (сайт)
- Усунути всі відомі UX-баги сайту (404 `/garage/add`, відсутній timepicker, порожня сервісна книга)
- Довести сайт до рівня реального продукту (контакти, ціни, профіль)
- Зберегти ізоляцію: CRM не звертається до site-таблиць напряму для запису — тільки через NestJS internal API

**Non-Goals:**
- Real-time WebSocket нотифікації (Фаза 4+)
- Мобільний застосунок
- Мультибрендовість / мультилокація
- Фінансова інтеграція (виставлення рахунку клієнту через сайт)

## Decisions

### D1 — CRM не пише в site-таблиці напряму

**Рішення:** CRM викликає NestJS internal API для всіх записів у site-таблиці. Ні `service_records`, ні `booking.status` CRM не оновлює через SQLAlchemy напряму.

**Чому:** Prisma є єдиним власником site-схеми. Якщо CRM почне писати напряму — порушення інваріанту "одне джерело правди для міграцій". Якщо схема зміниться, Alembic не знатиме. Також: NestJS може валідувати, надсилати SMS, інвалідувати кеші — це неможливо якщо CRM пише в обхід.

**Альтернатива розглянута:** Shared write через SQLAlchemy — відхилено (creeping ownership).

**Нові internal endpoints на NestJS:**
```
PATCH /internal/bookings/:id/status   { status, notes? }
POST  /internal/service-records       { vehicleId, bookingId?, ...fields }
POST  /internal/sms                   { phone, template, params }
```
Всі захищені `X-Internal-Key`.

---

### D2 — CRM читає `bookings` через SiteBase (readonly)

**Рішення:** Додати `SiteBooking` і `SiteVehicle` до `site_readonly.py` у CRM, аналогічно до існуючих `SiteUser`, `CatalogListing`. CRM-сторінка "Вхідні заявки" робить SELECT із join на `vehicles`.

**Чому:** Немає сенсу дублювати дані в `crm_*` таблиці. Booking вже є у shared DB. Читання — безпечно.

---

### D3 — Конвертація Booking → WorkOrder: явна дія менеджера

**Рішення:** Менеджер у CRM натискає "Прийняти заявку" → CRM:
1. Викликає `PATCH /internal/bookings/:id/status { status: "CONFIRMED" }` → NestJS надсилає SMS клієнту
2. Створює `crm_client_profile` (Shadow User вже є або буде створений)
3. Створює `crm_work_order` з `source_booking_id` (нове nullable поле)

**Чому:** Не автоматична конвертація, бо менеджер має перевірити доступність слоту, уточнити деталі. Автоматика тут — антипатерн для малого бізнесу.

**Нове поле у `crm_work_orders`:**
```sql
source_booking_id VARCHAR(36) NULL  -- UUID з bookings
```

---

### D4 — Dual-write service_records при закритті WorkOrder

**Рішення:** При переведенні WorkOrder у статус `COMPLETED` у CRM:
- Якщо `source_booking_id` є → пошук `booking.vehicleId`
- CRM викликає `POST /internal/service-records` з даними зі WorkOrder
- NestJS записує у `service_records` і лінкує до `bookings`

**Якщо source_booking_id немає:** Механік вручну ввів WorkOrder (не з сайту) → service_record не пишеться. Гараж показує тільки записи що прийшли через сайт.

**Чому не завжди писати:** Авто може не бути в `vehicles` таблиці (якщо WorkOrder без booking source). Не варто форсувати створення vehicle без user — Гараж тоді показував би "чужі" авто.

---

### D5 — Підфази як окремі OpenSpec changes (майбутні)

**Рішення:** Ця change (`phase-3-site-integration`) є **плануванням** — визначає фази, specs та задачі. Кожна підфаза при реалізації стане окремим `openspec new change`:
- `site-ux-fixes` → Підфаза 3.1
- `crm-booking-intake` → Підфаза 3.2
- `crm-service-writeback` → Підфаза 3.3
- `site-catalog-profile` → Підфаза 3.4

**Чому:** Підфази незалежні між собою (3.1 — суто frontend, 3.2 — CRM + internal API). Окремі changes дають чіткий статус і архів по кожній.

---

### D6 — Слоти бронювання: UI на основі існуючого API

**Рішення:** `GET /bookings/slots?serviceType=STO&date=2026-05-25` вже існує. Потрібно лише DatePicker у `/book` + fetch слотів при зміні дати. Обмеження слотів (максимум паралельних записів) контролюється на рівні API.

---

### D7 — Site SMS через internal API

**Рішення:** CRM викликає `POST /internal/sms` замість прямого звернення до SMS-провайдера. NestJS має `SmsQueue` (BullMQ). CRM не тримає SMS credentials.

**Шаблони для нових SMS:**
- `booking_confirmed`: "Ваш запис підтверджено на {date}. Слідкуйте: {trackingUrl}"
- `booking_cancelled`: "Ваш запис скасовано. Телефон: {phone}"
- `car_ready`: "Ваш автомобіль готовий. Вартість: {cost} грн"

## Risks / Trade-offs

**[R1] SiteBase моделі можуть відставати від Prisma схеми**
→ Mitigation: `site_readonly.py` перевіряти при кожній Prisma міграції. Додати коментар у `env.py` Alembic з посиланням.

**[R2] NestJS internal API — single point of failure для CRM write-операцій**
→ Mitigation: Retry логіка у CRM (`httpx` з 3 спробами, exponential backoff). Якщо NestJS недоступний — WorkOrder закривається але пишеться в лог "service_record pending".

**[R3] Booking без vehicleId (гість не вказав авто)**
→ Mitigation: `source_booking_id` є, але vehicleId = null → service_record не пишеться. WorkOrder все одно закривається нормально.

**[R4] Дублювання клієнта при конвертації Booking → WorkOrder**
→ Mitigation: Shadow User lookup за phone вже реалізований (Фаза 2.3). Якщо `crm_client_profile` вже є з тим самим `user_id` → використовуємо існуючий, не дублюємо.

**[R5] Тимчасовий стан: Гараж показує порожню сервісну книгу до появи WorkOrder-ів з CRM**
→ Прийнятно. Старі `service_records` (якщо є) залишаться. Нові з'являться поступово.

## Migration Plan

**Порядок деплою підфаз:**
1. **3.1 спочатку** — незалежна, ніяких нових API. Виправляє баги сайту.
2. **NestJS internal endpoints** — перед 3.2. CRM не може підтверджувати без них.
3. **3.2** — CRM incoming bookings. Тестується з реальними бронюваннями.
4. **3.3** — Після стабілізації 3.2. WorkOrder → ServiceRecord.
5. **3.4** — Незалежна від 3.2/3.3. Паралельно або після.

**Alembic міграції для 3.2:**
```sql
ALTER TABLE crm_work_orders ADD COLUMN source_booking_id VARCHAR(36) NULL;
```

**Rollback:** Кожна підфаза ізольована. Відкат 3.2 не ламає 3.1.

## Open Questions

- **Ціни на послуги:** Вводити хардкодом у JSX сторінок послуг (просто і достатньо для MVP), чи додати таблицю `service_price_list` у БД з редагуванням з CRM? → Рекомендація: хардкод в 3.1, таблиця в Фазі 4.
- **Трекінг-сторінка `/book/[id]`:** Без логіну — чи достатньо знати `bookingId` (UUID)? UUID не вгадується, але й не особливо секретний. Додати phone-верифікацію? → Рекомендація: UUID достатньо для MVP.
- **Каталог фільтри:** Client-side фільтрація (якщо оголошень < 200) чи серверна пагінація з query params? → Рекомендація: серверна, бо API вже пагінує.
