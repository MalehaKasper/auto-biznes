## MODIFIED Requirements

### Requirement: Список автомобілів користувача в Гаражі
Автентифікований користувач SHALL бачити список усіх своїх активних (не прихованих) автомобілів з базовою інформацією та датою останнього сервісу.

#### Scenario: Перегляд Гаражу з авто
- **WHEN** авторизований користувач відкриває `GET /garage/vehicles`
- **THEN** система повертає масив vehicles де `user_vehicles.is_hidden = false` для цього user, кожен об'єкт містить `{ id, plate, make, model, year, lastServiceDate, bookingsCount }`

#### Scenario: Перегляд порожнього Гаражу
- **WHEN** авторизований користувач не має жодного авто в Гаражі
- **THEN** система повертає порожній масив `[]`, фронтенд показує заклик "Додати перше авто" або пояснення що авто з'являться після запису на сервіс

### Requirement: Сторінка деталей авто з сервісною книгою
Автентифікований користувач SHALL бачити повну сервісну книгу конкретного авто — хронологічний список усіх `ServiceRecord` для цього vehicle.

#### Scenario: Перегляд сервісної книги
- **WHEN** авторизований користувач відкриває `GET /garage/vehicles/:vehicleId`
- **THEN** система повертає дані vehicle + масив `serviceRecords` відсортований за `performed_at DESC`, кожен запис містить `{ date, serviceType, description, mileage, cost }`

#### Scenario: Доступ до чужого авто
- **WHEN** авторизований користувач запитує vehicle, що не належить йому
- **THEN** API повертає `403 Forbidden`

#### Scenario: Порожня сервісна книга
- **WHEN** авторизований користувач відкриває деталі авто що не має жодного `ServiceRecord`
- **THEN** система повертає vehicle з порожнім масивом `serviceRecords: []`, фронтенд показує стан "Сервісна книга порожня"

### Requirement: Відображення активних booking у Гаражі
Автентифікований користувач SHALL бачити активні записи на сервіс (bookings зі статусом `PENDING` або `CONFIRMED`) у контексті відповідного авто в Гаражі.

#### Scenario: Авто з активним записом
- **WHEN** авторизований користувач відкриває Гараж і одне з його авто має booking зі статусом `PENDING`
- **THEN** картка цього авто відображає badge "Запис на [дата]" або "Очікує підтвердження"

### Requirement: Оновлення даних авто клієнтом
Автентифікований користувач SHALL мати можливість оновити деталі свого авто (plate, make, model, year, color, vin) через інтерфейс Гаражу.

#### Scenario: Оновлення держномеру
- **WHEN** користувач змінює `plate` авто через `PATCH /garage/vehicles/:vehicleId`
- **THEN** система оновлює `Vehicle.plate`, повертає оновлений об'єкт

### Requirement: Unauthenticated access to Garage triggers phone modal
When an unauthenticated user attempts to access `/garage`, the site SHALL NOT redirect to a separate `/login` page. Instead, it SHALL open the phone auth modal inline. After successful phone submission the user is taken to `/garage`.

#### Scenario: Guest clicks garage link
- **WHEN** a guest user navigates to `/garage` or clicks any garage-access link
- **THEN** the phone auth modal opens on the current page instead of redirecting to `/login`

#### Scenario: Auth completed via modal — garage loads
- **WHEN** the user completes phone auth via the modal triggered from a garage access attempt
- **THEN** the modal closes and the garage page loads with the user's vehicles

### Requirement: Book service for specific vehicle from Garage
The site SHALL allow authenticated users to start a booking pre-filled with a specific vehicle's details from the Garage vehicle detail page.

#### Scenario: Book from vehicle detail
- **WHEN** an authenticated user clicks "Записати на сервіс" on a vehicle detail page
- **THEN** the booking widget opens at step 2 (vehicle) pre-populated with the vehicle's make, model, year, and plate (step 1 is skipped since user is authenticated)

#### Scenario: Pre-filled vehicle data in booking widget
- **WHEN** the booking widget is opened with a `vehicleId` context
- **THEN** step 2 shows the pre-filled vehicle as selected and the user proceeds directly to step 3
