## ADDED Requirements

### Requirement: GET /dashboard/stats повертає агреговану статистику
FastAPI SHALL надавати ендпоінт `GET /dashboard/stats` (захищений JWT). Відповідь SHALL містити поля для кожного розділу CRM. Поле SHALL бути `null` якщо у поточного користувача відсутні відповідні permissions.

#### Scenario: Адмін отримує всі поля
- **WHEN** адмін робить `GET /dashboard/stats`
- **THEN** відповідь містить всі поля: `work_orders`, `incoming_bookings`, `invoices`, `cash`, `inventory`, `catalog`
- **THEN** HTTP статус 200

#### Scenario: Механік отримує обмежені поля
- **WHEN** механік (без `cash:open_session`) робить `GET /dashboard/stats`
- **THEN** поле `cash` = null в відповіді
- **THEN** поле `work_orders` містить актуальні дані

#### Scenario: Неавтентифікований запит
- **WHEN** запит без JWT токену
- **THEN** HTTP статус 401

---

### Requirement: Поле work_orders містить кількість активних нарядів
`work_orders.active` SHALL повертати кількість нарядів зі статусом `IN_PROGRESS` або `DRAFT`.

#### Scenario: Підрахунок активних нарядів
- **WHEN** в БД є 3 наряди `IN_PROGRESS` і 2 `DRAFT`
- **THEN** `work_orders.active = 5`

---

### Requirement: Поле incoming_bookings містить кількість очікуючих
`incoming_bookings.pending` SHALL повертати кількість booking-записів зі статусом `PENDING`.

#### Scenario: Підрахунок очікуючих записів
- **WHEN** в БД є 3 записи зі статусом `PENDING`
- **THEN** `incoming_bookings.pending = 3`

---

### Requirement: Поле invoices містить кількість неоплачених рахунків
`invoices.awaiting_payment` SHALL повертати кількість рахунків зі статусом `ISSUED` (виставлені, але не оплачені повністю).

#### Scenario: Підрахунок неоплачених рахунків
- **WHEN** є 4 рахунки зі статусом `ISSUED`
- **THEN** `invoices.awaiting_payment = 4`

---

### Requirement: Поле cash містить статус касової сесії
`cash.session_open` SHALL повертати `true` якщо є активна (не закрита) касова сесія, інакше `false`.

#### Scenario: Відкрита сесія
- **WHEN** в `crm_cash_sessions` є запис з `closed_at = null`
- **THEN** `cash.session_open = true`

---

### Requirement: Поле inventory містить кількість позицій з низьким залишком
`inventory.low_stock_count` SHALL повертати кількість записів `crm_inventory_items` де `quantity <= min_quantity` (якщо `min_quantity` задано).

#### Scenario: Позиції з низьким залишком
- **WHEN** є 2 позиції де quantity <= min_quantity
- **THEN** `inventory.low_stock_count = 2`

---

### Requirement: Поле catalog містить кількість доступних оголошень
`catalog.available` SHALL повертати кількість `catalog_listings` зі статусом `AVAILABLE`.

#### Scenario: Доступні оголошення
- **WHEN** є 8 оголошень зі статусом `AVAILABLE`
- **THEN** `catalog.available = 8`
