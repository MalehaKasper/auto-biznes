## ADDED Requirements

### Requirement: Sidebar видалений, замінений top header
Layout.tsx SHALL більше не рендерити лівий sidebar. Замість нього SHALL існувати sticky top header висотою h-14 на всіх автентифікованих сторінках.

#### Scenario: Автентифікована сторінка не має sidebar
- **WHEN** авторизований користувач відкриває будь-яку сторінку CRM (крім Login)
- **THEN** sidebar відсутній в DOM
- **THEN** header висотою 56px присутній вгорі сторінки

#### Scenario: Header sticky при скролі
- **WHEN** контент сторінки довший за viewport і користувач скролить
- **THEN** header залишається видимим вгорі

---

### Requirement: Header містить логотип, breadcrumb та інформацію про користувача
Header SHALL мати три зони: ліворуч — "Auto CRM" як посилання на `/`, по центру — breadcrumb поточної сторінки, праворуч — `{ім'я} · {роль}` та кнопка "Вийти".

#### Scenario: Логотип веде на Home Screen
- **WHEN** користувач натискає "Auto CRM" в header
- **THEN** відбувається навігація до `/`

#### Scenario: Header показує ім'я та роль
- **WHEN** користувач залогінений як "Іван Петренко" з роллю "Механік"
- **THEN** header справа показує "Іван Петренко · Механік"

#### Scenario: Кнопка виходу
- **WHEN** користувач натискає кнопку виходу в header
- **THEN** виконується logout і відбувається редирект на `/login`

---

### Requirement: Breadcrumb відображає поточне розташування
BreadcrumbContext SHALL дозволяти кожній сторінці декларувати свій breadcrumb. Header SHALL читати контекст і відображати ланцюжок посилань, розділених `/`.

#### Scenario: Breadcrumb на сторінці списку
- **WHEN** користувач на сторінці `/work-orders`
- **THEN** breadcrumb показує "Наряди"

#### Scenario: Breadcrumb на сторінці деталей
- **WHEN** користувач на сторінці `/work-orders/42`
- **THEN** breadcrumb показує "Наряди / Наряд #42", де "Наряди" — активне посилання

#### Scenario: Home Screen — breadcrumb відсутній
- **WHEN** користувач на сторінці `/` (Home Screen)
- **THEN** breadcrumb порожній (не відображається)

---

### Requirement: Маршрут `/` веде на Home Screen
Router SHALL рендерити `HomeScreen` компонент за маршрутом `/` для автентифікованих користувачів.

#### Scenario: Redirect після логіну
- **WHEN** успішний логін
- **THEN** redirect відбувається на `/` (Home Screen), а не на `/work-orders`

#### Scenario: Неавтентифікований доступ до `/`
- **WHEN** неавтентифікований користувач відкриває `/`
- **THEN** redirect на `/login`
