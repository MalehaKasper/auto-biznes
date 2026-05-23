## ADDED Requirements

### Requirement: Подача заявки на покупку (BUY)
Анонімний відвідувач SHALL мати можливість подати заявку на купівлю SALE-лістингу.

#### Scenario: Успішна заявка на покупку
- **WHEN** відвідувач надсилає `POST /catalog/inquiries` з `{ listingId, type: "BUY", phone, name }`
- **THEN** система створює `CatalogInquiry { type: BUY, status: NEW }` і повертає `201 Created` з id заявки

#### Scenario: BUY-заявка з пропозицією ціни (торг)
- **WHEN** відвідувач надсилає `{ listingId, type: "BUY", phone, name, offeredPrice: 450000 }`
- **THEN** система створює заявку з `offeredPrice = 450000`; CRM бачить це як запит торгу

#### Scenario: BUY на WANTED лістинг — відхилення
- **WHEN** відвідувач надсилає `type: "BUY"` з `listingId` що вказує на `type: WANTED` лістинг
- **THEN** API повертає `422 Unprocessable Entity` — BUY можливий лише для SALE лістингів

---

### Requirement: Подача заявки на обмін (EXCHANGE)
Анонімний відвідувач SHALL мати можливість запропонувати обмін свого авто на SALE-лістинг.

#### Scenario: Успішна заявка на обмін
- **WHEN** відвідувач надсилає `{ listingId, type: "EXCHANGE", phone, name, tradeVehicleMake, tradeVehicleModel, tradeVehicleYear }`
- **THEN** система створює `CatalogInquiry { type: EXCHANGE }` з даними авто відвідувача

#### Scenario: EXCHANGE без даних авто
- **WHEN** відвідувач надсилає `type: "EXCHANGE"` без `tradeVehicleMake`
- **THEN** API повертає `400 Bad Request` — для EXCHANGE обов'язкові `tradeVehicleMake` та `tradeVehicleModel`

---

### Requirement: Заявка на оцінку авто (EVALUATE)
Анонімний відвідувач SHALL мати можливість подати авто на оцінку для викупу — без прив'язки до конкретного лістингу або у відповідь на WANTED-лістинг.

#### Scenario: Загальна форма оцінки (без лістингу)
- **WHEN** відвідувач надсилає `{ type: "EVALUATE", phone, name, tradeVehicleMake, tradeVehicleModel, tradeVehicleYear }` без `listingId`
- **THEN** система створює `CatalogInquiry { type: EVALUATE, listingId: null }`

#### Scenario: Відповідь на WANTED-лістинг
- **WHEN** відвідувач відкриває WANTED-лістинг і натискає "Є таке авто", надсилає `{ listingId: <wanted_id>, type: "EVALUATE", phone, name, tradeVehicleMake, tradeVehicleModel }`
- **THEN** система створює `CatalogInquiry { type: EVALUATE, listingId: <wanted_id> }` — CRM бачить прив'язку до конкретного запиту

#### Scenario: EVALUATE без даних авто
- **WHEN** відвідувач надсилає `type: "EVALUATE"` без `tradeVehicleMake`
- **THEN** API повертає `400 Bad Request` — для EVALUATE обов'язкові `tradeVehicleMake` та `tradeVehicleModel`

---

### Requirement: Заявки QUESTION та CALLBACK
Анонімний відвідувач SHALL мати можливість задати питання або попросити передзвонити по будь-якому лістингу.

#### Scenario: Питання по лістингу
- **WHEN** відвідувач надсилає `{ listingId, type: "QUESTION", phone, name, message }`
- **THEN** система створює `CatalogInquiry { type: QUESTION }` з текстом питання

#### Scenario: QUESTION без повідомлення
- **WHEN** відвідувач надсилає `type: "QUESTION"` без `message`
- **THEN** API повертає `400 Bad Request` — для QUESTION поле `message` є обов'язковим

#### Scenario: Прохання передзвонити
- **WHEN** відвідувач надсилає `{ listingId?, type: "CALLBACK", phone, name }`
- **THEN** система створює `CatalogInquiry { type: CALLBACK }`; `listingId` є необов'язковим

---

### Requirement: Валідація payload заявки
Система SHALL відхиляти заявки з відсутніми обов'язковими полями.

#### Scenario: Відсутній phone
- **WHEN** відвідувач надсилає запит без поля `phone`
- **THEN** API повертає `400 Bad Request`

#### Scenario: Невалідний формат phone
- **WHEN** відвідувач надсилає `phone: "12345"` (не у форматі +380XXXXXXXXX)
- **THEN** API повертає `400 Bad Request` з описом помилки валідації

#### Scenario: Невалідний тип заявки
- **WHEN** відвідувач надсилає `type: "UNKNOWN_TYPE"`
- **THEN** API повертає `400 Bad Request`
