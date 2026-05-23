## Why

CRM побудований функціонально, але залишається "сирим прототипом" — без стартової сторінки, без feedback при діях, без контексту навігації. Для щоденного використання кількома співробітниками (механік, менеджер, касир, адмін) система потребує чіткого входу, permission-filtered home screen та базових UX-елементів.

## What Changes

- **Видалити sidebar** з `Layout.tsx` — навігація переноситься на Home Screen та header-breadcrumb
- **Додати Home Screen** — сітка карток, де кожна картка це розділ CRM; картки фільтруються по permissions поточного юзера; картки показують live-цифри (активні наряди, очікуючі заявки тощо)
- **Новий top header** (завжди видимий) — логотип-посилання на Home, breadcrumb поточного розташування, ім'я+роль користувача, кнопка виходу
- **Додати toast-нотифікації** — feedback при успішних діях та помилках (react-hot-toast)
- **Backend endpoint** `GET /dashboard/stats` — агрегує лічильники для карток Home Screen, фільтровані по permissions
- Підключити `lucide-react` для іконок карток

## Capabilities

### New Capabilities

- `crm-home-screen`: Permission-filtered home screen з картками-розділами та live stats
- `crm-navigation-layout`: Новий top header з breadcrumb; видалення sidebar; маршрут `/` → Home Screen
- `crm-toast-notifications`: Глобальна toast-система для feedback на mutate-операції
- `crm-dashboard-stats`: Backend endpoint `GET /dashboard/stats` з агрегованими лічильниками

### Modified Capabilities

## Impact

- `~/Documents/auto-crm/frontend/src/components/Layout.tsx` — повний переробіток
- `~/Documents/auto-crm/frontend/src/router.tsx` — маршрут `/` змінюється
- `~/Documents/auto-crm/frontend/src/main.tsx` або `App.tsx` — підключення Toaster
- `~/Documents/auto-crm/backend/app/routers/` — новий router `dashboard.py`
- `~/Documents/auto-crm/backend/app/main.py` — реєстрація нового router
- Нові npm-залежності: `react-hot-toast`, `lucide-react`
