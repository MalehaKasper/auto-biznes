## 1. Залежності та налаштування

- [x] 1.1 Встановити `react-hot-toast` та `lucide-react` у CRM frontend (`npm install react-hot-toast lucide-react`)
- [x] 1.2 Додати `<Toaster />` з react-hot-toast в `App.tsx` (position: top-right)

## 2. BreadcrumbContext

- [x] 2.1 Створити `src/context/BreadcrumbContext.tsx` — контекст з `items: { label: string; href?: string }[]` та `setBreadcrumb` функцією
- [x] 2.2 Створити хук `useBreadcrumb(items)` — викликає `setBreadcrumb` в useEffect при монтуванні
- [x] 2.3 Обернути додаток `BreadcrumbProvider`-ом у `App.tsx` або `main.tsx`

## 3. Новий Layout (header без sidebar)

- [x] 3.1 Переписати `Layout.tsx`: видалити `<aside>` sidebar повністю
- [x] 3.2 Додати `<header>` h-14 sticky top-0 з трьома зонами: ліворуч — "Auto CRM" (Link до `/`), по центру — `<Breadcrumb />`, праворуч — `{me.name} · {me.role}` + кнопка виходу
- [x] 3.3 Створити `src/components/Breadcrumb.tsx` — рендерить items з контексту розділеними `/`, активні елементи як Link
- [x] 3.4 `<main>` змінити на `pt-14` (відступ під sticky header), зберегти `overflow-y-auto p-6`

## 4. Backend: /dashboard/stats

- [x] 4.1 Створити `app/routers/dashboard.py` з `GET /dashboard/stats` (JWT-захищений)
- [x] 4.2 Реалізувати permission-aware підрахунки: `work_orders.active` (IN_PROGRESS + DRAFT), `incoming_bookings.pending` (PENDING), `invoices.awaiting_payment` (ISSUED), `cash.session_open` (closed_at IS NULL), `inventory.low_stock_count` (quantity <= min_quantity), `catalog.available` (AVAILABLE)
- [x] 4.3 Поля повертати як `null` якщо у юзера відсутній відповідний permission
- [x] 4.4 Зареєструвати router у `app/main.py`

## 5. Home Screen

- [x] 5.1 Створити `src/api/dashboard.ts` — хук `useDashboardStats()` що запитує `GET /dashboard/stats`
- [x] 5.2 Створити `src/pages/HomeScreen.tsx` — сітка карток (grid-cols-2 md:grid-cols-3)
- [x] 5.3 Визначити масив карток з: `id`, `label`, `icon` (lucide-react), `href`, `requiredStat` (ключ в stats), `statLabel(stats) → string`
- [x] 5.4 Рендерити тільки картки для яких відповідне поле в stats не `null`
- [x] 5.5 Skeleton-стан карток під час завантаження stats
- [x] 5.6 Empty state якщо немає жодної картки
- [x] 5.7 Картка: іконка + назва + статистичний рядок + hover-ефект; клік → navigate до href
- [x] 5.8 Змінити маршрут `/` в `router.tsx` на `<HomeScreen />` (замість redirect на `/work-orders`)
- [x] 5.9 Змінити redirect після успішного логіну в `Login.tsx` з `/work-orders` на `/`

## 6. Breadcrumb у ключових сторінках

- [x] 6.1 `WorkOrders/List.tsx` — `useBreadcrumb([{ label: "Наряди" }])`
- [x] 6.2 `WorkOrders/Detail.tsx` — `useBreadcrumb([{ label: "Наряди", href: "/work-orders" }, { label: "Наряд #" + id }])`
- [x] 6.3 `WorkOrders/Create.tsx` — `useBreadcrumb([{ label: "Наряди", href: "/work-orders" }, { label: "Новий наряд" }])`
- [x] 6.4 `Invoices/List.tsx` — `useBreadcrumb([{ label: "Рахунки" }])`
- [x] 6.5 `Invoices/Detail.tsx` — `useBreadcrumb([{ label: "Рахунки", href: "/invoices" }, { label: "Рахунок #" + id }])`
- [x] 6.6 `Clients/List.tsx` — `useBreadcrumb([{ label: "Клієнти" }])`
- [x] 6.7 `Clients/Detail.tsx` — `useBreadcrumb([{ label: "Клієнти", href: "/clients" }, { label: client.name }])`
- [x] 6.8 `IncomingBookings/index.tsx` — `useBreadcrumb([{ label: "Вхідні заявки" }])`
- [x] 6.9 `CashRegister/index.tsx` — `useBreadcrumb([{ label: "Каса" }])`
- [x] 6.10 `Inventory/index.tsx` — `useBreadcrumb([{ label: "Залишки" }])`
- [x] 6.11 `Parts/index.tsx` та `Parts/PartDetail.tsx` — breadcrumb "Запчастини" / "Запчастина"
- [x] 6.12 `Catalog/ListingsIndex.tsx` та `Catalog/ListingDetail.tsx` — breadcrumb "Каталог авто"
- [x] 6.13 `Reports/index.tsx` — `useBreadcrumb([{ label: "Звіти" }])`
- [x] 6.14 Settings-сторінки (Company, Roles, StaffUsers, Employees) — `useBreadcrumb([{ label: "Налаштування" }, { label: "..." }])`

## 7. Toast-нотифікації у ключових операціях

- [x] 7.1 `WorkOrders/Detail.tsx` — toast.success після зміни статусу; toast.error при помилці
- [x] 7.2 `WorkOrders/Create.tsx` — toast.success після створення наряду
- [x] 7.3 `IncomingBookings/index.tsx` — toast.success при підтвердженні / скасуванні / конвертації; toast.error при 409 конфлікті
- [x] 7.4 `Invoices/Detail.tsx` — toast.success при збереженні оплати
- [x] 7.5 `Clients/Detail.tsx` — toast.success при оновленні профілю клієнта
- [x] 7.6 `CashRegister/index.tsx` — toast.success при відкритті/закритті сесії
- [x] 7.7 `Catalog/ListingForm.tsx` та `ListingDetail.tsx` — toast.success при збереженні/зміні статусу оголошення
