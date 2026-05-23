## Context

CRM побудований на Vite + React + Tailwind. Поточний Layout.tsx має фіксований лівий sidebar (w-56) зі всіма розділами і `<main>` справа. Немає header-рівня з інформацією про користувача, немає breadcrumb, немає feedback-системи. Маршрут `/` не визначений окремо — router перенаправляє одразу на `/work-orders`.

FastAPI backend: всі роутери зареєстровані в `app/main.py`. Немає агрегуючого ендпоінту статистики.

## Goals / Non-Goals

**Goals:**
- Замінити sidebar-першу навігацію на Home Screen → Section-flow
- Надати кожному користувачу стартову сторінку з картками доступних розділів та live-лічильниками
- Додати persistent top header з breadcrumb, ідентифікацією юзера та логаутом
- Додати глобальний toast-шар для feedback на mutate-операції
- Додати backend endpoint `/dashboard/stats` для лічильників карток

**Non-Goals:**
- Редизайн окремих сторінок (форми, таблиці залишаються як є)
- Мобільна адаптація
- Dark mode
- Компонентна бібліотека (shadcn/ui) — не вводимо зараз

## Decisions

### D1: Sidebar видаляється повністю, не ховається

**Рішення:** Sidebar прибирається з Layout. Єдина навігація між секціями — через Home Screen (клік на картку) або через логотип у header.

**Альтернативи:**
- Collapsed icon-sidebar — складніше, два режими навігації
- Sidebar залишається поруч з Home Screen — дублює навігацію, плутає

**Ратіонале:** Один flow, жодної двозначності. Для CRM з кількома ролями краще "зайшов → обрав секцію → працюєш у ній".

---

### D2: Top header — завжди видимий, одна висота

**Рішення:** `<header>` h-14, sticky top-0, містить: ліворуч — логотип/назва (link → `/`), по центру — `<Breadcrumb />`, праворуч — `{name} · {role}` + кнопка виходу.

**Альтернативи:**
- Header тільки на внутрішніх сторінках, Home Screen без header — ламає консистентність
- Breadcrumb у sidebar — sidebar видаляємо

---

### D3: Breadcrumb — кожна сторінка оголошує сама

**Рішення:** React Context `BreadcrumbContext`. Сторінки викликають `useBreadcrumb([{ label, href }, ...])` в useEffect. Header читає контекст і рендерить.

**Альтернативи:**
- Breadcrumb через route config — складніше для динамічних сторінок (`/work-orders/:id`)
- Бібліотека react-breadcrumbs — зайва залежність

---

### D4: Тости — react-hot-toast

**Рішення:** `react-hot-toast`. `<Toaster />` монтується в `App.tsx`. Мутації в API-хуках самі не викликають toast — це робить UI-шар (після `.mutateAsync()`).

**Альтернативи:**
- sonner — гарніший, але react-hot-toast простіший
- Власна реалізація — не потрібна

**Ратіонале:** Мінімальна API, нульова конфігурація, добре з TanStack Query.

---

### D5: `/dashboard/stats` — один запит, permission-aware

**Рішення:** Один GET-ендпоінт повертає об'єкт з полями. Поля включаються залежно від permissions поточного юзера. Поля з відсутніми permissions = `null` або відсутні.

```
GET /dashboard/stats
Authorization: Bearer <jwt>

Response:
{
  "work_orders":        { "active": 5 }          | null,
  "incoming_bookings":  { "pending": 3 }          | null,
  "invoices":           { "awaiting_payment": 2 } | null,
  "cash":               { "session_open": true }  | null,
  "inventory":          { "low_stock_count": 1 }  | null,
  "catalog":            { "available": 8 }        | null
}
```

**Альтернативи:**
- Окремі запити для кожної картки — N запитів на завантаження, race conditions
- GraphQL — overkill

---

### D6: Картки Home Screen — порядок і групування

**Рішення:** Картки відображаються в фіксованому порядку (як у старому sidebar), але видно лише ті, до яких є permission. Кожна картка: іконка (lucide-react), назва розділу, subtitle зі stats або статичний текст.

## Risks / Trade-offs

- **Більше кліків для cross-section навігації** → Home → Sections потребує +1 клік порівняно зі sidebar. Прийнятно для role-focused роботи (механік рідко перемикає секції).
- **`/dashboard/stats` — N SQL-запитів** → Все в одній транзакції, COUNT-и дешеві. При масштабуванні можна кешувати на 30с.
- **Breadcrumb context** — якщо сторінка забуде викликати `useBreadcrumb`, header покаже порожній breadcrumb. Нескладний баг, видно одразу.

## Migration Plan

1. Встановити `react-hot-toast` і `lucide-react` (npm install)
2. Додати backend `/dashboard/stats`
3. Переписати `Layout.tsx` (header + без sidebar)
4. Додати `BreadcrumbContext` + `useBreadcrumb` hook
5. Створити `HomeScreen.tsx` + маршрут `/`
6. Додати `useBreadcrumb` виклики у ключові сторінки (WorkOrders, Invoices, Clients тощо)
7. Додати toast-виклики у ключові mutate-операції

Rollback: git revert. Немає міграцій БД, немає breaking API змін для сайту.
