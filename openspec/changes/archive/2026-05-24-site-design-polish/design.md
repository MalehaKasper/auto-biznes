## Context

The site runs Next.js 15 with Tailwind v4 and a Junkyard dark-mode design system (`globals.css` `@theme` tokens: `zinc-950/900/800`, `accent: #EAB308`, `accent-alt: #F97316`). The initial visual redesign (`site-visual-redesign`, archived 2026-05-23) established tokens and rewrote the homepage, header, booking widget, and garage pages — but skipped the booking status page (`/book/[id]`), which retained the original light-mode `slate-*` and pastel color classes. Several other components were migrated but with suboptimal contrast choices (`text-zinc-600` on `bg-zinc-900` = ~2.3:1 contrast, well below WCAG AA 4.5:1).

## Goals / Non-Goals

**Goals:**
- Every page the user can reach renders in the Junkyard dark-mode palette — no light-color islands
- Text contrast meets WCAG AA (≥4.5:1 for small text) throughout the site
- Booking widget step transitions feel fluid and intentional, matching the brand's premium feel
- Header clearly communicates login state and garage access without requiring user to discover the icon tooltip
- "Зберігання шин" is bookable via the widget

**Non-Goals:**
- CRM visual changes
- Changes to booking/garage business logic
- Photo/image handling (tracked separately in backlog)
- Mobile-specific layout rework (responsive correctness assumed, not audited here)

## Decisions

### D1: framer-motion for step transitions
**Decision:** Add `framer-motion` and use `AnimatePresence` + `motion.div` with `variants` for slide transitions between BookingWidget steps.

**Rationale:** Step transitions need exit animation (current step slides out) and enter animation (new step slides in) simultaneously. CSS-only or Tailwind `animate-*` utilities cannot handle exit animations without significant boilerplate. `framer-motion` is the de-facto standard in the Next.js/React ecosystem and handles `AnimatePresence` (unmount animation) cleanly with ~2KB added to the bundle (treeshaken).

**Alternative considered:** CSS keyframes + `useState(animating)` — doable but requires manual timing synchronization between exit/enter, error-prone.

**Transition spec:**
- Advance (step N → N+1): current slides left + fades out, next slides from right + fades in
- Back (step N → N-1): current slides right + fades out, previous slides from left + fades in
- Duration: 250ms, ease: `easeInOut`

### D2: Header profile button → text button
**Decision:** Replace the unlabelled SVG icon button with a text button: "Увійти" (guest) or "🚗 Мій гараж" (authenticated).

**Rationale:** Icon-only buttons require users to already know the UI. The garage is a key conversion point (shadow account retention). Making it explicit reduces drop-off. The existing `<button onClick={handleProfileClick}>` simply gets its content replaced — no logic change.

### D3: TIRE_STORAGE as service type string
**Decision:** Add `TIRE_STORAGE` as a fourth option in `Step3Service` using the string ID `"TIRE_STORAGE"`. No backend change needed — the API accepts arbitrary `serviceType` strings at the booking creation endpoint.

**Rationale:** The booking API stores `serviceType` as a free-text/enum field. CRM staff see the service type label. Adding `TIRE_STORAGE` to the frontend dropdown is sufficient; when we later formalize the tire storage flow (separate backlog item) the enum can be constrained on the backend.

### D4: Booking status page — full visual rewrite
**Decision:** Rewrite `book/[id]/page.tsx` styling in-place. Zero logic changes, only class names.

**Target palette:**
- Page background: `bg-zinc-950`
- Card: `border border-zinc-800 bg-zinc-900`
- Label text: `text-zinc-400`
- Value text: `text-zinc-100`
- Divider: `border-zinc-800`
- Status badges (dark variants): PENDING→`border-accent text-accent`, CONFIRMED→`border-blue-400 text-blue-400`, IN_PROGRESS→`border-accent-alt text-accent-alt`, COMPLETED→`border-emerald-400 text-emerald-400`, CANCELLED→`border-red-400 text-red-400`
- Loading skeleton: `bg-zinc-800` (not `bg-slate-100`)
- Rounded corners removed: `rounded-2xl` → sharp (no `rounded-*`)

### D5: Text contrast fixes
**Minimum fix set:**
- `VehicleCard` in `garage/page.tsx`: `text-zinc-600` → `text-zinc-400`, `text-zinc-500` → `text-zinc-300`
- Audit `catalog` page for same pattern (likely same issue)
- `Step3Service` description text `text-zinc-500` → `text-zinc-400`

## Risks / Trade-offs

- **framer-motion bundle size** → Risk is low; framer-motion is treeshaken and the widget is client-only. Expected impact: +25–40KB gzipped to the booking route chunk.
- **TIRE_STORAGE not validated on backend** → If backend later adds enum constraint without `TIRE_STORAGE`, existing bookings with that type will not break (stored as string), but new ones will fail. Mitigation: tracked in backlog; CRM team should sync when formalizing tire storage flow.
- **Brand name typo fix** → Two files (Header.tsx, page.tsx). Simple string replace, zero risk.
