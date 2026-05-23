## Why

Фаза 2 CRM завершена — є повноцінний бек-офіс. Але сайт і CRM живуть ізольовано: бронювання з сайту не потрапляють у CRM, виконана робота не відображається у Гаражі клієнта. Крім інтеграції, сайт залишається на рівні MVP: немає вибору часу в бронюванні, сторінка `/garage/add` веде в 404, сторінки послуг без цін, відсутні контакти та footer. Фаза 3 одночасно замикає петлю даних між системами і доводить сайт до якості реального продукту.

## What Changes

**Підфаза 3.1 — Критичні баги та базовий UX сайту**
- Сторінка `/garage/add` — форма додавання авто до Гаражу (посилання є, сторінки нема)
- Вибір часового слоту в `/book` (backend `GET /bookings/slots` є, UI нема)
- Сторінка відстеження статусу запису `/book/[id]` (без логіну)
- Footer з контактами, адресою, годинами роботи
- Сторінки `/services/sto` та `/services/tire` з переліком послуг та цінами

**Підфаза 3.2 — Інтеграція: Booking → CRM**
- CRM отримує сторінку "Вхідні заявки" — читає `bookings` зі спільної БД
- CRM підтверджує / скасовує бронювання (пише `booking.status` назад)
- CRM конвертує Booking → WorkOrder одним кліком (Shadow User вже реалізований)
- SMS клієнту при підтвердженні або скасуванні (через NestJS `/internal/sms`)

**Підфаза 3.3 — Інтеграція: WorkOrder → Гараж**
- При закритті WorkOrder у CRM → запис у `service_records` (shared DB) → Гараж оживає
- Клієнт у Гаражі бачить реальну сервісну книгу: що зробили, запчастини, вартість, дата
- Посилання "Записати на сервіс" у деталях авто у Гаражі (prefill vehicle у `/book`)

**Підфаза 3.4 — Каталог та профіль клієнта**
- Фільтри у каталозі: марка, рік, ціна
- Сторінка профілю клієнта (ім'я, email, всі бронювання)
- Форма заявки на оцінку авто (`/catalog/evaluate`) — підключення до `catalog_inquiries`

## Capabilities

### New Capabilities
- `site-booking-slots`: UI вибору часового слоту при бронюванні + сторінка трекінгу статусу
- `site-garage-add-vehicle`: Форма ручного додавання авто до Гаражу
- `site-service-pages`: Сторінки послуг СТО/Шиномонтаж з цінами + footer з контактами
- `crm-incoming-bookings`: CRM-сторінка вхідних заявок із сайту (читання `bookings`, зміна статусу, конвертація у WorkOrder)
- `crm-to-site-writeback`: Запис `service_records` після закриття WorkOrder у CRM
- `site-client-profile`: Сторінка профілю клієнта на сайті
- `site-catalog-filters`: Фільтри та пошук у каталозі авто

### Modified Capabilities
- `booking-flow`: додається вибір слоту та трекінг статусу — зміна поведінки існуючого флоу
- `garage`: додається зв'язок з CRM через `service_records` та кнопка запису з Гаражу
- `crm-work-orders`: додається конвертація Booking → WorkOrder та dual-write у `service_records`

## Impact

**NestJS API:**
- Новий internal endpoint `/internal/sms` для SMS-нотифікацій з CRM
- Ендпоінт `PATCH /internal/bookings/:id/status` для CRM (статус підтвердження)
- `POST /internal/service-records` — CRM пише сервісну книгу (новий internal endpoint)

**CRM (FastAPI + React):**
- Новий router `incoming_bookings.py` + відповідна frontend-сторінка
- Оновлений WorkOrder flow: кнопка "Конвертувати з бронювання"
- При `PUT /work-orders/:id/status → COMPLETED` — виклик NestJS internal API

**Site (Next.js):**
- `/book` — date/time picker з доступними слотами
- `/book/[id]` — сторінка трекінгу (публічна)
- `/garage/add` — нова сторінка
- `/garage/[id]` — кнопка "Записатись" + повна сервісна книга
- `/services/sto`, `/services/tire` — реальний контент
- `/catalog` — фільтри
- `/profile` — новa сторінка

**Shared DB:** CRM отримує write-доступ до `service_records` (зараз readonly у SQLAlchemy)
