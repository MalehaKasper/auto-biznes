## ADDED Requirements

### Requirement: Тіньовий акаунт створюється автоматично при першому записі
Система SHALL автоматично створювати shadow-акаунт (`status: SHADOW`) при отриманні будь-якого запиту phone lookup/create (через phone auth modal або booking widget крок 1), якщо користувача з таким номером телефону ще не існує. Якщо існує — повертає наявний запис.

#### Scenario: Перший запис гостя через phone modal
- **WHEN** гість вводить телефон `+380991234567` у phone auth modal або на кроці 1 BookingWidget
- **THEN** система створює `User { phone: "+380991234567", status: SHADOW }` і повертає токен сесії

#### Scenario: Повторний запит того самого гостя
- **WHEN** той самий телефон `+380991234567` надсилається знову
- **THEN** система знаходить існуючий User без створення дубліката і повертає токен для існуючого акаунта

### Requirement: OTP-верифікація через SMS для входу в Гараж
Система SHALL надсилати одноразовий код (OTP) на телефон користувача для автентифікації. OTP має термін дії 5 хвилин. Повторний запит OTP можливий не раніше ніж через 60 секунд.

#### Scenario: Успішна відправка OTP
- **WHEN** користувач вводить номер телефону на сторінці входу
- **THEN** система ставить SMS-задачу в BullMQ-чергу, повертає `{ success: true, retryAfter: 60 }`, клієнт отримує SMS з 6-значним кодом

#### Scenario: Занадто частий запит OTP
- **WHEN** користувач запитує OTP повторно до закінчення cooldown 60 секунд
- **THEN** API повертає `429 Too Many Requests` з полем `retryAfter` (секунди до наступного дозволеного запиту)

#### Scenario: Введення правильного OTP
- **WHEN** користувач вводить правильний 6-значний код у відведений час
- **THEN** система повертає JWT access token, встановлює httpOnly refresh token cookie

#### Scenario: Введення неправильного або простроченого OTP
- **WHEN** користувач вводить невірний код або код після закінчення 5 хвилин
- **THEN** API повертає `401 Unauthorized`, OTP інвалідується (не можна повторно використати)

### Requirement: Конвертація Shadow акаунту в Registered
Система SHALL пропонувати shadow-користувачу при першому OTP-вході встановити ім'я та (опційно) email. Після збереження статус змінюється на `REGISTERED`.

#### Scenario: Перший вхід shadow-користувача
- **WHEN** shadow-користувач успішно проходить OTP-верифікацію
- **THEN** відповідь містить `{ isFirstLogin: true }`, фронтенд показує форму доповнення профілю

#### Scenario: Збереження профілю
- **WHEN** користувач зберігає ім'я (обов'язково) та email (опційно)
- **THEN** `User.status` змінюється на `REGISTERED`, дані зберігаються, користувач перенаправляється до Гаражу

### Requirement: JWT-аутентифікація з refresh token rotation
Система SHALL використовувати access token (15 хвилин) та httpOnly refresh token (30 днів) з автоматичною ротацією.

#### Scenario: Access token протерміновано
- **WHEN** клієнт робить запит з протермінованим access token, але валідним refresh token
- **THEN** система видає новий access token та новий refresh token (старий інвалідується)

### Requirement: Phone-first shadow account creation via dedicated endpoint
The API SHALL provide `POST /identity/lookup-or-create` that accepts a phone number and returns a session token (or shadow account data) without requiring OTP completion. This endpoint is used by the phone modal and booking widget step 1 to establish identity before the full booking flow.

#### Scenario: Phone lookup returns existing account
- **WHEN** `POST /identity/lookup-or-create` is called with an existing phone number
- **THEN** the API returns `{ userId, isNew: false, sessionToken }` without creating a duplicate

#### Scenario: Phone lookup creates new shadow account
- **WHEN** `POST /identity/lookup-or-create` is called with a new phone number
- **THEN** a new `User { status: SHADOW }` is created and the API returns `{ userId, isNew: true, sessionToken }`
