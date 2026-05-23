## ADDED Requirements

### Requirement: Перегляд лістингів продажу
Система SHALL надавати публічний список автомобілів на продаж (`type: SALE`) без авторизації.

#### Scenario: Перегляд списку продажу
- **WHEN** відвідувач відкриває `/catalog` (або вкладку "Продаж")
- **THEN** система повертає лістинги де `type = SALE` та `status = AVAILABLE`, відсортовані за `createdAt DESC`, з пагінацією (cursor-based, limit 12)

#### Scenario: Пагінація списку
- **WHEN** відвідувач передає `cursor=<id>` до `GET /catalog?type=sale&cursor=<id>`
- **THEN** система повертає наступну сторінку лістингів після вказаного cursor-id

#### Scenario: Порожній каталог
- **WHEN** у базі немає лістингів з `type = SALE` та `status = AVAILABLE`
- **THEN** API повертає `{ listings: [], nextCursor: null }`, сторінка показує порожній стан

---

### Requirement: Перегляд лістингів викупу (WANTED)
Система SHALL надавати публічний список авто, які компанія шукає для купівлі (`type: WANTED`).

#### Scenario: Перегляд вкладки "Викуп"
- **WHEN** відвідувач відкриває вкладку "Викуп" на `/catalog`
- **THEN** система повертає лістинги де `type = WANTED` та `status = AVAILABLE`

#### Scenario: WANTED лістинг з діапазоном параметрів
- **WHEN** лістинг має `type: WANTED, yearMax: 2022, mileageMax: 150000, price: 700000`
- **THEN** картка відображає "Рік: до 2022", "Пробіг: до 150 000 км", "Бюджет: до 700 000 грн"

---

### Requirement: Деталі лістингу
Система SHALL надавати публічну сторінку деталей конкретного лістингу.

#### Scenario: Відкриття деталей існуючого лістингу
- **WHEN** відвідувач відкриває `/catalog/:id`
- **THEN** система повертає повні дані лістингу: make, model, year, mileage, price, description, photos[], bargainEnabled, status

#### Scenario: Лістинг не знайдено
- **WHEN** відвідувач звертається до `/catalog/:id` з неіснуючим id
- **THEN** API повертає `404 Not Found`, сторінка показує повідомлення про відсутність

#### Scenario: SOLD або CLOSED лістинг
- **WHEN** лістинг має `status: SOLD` або `status: CLOSED`
- **THEN** сторінка відображає лістинг з міткою "Продано" / "Закрито" і деактивованими кнопками дій

---

### Requirement: Кнопка "Запропонувати ціну" контролюється адміном
На сторінці SALE-лістингу кнопка торгу SHALL відображатись тільки якщо `bargainEnabled = true`.

#### Scenario: Лістинг з увімкненим торгом
- **WHEN** `CatalogListing.bargainEnabled = true`
- **THEN** на сторінці деталей відображається кнопка "Запропонувати ціну"

#### Scenario: Лістинг з вимкненим торгом
- **WHEN** `CatalogListing.bargainEnabled = false`
- **THEN** кнопка "Запропонувати ціну" не відображається; інші дії (Купити, Обмін, Питання, Дзвінок) доступні
