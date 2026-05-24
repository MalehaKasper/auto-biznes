## ADDED Requirements

### Requirement: Card text contrast meets WCAG AA
All text inside card components (VehicleCard, catalog listing cards, booking status rows) SHALL use token classes that achieve a minimum 4.5:1 contrast ratio against the card background (`bg-zinc-900`). Specifically: metadata/secondary text SHALL use `text-zinc-400` minimum; primary identifiers SHALL use `text-zinc-100`; plate numbers and codes SHALL use `text-zinc-300` minimum. Usage of `text-zinc-600` or `text-zinc-500` for body/metadata text on `bg-zinc-900` is prohibited.

#### Scenario: Vehicle card metadata is readable
- **WHEN** a VehicleCard renders on the garage page
- **THEN** the plate number renders in `text-zinc-300` or brighter, and the last service date renders in `text-zinc-400` or brighter — no `text-zinc-600` or dimmer on `bg-zinc-900`

### Requirement: Booking status page uses dark-mode design system
The booking status page (`/book/[id]`) SHALL render entirely within the Junkyard dark-mode palette. It SHALL use `bg-zinc-950` as page background, `bg-zinc-900 border border-zinc-800` as the status card container, and dark-variant status badges (border + text only, no light background fills). Light-mode classes (`slate-*`, `bg-green-50`, `bg-red-50`, `bg-yellow-100`, `rounded-2xl`) are prohibited on this page.

#### Scenario: Status page renders in dark mode
- **WHEN** a user navigates to `/book/<id>` with a valid booking ID
- **THEN** the page background is `zinc-950`, the card has `zinc-900` background and `zinc-800` border, and no white or light-colored backgrounds are visible

#### Scenario: Status badge uses dark variant
- **WHEN** a booking has status PENDING
- **THEN** the status badge renders with `border-accent text-accent` classes (yellow outline, yellow text) — not `bg-yellow-100 text-yellow-800`

#### Scenario: Loading skeleton uses dark background
- **WHEN** the booking status page is loading
- **THEN** skeleton elements use `bg-zinc-800` — not `bg-slate-100`
