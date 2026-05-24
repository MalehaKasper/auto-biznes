## 1. Оновити палітру токенів

- [x] 1.1 В `apps/site/src/app/globals.css` замінити hex-значення в `@theme inline`: `zinc-950: #1a1c21`, `zinc-900: #21242b`, `zinc-800: #2c303a`, `zinc-700: #363b47`, `zinc-600: #505565`, `zinc-400: #8c93a8`, `zinc-200: #c8cdd9`; `foreground: #e4e8f0`; accent/font токени без змін
- [x] 1.2 Оновити `html` і `body` хардкодні hex в globals.css: `background-color: #1a1c21`, `color: #e4e8f0`

## 2. Мігрувати catalog/page.tsx

- [x] 2.1 Замінити `bg-white rounded-xl border border-slate-200` на картках авто → `bg-zinc-900 border border-zinc-800`
- [x] 2.2 Замінити `bg-slate-100` placeholder → `bg-zinc-800`; `text-slate-400` → `text-zinc-500`
- [x] 2.3 Замінити `bg-white text-slate-800 rounded-full` бейдж → `border border-zinc-700 text-zinc-300`
- [x] 2.4 Замінити `text-slate-900`, `text-slate-500` → `text-zinc-100`, `text-zinc-400`
- [x] 2.5 Замінити таби `border-b border-slate-200` → `border-b border-zinc-800`; активний таб `border-blue-600 text-blue-600` → `border-accent text-accent`; неактивний `text-slate-500 hover:text-slate-800` → `text-zinc-500 hover:text-zinc-100`
- [x] 2.6 Замінити фільтр-панель `bg-slate-50 border border-slate-200 rounded-xl` → `bg-zinc-800 border border-zinc-700`
- [x] 2.7 Замінити всі інпути в фільтрах `border-slate-300 rounded-lg focus:border-blue-500` → `bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-accent`; прибрати `rounded-lg`
- [x] 2.8 Замінити `text-slate-500` empty-state → `text-zinc-500`; `text-3xl font-bold text-slate-900` заголовок → `font-heading text-zinc-100`

## 3. Мігрувати catalog/[id]/page.tsx

- [x] 3.1 Замінити основну картку `bg-white border border-slate-200 rounded-2xl` → `bg-zinc-900 border border-zinc-800`; прибрати `rounded-2xl`
- [x] 3.2 Замінити `text-slate-900`, `text-slate-700`, `text-slate-500` → `text-zinc-100`, `text-zinc-200`, `text-zinc-400`
- [x] 3.3 Замінити `border-slate-*` роздільники → `border-zinc-800`
- [x] 3.4 Замінити статус-бейджі (`bg-green-100 text-green-800`, `bg-blue-100 text-blue-800` тощо) → dark-variant: `border border-emerald-700 text-emerald-400`, `border border-blue-700 text-blue-400`
- [x] 3.5 Замінити `bg-slate-50` фото-placeholder → `bg-zinc-800`; `text-slate-400` → `text-zinc-500`
- [x] 3.6 Замінити кнопки `bg-blue-600 hover:bg-blue-700` → `bg-accent hover:bg-accent-hover text-zinc-950`; secondary кнопки `border-slate-300` → `border-zinc-700`
- [x] 3.7 Прибрати всі `shadow-md`, `shadow-lg`, `rounded-xl`, `rounded-2xl`

## 4. Мігрувати catalog/evaluate/page.tsx

- [x] 4.1 Замінити форму `bg-white rounded-2xl border border-slate-200` → `bg-zinc-900 border border-zinc-800`
- [x] 4.2 Замінити `text-slate-*` labels і тексти → `text-zinc-*` еквіваленти (900→100, 700→200, 500→400)
- [x] 4.3 Замінити інпути `border-slate-300 rounded-lg` → `bg-zinc-800 border border-zinc-700 focus:border-accent`; прибрати `rounded-lg`
- [x] 4.4 Замінити submit кнопку `bg-blue-600` → `bg-accent text-zinc-950 font-heading`

## 5. Мігрувати garage/add/page.tsx

- [x] 5.1 Замінити форму-контейнер `bg-white rounded-xl border border-slate-200` → `bg-zinc-900 border border-zinc-800`
- [x] 5.2 Замінити `text-slate-*` → `text-zinc-*`; `border-slate-*` → `border-zinc-*`
- [x] 5.3 Замінити інпути `rounded-lg border-slate-300` → `bg-zinc-800 border border-zinc-700 focus:border-accent`; прибрати `rounded-*`
- [x] 5.4 Замінити кнопку submit → `bg-accent text-zinc-950 font-heading uppercase tracking-wide`

## 6. Мігрувати garage/[vehicleId]/page.tsx

- [x] 6.1 Замінити картку деталей авто `bg-white rounded-xl border-slate-200` → `bg-zinc-900 border border-zinc-800`
- [x] 6.2 Замінити `text-slate-*` → `text-zinc-*`; `border-slate-*` → `border-zinc-800`
- [x] 6.3 Замінити статус-бейджі на dark-variant (border-only)
- [x] 6.4 Прибрати `rounded-xl`, `shadow-*`

## 7. Мігрувати profile/page.tsx

- [x] 7.1 Замінити `bg-white rounded-xl` → `bg-zinc-900`; прибрати `rounded-*`
- [x] 7.2 Замінити `text-slate-*` → `text-zinc-*`; `border-slate-*` → `border-zinc-800`
- [x] 7.3 Замінити інпути на темний стиль; кнопки на accent/zinc паттерн

## 8. Мігрувати login/page.tsx

- [x] 8.1 Замінити форму-контейнер `bg-white rounded-2xl` → `bg-zinc-900 border border-zinc-800`
- [x] 8.2 Замінити `text-slate-*` → `text-zinc-*`
- [x] 8.3 Замінити інпути та кнопку → dark паттерн

## 9. Мігрувати services/sto/page.tsx та services/tire/page.tsx

- [x] 9.1 В `services/sto/page.tsx`: замінити `bg-white`, `slate-*`, `rounded-*` → dark еквіваленти
- [x] 9.2 В `services/tire/page.tsx`: замінити `bg-white`, `slate-*`, `rounded-*` → dark еквіваленти

## 10. Фінальна перевірка

- [x] 10.1 Запустити `grep -r "bg-white\|bg-slate\|text-slate\|border-slate" apps/site/src` — результат має бути порожнім
- [x] 10.2 Запустити `pnpm --filter @auto/site exec tsc --noEmit` — нуль помилок
