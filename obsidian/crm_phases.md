# CRM — Архітектура та Фазування

> Статус: `✅ ФАЗА 2 ЗАВЕРШЕНА` — всі підфази реалізовані (2.1 / 2.2 / 2.3)

---

## Ключові архітектурні рішення

### Розміщення
- **Окрема папка** поруч із сайтом: `~/Documents/auto-crm/` (не в монорепо сайту)
- **Спільна PostgreSQL БД** — CRM читає таблиці сайту, але не керує їхніми міграціями
- **Prefix `crm_`** — усі CRM-таблиці мають цей префікс; тільки вони у власності Alembic

### Технічний стек CRM
| Шар | Технологія |
|-----|-----------|
| Backend | **FastAPI** (Python) + SQLAlchemy |
| Міграції | **Alembic** (тільки `crm_*` таблиці) |
| Frontend | **Vite + React + TypeScript** |
| Стан / Запити | **TanStack Query** |
| Auth (CRM) | Email + Password (JWT). Акаунти створює адмін. |
| БД | Спільна PostgreSQL (читає site-таблиці через SQLAlchemy моделі без міграцій) |

### Принципи розділення
- Prisma → міграції site-таблиць (без `crm_` префіксу)
- Alembic → міграції тільки `crm_*` таблиць
- CRM-моделі описують ВСІ таблиці (і site, і crm) для JOIN'ів, але генерують міграції лише для `crm_*`
- `SiteBase` / `Base` розділення: site-таблиці у SQLAlchemy через окремий `declarative_base()` — Alembic `include_object` фільтрує лише `crm_*`
- Акаунти CRM **відокремлені** від акаунтів сайту (окрема таблиця `crm_staff_users`)

### Тіньовий клієнт (Shadow User) — виправлений в Фазі 2.3
- Walk-in клієнти в CRM зберігаються з nullable `user_id` в `crm_client_profiles`
- При збереженні клієнта з телефоном → CRM шукає `users.phone`; якщо немає — створює запис
- **Критичний баг-фікс (2026-05-23):** Prisma-схема використовує `status = 'SHADOW'` (не `account_type`), а `id` — UUID-рядок (не BigInteger). Тепер CRM генерує UUID через `uuid4()`, а не через DB serial.
- Гонка (concurrent insert): `IntegrityError` перехоплюється, обидва запити прив'язуються до одного існуючого запису.

### RBAC
- Адмін є першим і головним, може створювати інших staff users
- Адмін конфігурує типи ролей та набори permissions (рядки типу `workorders:read`, `cash:open_session`)
- Права прив'язані до ролей, а не до конкретних юзерів напряму
- Ендпоінт `GET /auth/me` повертає масив `permissions` для поточного staff user → використовується для permission-gated sidebar у React

---

## Фаза 2.1 — Ядро CRM `✅ Завершено 2026-05-22`

**Мета:** Мінімально працюючий back-office для прийняття та обробки замовлень

### Модулі
| Модуль | Таблиці | Опис |
|--------|---------|------|
| Staff Auth | `crm_staff_users`, `crm_roles`, `crm_role_permissions` | Email+password, JWT, RBAC (адмін-конфігурований) |
| WorkOrders | `crm_work_orders`, `crm_work_order_items` | Наряди-замовлення: статус, виконавець, позиції (послуги/запчастини) |
| Invoices | `crm_invoices`, `crm_invoice_items` | Рахунок генерується з WorkOrder; ПДВ опціональний (toggle на рівні компанії); знижки на весь рахунок або по позиціях |
| Payments | `crm_payments` | Типи: CASH / CARD / BANK_TRANSFER / OTHER; частинні оплати |
| Cash Register | `crm_cash_sessions`, `crm_cash_transactions` | Відкриття/закриття зміни; прив'язка до касира; транзакції |
| Client DB | `crm_client_profiles` | Профілі клієнтів у CRM (linked або standalone від site users) |
| Employee DB | `crm_employees` | Дані працівників: ставка, посада, ФОП / найманий |

### Ключові бізнес-правила
- WorkOrder → Invoice (автоматично при переведенні в статус "Готово до оплати")
- Invoice → Payment(s) (один або кілька, до повного погашення)
- Касир закриває зміну → система підбиває підсумок по cash-транзакціях
- ПДВ: конфігурується на рівні компанії (`crm_company_settings`), відображається або ні в рахунку

---

## Фаза 2.2 — Склад та Бюджет `✅ Завершено 2026-05-22`

**Мета:** Облік запчастин та витрат

### Модулі
| Модуль | Таблиці | Опис |
|--------|---------|------|
| Parts / Inventory | `crm_parts`, `crm_inventory_items`, `crm_inventory_transactions` | Каталог запчастин, облік залишків, прихід/витрата |
| Warehouses | `crm_warehouses` | Декілька складів, фізичні адреси |
| Purchase Orders | `crm_purchase_orders`, `crm_purchase_order_items` | Замовлення постачальникам (контрагенти) |
| Expense Categories | `crm_expense_categories`, `crm_expenses` | Статті витрат; ручне або авто-запис |
| Budgeting | `crm_category_budgets` | Бюджет по категоріях на місяць/квартал/рік |
| Timesheet | `crm_timesheet_entries` | Табель: подача годин, затвердження менеджером |

### Ключові бізнес-правила
- WorkOrder item може посилатися на `crm_parts` → автоматичне списання з залишків при закритті
- Витрати можна записувати вручну або автоматично (при списанні запчастин)
- Бюджет: адмін задає ліміти по категоріях; система попереджає при перевищенні

---

## Фаза 2.3 — Аналітика та Каталог `✅ Завершено 2026-05-23`

**Мета:** Звітність та управління каталогом авто через CRM-бек-офіс

### Реалізовані модулі

#### Звіти (6 типів)
| Звіт | Endpoint | Permission |
|------|----------|-----------|
| Доходи | `GET /reports/revenue` | `reports:financial` |
| P&L | `GET /reports/pl` | `reports:financial` |
| Витрати по категоріях | `GET /reports/expenses-by-category` | `reports:financial` |
| Навантаження механіків | `GET /reports/mechanics` | `reports:operations` |
| Популярні послуги | `GET /reports/popular-services` | `reports:operations` |
| Вартість складу | `GET /reports/inventory-value` | `reports:operations` |

Фронтенд: Recharts (`ComposedChart`, `BarChart`, `PieChart` donut), `DateRangePicker` з пресетами.

#### Каталог авто (управління оголошеннями)
- CRUD `catalog_listings` (shared site table, не CRM-таблиця)
- Машина стану: `AVAILABLE ↔ RESERVED → SOLD`, `CLOSED → AVAILABLE`
- **Presigned URL flow (Option B):** CRM ніколи не тримає R2-credentials. При upload: CRM → `POST /internal/storage/upload-url` (NestJS) → повертає presignedUrl → браузер PUT'ить напряму в R2. Auth: `X-Internal-Key` header.
- NestJS: `InternalStorageController` (`@aws-sdk/s3-request-presigner`), 300s TTL на presigned URL

#### Нотатки клієнтів
- Таблиці: `crm_client_notes`, `crm_client_note_history`
- Soft delete (`deleted_at`); видалені нотатки видно тільки з `notes:manage` (query param `?include_deleted=true`)
- Редагування: перед оновленням content зберігається "before"-снепшот у history
- Ownership: `notes:write` редагує лише свої; `notes:manage` — будь-які
- Міграція з вільного поля: startup event переносить `crm_client_profiles.notes` → перший запис у `crm_client_notes`

#### Navigation & RBAC у Frontend
- Sidebar розділи "Каталог авто" та "Звіти" показуються тільки якщо є відповідні permissions
- Реалізовано через `GET /auth/me` → `useMe()` hook → фільтрація `navSections` у `Layout.tsx`
- Roles page оновлено з новими групами permissions: Каталог авто, Звіти, Нотатки клієнтів

### Pending (ручні дії)
```bash
# Виконати в ~/Documents/auto-crm/backend/:
alembic revision --autogenerate -m "phase_2_3_client_notes"
alembic upgrade head
```

---

## Зв'язки між Фазами і Сайтом

```
Site (Next.js / NestJS)               CRM (FastAPI / React)
─────────────────────────             ─────────────────────
users                ←── читає ──→   crm_client_profiles (shadow user link)
catalog_listings     ←── пише  ──→   Фаза 2.3: CatalogModule (CRUD + статуси)
catalog_inquiries    ←── читає ──→   Фаза 2.3: InquiriesModule
/internal/storage/*  ←── internal→   Фаза 2.3: presigned URL relay (X-Internal-Key)
```

---

## Відкладені питання (для майбутніх дискусій)
- Спосіб розгортання CRM (Railway? VPS? окремий Docker?)
- Real-time нотифікації в CRM (WebSocket чи polling?)
- Інтеграція SMS-нотифікацій при зміні статусу WorkOrder (Фаза 3)
- Мобільна версія CRM (PWA чи нативний застосунок?)
- Дропнути колонку `notes` з `crm_client_profiles` (після підтвердження стабільності міграції)
