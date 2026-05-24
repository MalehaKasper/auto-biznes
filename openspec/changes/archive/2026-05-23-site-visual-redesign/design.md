## Context

The site (`apps/site/`) is a Next.js 16 app with Tailwind CSS v4. Current state: light-mode blue theme, generic brand name "AutoService", single-page booking form at `/book`, `/login` page for auth. No visual identity. The design system is fully specified in `дизайн.md` — dark-only, zinc-950 base, industrial yellow accents, Oswald headings, Inter body, optional noise texture.

The NestJS API at `:4000` already has booking slots, catalog listings, and user-identity endpoints. No backend changes are needed for this change.

## Goals / Non-Goals

**Goals:**
- Full dark-mode reskin matching the Junkyard design system
- Brand rename to "Автобізнесмені" everywhere
- New homepage: hero + 3 CTAs + live catalog slider
- Phone modal for guest auth (shadow account lookup/create)
- 4-step booking widget (SPA, no page reloads)
- Reusable design-system primitives (CSS tokens, button classes)

**Non-Goals:**
- Backend changes or new API endpoints
- Actual SMS OTP verification (phone modal just captures number, backend creates shadow account — OTP is a future phase)
- PWA, offline support, animations beyond simple transitions
- Changing the CRM at all

## Decisions

### D1: Tailwind CSS v4 custom properties for the design system
Use CSS `@theme` block in `globals.css` to define `--color-zinc-950`, `--color-accent` (industrial yellow `#EAB308`), `--font-heading` (Oswald), `--font-body` (Inter). Tailwind v4 natively reads `@theme` variables so all utility classes (`bg-zinc-950`, `text-accent`, `font-heading`) work without any config changes.

**Alternative considered**: Separate `tailwind.config.ts` extension. Rejected — v4 moved away from config files; `@theme` in CSS is the idiomatic approach.

### D2: Google Fonts loaded via `next/font/google`
Load Oswald (weights 400, 600, 700) and Inter (weights 400, 500, 600) via `next/font/google` in `layout.tsx` and inject as CSS variables (`--font-oswald`, `--font-inter`). This gives automatic font subsetting, preload hints, and no FOUT.

**Alternative considered**: `@import url(...)` in globals.css. Rejected — no subsetting, slower, not idiomatic for Next.js.

### D3: Noise texture as a CSS `background-image` utility class
Define `.noise` as a pseudo-element overlay using a small base64-encoded noise SVG pattern with low opacity. Applied selectively to hero and section backgrounds. Keeps the effect a pure CSS utility, no extra image files.

### D4: Catalog slider — client component fetching `/api/listings?status=COMPANY_INVENTORY&limit=4`
The homepage catalog slider is a `"use client"` React component that calls the NestJS listings endpoint on mount. Uses a simple CSS scroll-snap slider (no external carousel library). Falls back gracefully to empty state if the API returns no listings.

**Alternative considered**: Server-side fetching in `page.tsx`. Rejected — API is on a different origin (`:4000`), which makes SSR fetch complex. Client fetch is simpler for this use case and the data isn't SEO-critical.

### D5: Phone auth modal — global state via React Context
A `PhoneAuthModalContext` wraps the root layout. Any component (Header "Гараж" icon, hero CTA button, booking widget step 1) can call `openPhoneModal()`. The modal itself is rendered in `layout.tsx` so it sits above all page content. On success it sets a `phoneToken` in context (and `localStorage`) for the session.

**Alternative considered**: Zustand or Redux. Rejected — overkill for a single modal with one piece of state.

### D6: 4-step booking widget as a single `<BookingWidget>` component
The widget lives at `components/BookingWidget/index.tsx`. Internal state: `step` (1–4), `phone`, `vehicleId`, `serviceType`, `slotId`. Steps render conditionally — no routing, no page reload. The existing `/book` page simply renders `<BookingWidget />` full-screen.

Step 1 (phone) reuses the phone modal logic — if the user already authenticated via the modal, step 1 is auto-filled and skipped.

### D7: Header profile icon behavior
- Guest: clicking profile icon opens `PhoneAuthModal`
- Authenticated (phone in context): clicking profile icon navigates to `/garage`

This matches the design doc requirement for "ненав'язлива іконка профілю в навігації".

## Risks / Trade-offs

- **Noise texture performance** → Use a small (64×64) SVG pattern at low opacity (0.03–0.05). No impact on paint time.
- **Catalog API unavailable at dev time** → Widget shows empty/skeleton state gracefully; doesn't break the page.
- **Google Fonts in CI/offline** → `next/font` caches fonts at build time, so CI is fine. Dev requires internet on first run only.
- **Phone modal without OTP** → Currently captures phone only (no verification). This is acceptable for the current phase; OTP is planned. No security risk since no sensitive data is exposed to unverified phone numbers.

## Migration Plan

1. Rewrite `globals.css` with new tokens (dark mode default, no light-mode fallback needed per design spec)
2. Update `layout.tsx`: load fonts, wrap with `PhoneAuthModalProvider`, render `<PhoneAuthModal />`
3. Rewrite `Header.tsx` with dark nav and new profile icon logic
4. Rewrite `page.tsx` with hero + 3 CTAs + catalog slider
5. Create `components/PhoneAuthModal/index.tsx`
6. Create `components/BookingWidget/index.tsx` (4 steps)
7. Update `app/book/page.tsx` to render `<BookingWidget />`
8. Visual QA: run dev server, check all pages in dark mode

No data migration needed. No API changes. Rollback = revert commits.
