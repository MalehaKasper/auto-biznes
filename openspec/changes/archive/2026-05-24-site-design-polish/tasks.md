## 1. Залежності та налаштування

- [x] 1.1 Встановити `framer-motion` в `apps/site`: `pnpm --filter @auto/site add framer-motion`

## 2. Виправлення назви бренду

- [x] 2.1 В `apps/site/src/components/Header.tsx`: замінити "Автобізнесмені" → "Автобізнесмени" в тексті посилання логотипу
- [x] 2.2 В `apps/site/src/app/page.tsx`: замінити "Автобізнесмені" → "Автобізнесмени" в hero subtitle label
- [x] 2.3 Перевірити `apps/site/src/app/layout.tsx` на наявність назви у metadata (title, og:title) і виправити якщо є

## 3. Виправлення хедера — кнопка профілю (Варіант B)

- [x] 3.1 В `apps/site/src/components/Header.tsx`: замінити icon-only `<button>` на текстову кнопку: для гостя — "Увійти", для авторизованого — "🚗 Мій гараж"; зберегти існуючу логіку `handleProfileClick`

## 4. Виправлення контрасту тексту в картках

- [x] 4.1 В `apps/site/src/app/garage/page.tsx` (`VehicleCard`): `text-zinc-600` → `text-zinc-400` для "Останній сервіс"; `text-zinc-500` → `text-zinc-300` для номерного знаку
- [x] 4.2 Перевірити `apps/site/src/app/book/page.tsx` та `apps/site/src/components/CatalogSlider/` на `text-zinc-600`/`text-zinc-500` у картках — виправити за тим самим паттерном
- [x] 4.3 В `apps/site/src/components/BookingWidget/Step3Service.tsx`: `text-zinc-500` → `text-zinc-400` для description тексту в кнопках послуг

## 5. Переписати сторінку статусу запису

- [x] 5.1 В `apps/site/src/app/book/[id]/page.tsx`: замінити всі `slate-*` класи на dark-mode еквіваленти (`bg-zinc-950`, `bg-zinc-900`, `border-zinc-800`, `text-zinc-400`, `text-zinc-100`)
- [x] 5.2 Замінити `STATUS_COLOR` map з `bg-yellow-100 text-yellow-800` пасторалі на dark-variant бейджі: `border-accent text-accent` (PENDING), `border-blue-400 text-blue-400` (CONFIRMED), `border-accent-alt text-accent-alt` (IN_PROGRESS), `border-emerald-400 text-emerald-400` (COMPLETED), `border-red-400 text-red-400` (CANCELLED)
- [x] 5.3 Замінити `bg-green-50 border-green-200` success блок → `border border-emerald-800 bg-emerald-950/30 text-emerald-300`
- [x] 5.4 Замінити `bg-red-50 border-red-200` cancelled блок → `border border-red-800 bg-red-950/30 text-red-300`
- [x] 5.5 Замінити skeleton loading з `bg-slate-100` → `bg-zinc-800`; прибрати `rounded-2xl`, `rounded-xl`, `rounded-full` — замінити на гострі кути
- [x] 5.6 Замінити `text-blue-700` посилання → `text-accent hover:text-accent-hover`
- [x] 5.7 Оновити `font-bold` → `font-heading` для заголовків; `text-slate-500/800` → `text-zinc-400/100`

## 6. Анімації переходів між кроками BookingWidget

- [x] 6.1 В `apps/site/src/components/BookingWidget/index.tsx`: додати `import { AnimatePresence, motion } from "framer-motion"`
- [x] 6.2 Додати `direction` state (`1` = вперед, `-1` = назад); оновлювати при кожному переході
- [x] 6.3 Обгорнути `{/* Step content */}` блок в `<AnimatePresence mode="wait" custom={direction}>`
- [x] 6.4 Обгорнути кожен `{step === N && <StepN />}` у `<motion.div key={step} variants={slideVariants} custom={direction} initial="enter" animate="center" exit="exit">`
- [x] 6.5 Визначити `slideVariants`: enter — `translateX(±60px) opacity(0)`, center — `translateX(0) opacity(1)`, exit — `translateX(∓60px) opacity(0)`; duration 0.25s easeInOut

## 7. Додати "Зберігання шин" до Step3Service

- [x] 7.1 В `apps/site/src/components/BookingWidget/Step3Service.tsx`: додати четвертий елемент до масиву `SERVICES`: `{ id: "TIRE_STORAGE", label: "Зберігання шин", description: "Сезонне зберігання комплекту шин", icon: "📦" }` — перед "Інше"
