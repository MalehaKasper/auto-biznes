## 1. Design System & Fonts

- [x] 1.1 Install/verify `next/font/google` is available; add Oswald (400, 600, 700) and Inter (400, 500, 600) to `apps/site/src/app/layout.tsx` via `next/font/google`, expose as CSS variables `--font-oswald` and `--font-inter`
- [x] 1.2 Rewrite `apps/site/src/app/globals.css`: add Tailwind v4 `@theme` block with `zinc-950/900/800` background tokens, `--color-accent: #EAB308` (yellow) and `--color-accent-alt: #F97316` (orange), wire `--font-heading` and `--font-body` to the font variables
- [x] 1.3 Add `.noise` utility class to `globals.css` using a base64 SVG grain pattern at ≤0.04 opacity via `::after` pseudo-element
- [x] 1.4 Set `<html>` dark background default in `globals.css` (`background-color: var(--color-zinc-950)`, `color: white`) so all pages are dark by default with no flash of white

## 2. Layout & Header

- [x] 2.1 Update `apps/site/src/app/layout.tsx`: apply font CSS variables to `<body>`, wrap children in `PhoneAuthModalProvider` (to be created in task 4.1), render `<PhoneAuthModal />` as a sibling to `{children}`
- [x] 2.2 Rewrite `apps/site/src/components/Header.tsx`: dark background (`bg-zinc-950` / `bg-zinc-900`), brand text "Автобізнесмені" in Oswald uppercase, profile icon — guest opens phone modal, authenticated navigates to `/garage`

## 3. Homepage

- [x] 3.1 Rewrite `apps/site/src/app/page.tsx` hero section: full-viewport dark atmospheric background (CSS gradient `from-zinc-950 to-zinc-800` with `noise` class), H1 "Твоя тачка в надійних руках" in Oswald, 3 CTA buttons with sharp industrial styling
- [x] 3.2 Wire CTA buttons: "Заїхати на СТО" → `/book?service=sto`, "Шиномонтаж" → `/book?service=tire`, "Купити/Продати авто" → `/catalog` (or equivalent listings route)
- [x] 3.3 Create `apps/site/src/components/CatalogSlider/index.tsx`: client component, fetches `GET /api/listings?status=COMPANY_INVENTORY&limit=4` on mount, renders horizontal CSS scroll-snap slider of vehicle cards (make, model, year, price); hidden when API returns empty
- [x] 3.4 Add `<CatalogSlider />` below the hero in `page.tsx` with a section heading

## 4. Phone Auth Modal

- [x] 4.1 Create `apps/site/src/context/PhoneAuthModal.tsx`: React context with `openPhoneModal()` / `closePhoneModal()` and `phone` / `sessionToken` state; store token in `localStorage` on success
- [x] 4.2 Create `apps/site/src/components/PhoneAuthModal/index.tsx`: modal overlay (fixed, `z-50`, dark backdrop), phone input with Ukrainian format validation, submit calls `POST /identity/lookup-or-create`, shows inline error on invalid format, closes on success and updates context
- [x] 4.3 Update Header profile icon logic (in task 2.2) to read from `PhoneAuthModalContext`: guest → `openPhoneModal()`, authenticated → `router.push('/garage')`

## 5. Booking Widget

- [x] 5.1 Create `apps/site/src/components/BookingWidget/index.tsx`: manages `step` (1–4), `phone`, `vehicleId`/vehicle data, `serviceType`, `slotId` state; reads from `PhoneAuthModalContext` to auto-skip step 1 if already authenticated
- [x] 5.2 Create `apps/site/src/components/BookingWidget/Step1Phone.tsx`: phone input, submits to `POST /identity/lookup-or-create`, advances on success; shows inline validation error on bad format
- [x] 5.3 Create `apps/site/src/components/BookingWidget/Step2Vehicle.tsx`: if authenticated and has garage vehicles (`GET /garage/vehicles`), show selectable vehicle cards + "Додати нове авто" option; otherwise show manual entry fields (make, model, year, plate)
- [x] 5.4 Create `apps/site/src/components/BookingWidget/Step3Service.tsx`: 3 visually distinct selectable service cards (СТО, Шиномонтаж, Інше); selecting one advances to step 4
- [x] 5.5 Create `apps/site/src/components/BookingWidget/Step4DateTime.tsx`: fetches `GET /bookings/slots?serviceType=<type>&date=<date>`, shows date picker + available slot buttons; "Немає вільних слотів" state; confirm button submits `POST /bookings`
- [x] 5.6 Add success/confirmation screen to `BookingWidget/index.tsx` after `POST /bookings` success, showing booking ID and summary
- [x] 5.7 Update `apps/site/src/app/book/page.tsx` to render `<BookingWidget />` full-screen (dark background, no old form code)

## 6. Garage Auth Guard Update

- [x] 6.1 Update the garage route auth guard in `apps/site/src/app/garage/` (or middleware): instead of redirecting to `/login`, call `openPhoneModal()` from context when user is unauthenticated

## 7. Visual QA

- [x] 7.1 Run dev server (`pnpm dev` from `apps/site/` or monorepo root), verify homepage renders dark hero with 3 CTAs and catalog slider in browser
- [x] 7.2 Verify Header shows "Автобізнесмені" in Oswald, profile icon opens modal for guest
- [x] 7.3 Walk through all 4 steps of booking widget and verify in-page transitions, slot loading, and booking submission (with test data)
- [x] 7.4 Verify phone modal opens/closes correctly from Header and hero, stores phone in context
- [x] 7.5 Check garage access as guest — confirm modal opens instead of redirect
