## ADDED Requirements

### Requirement: Гостьовий запис на послугу без реєстрації
Система SHALL дозволяти запис на послугу (СТО або Шиномонтаж) без створення акаунту. Обов'язкові поля: телефон, тип послуги. Ім'я — опційне (тіньовий акаунт заповнюється пізніше). Деталі авто — опційні. Телефон подається на кроці 1 нового 4-крокового віджету, що замінює одну сторінку з формою.

#### Scenario: Успішний гостьовий запис через 4-кроковий віджет
- **WHEN** гість проходить усі 4 кроки BookingWidget (телефон → авто → послуга → слот) і підтверджує запис
- **THEN** система створює або знаходить Shadow User за телефоном, прив'язує Vehicle та Booking зі статусом `PENDING`, ставить SMS-підтвердження в чергу, повертає `{ bookingId, status: "PENDING" }`

#### Scenario: Успішний гостьовий запис з деталями авто
- **WHEN** гість заповнює поля авто (plate, make, model) на кроці 2 та вибирає слот на кроці 4
- **THEN** система створює Vehicle з наданими деталями, Booking з `scheduled_at`, клієнт отримує SMS з деталями запису

#### Scenario: Запис з невалідним номером телефону
- **WHEN** гість надсилає форму з телефоном у неправильному форматі на кроці 1
- **THEN** крок 1 показує inline-помилку валідації, перехід до кроку 2 заблоковано, жодна сутність не створюється

### Requirement: Перелік доступних часових слотів
Система SHALL надавати API для отримання доступних часових слотів для запису на конкретну дату та тип послуги.

#### Scenario: Запит доступних слотів
- **WHEN** клієнт запитує `GET /bookings/slots?serviceType=STO&date=2026-06-01`
- **THEN** система повертає масив доступних часових слотів з урахуванням вже існуючих booking на цю дату

### Requirement: SMS-підтвердження після успішного запису
Після створення booking система SHALL відправити SMS-підтвердження клієнту через BullMQ-чергу. SMS SHALL містити посилання на сторінку відстеження статусу.

#### Scenario: SMS підтвердження відправлено
- **WHEN** booking успішно створено
- **THEN** в BullMQ-чергу `sms` додається задача з текстом підтвердження (дата, тип послуги, номер запису) та URL `{SITE_URL}/book/{bookingId}`

#### Scenario: SMS-шлюз недоступний
- **WHEN** SMS-шлюз повертає помилку при спробі відправки
- **THEN** BullMQ повторює спробу до 3 разів з exponential backoff (30s, 60s, 120s), booking залишається в статусі `PENDING`

### Requirement: Статус booking доступний за ID без авторизації
Система SHALL дозволяти перевірку статусу конкретного booking за його ID без авторизації (для гостей, що отримали ID в SMS).

#### Scenario: Перевірка статусу booking гостем
- **WHEN** гість запитує `GET /bookings/:id/status`
- **THEN** система повертає `{ status, serviceType, scheduledAt, vehiclePlate }` — без персональних даних користувача

### Requirement: BookingWidget step transitions are animated
Each step transition inside the BookingWidget (steps 1–4) SHALL be animated with a smooth slide or fade effect. Transitions SHALL complete within 300ms and SHALL NOT block user interaction after completion.

#### Scenario: Forward step transition plays animation
- **WHEN** a user advances from step 1 to step 2 in the BookingWidget
- **THEN** the outgoing step slides/fades out and the incoming step slides/fades in over no more than 300ms

#### Scenario: Back step transition plays reverse animation
- **WHEN** a user clicks "back" from step 3 to step 2
- **THEN** the reverse animation plays (slide/fade in opposite direction) within 300ms

#### Scenario: Animation does not block submission
- **WHEN** the step transition animation is playing
- **THEN** interactive elements on the destination step are not focusable until the animation completes

### Requirement: Зберігання шин is a bookable service type
The booking system SHALL support "Зберігання шин" (tyre storage) as a valid `serviceType` enum value. Clients SHALL be able to select it during booking step 3 (service selection), and it SHALL appear as a distinct option in the CRM incoming bookings view.

#### Scenario: Зберігання шин appears in service type selector
- **WHEN** a user reaches step 3 of the BookingWidget
- **THEN** "Зберігання шин" appears as a selectable service option alongside "СТО" and "Шиномонтаж"

#### Scenario: Booking created with Зберігання шин service type
- **WHEN** a user selects "Зберігання шин" and completes the booking flow
- **THEN** the created Booking record has `serviceType = "TYRE_STORAGE"` and is visible in the CRM incoming bookings list

#### Scenario: Slots API accepts TYRE_STORAGE service type
- **WHEN** a client requests `GET /bookings/slots?serviceType=TYRE_STORAGE&date=2026-06-01`
- **THEN** the API returns available slots without a validation error
