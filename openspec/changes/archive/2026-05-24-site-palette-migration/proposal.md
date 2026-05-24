## Why

The site's current color palette uses neutral `zinc-*` tones (near-black `#09090b` base) that lack visual character and cause poor text contrast — most secondary text merges with the background. Eight pages were never migrated from the original light-mode theme and still render with `bg-white`, `slate-*`, and `rounded-xl` classes, creating jarring white islands on an otherwise dark site. A palette shift to "Темний метал" (Variant C) — a cool dark graphite with a subtle blue-gray undertone — unifies the visual identity and provides sufficient contrast headroom for all text levels.

## What Changes

- **Replace `@theme` color tokens** in `globals.css`: all `zinc-*` hex values replaced with "Темний метал" palette; `foreground` updated to cool white `#e4e8f0`; accent yellow `#eab308` unchanged
- **Migrate 8 unmigrated pages** from light-mode (`bg-white`, `slate-*`, `rounded-xl/2xl`, `border-slate-*`, `text-slate-*`) to dark-mode design system tokens:
  - `apps/site/src/app/catalog/[id]/page.tsx` (46 light classes)
  - `apps/site/src/app/catalog/evaluate/page.tsx` (25)
  - `apps/site/src/app/garage/add/page.tsx` (16)
  - `apps/site/src/app/garage/[vehicleId]/page.tsx` (16)
  - `apps/site/src/app/profile/page.tsx` (15)
  - `apps/site/src/app/login/page.tsx` (14)
  - `apps/site/src/app/services/tire/page.tsx` (14)
  - `apps/site/src/app/services/sto/page.tsx` (12)

## Capabilities

### New Capabilities

*(none)*

### Modified Capabilities

- `site-design-system`: Color token values change; foreground updates to cool white; all pages now required to use dark-mode tokens exclusively — no `slate-*`, `bg-white`, or light `rounded-*` shapes

## Impact

- `apps/site/src/app/globals.css` — token hex values rewritten (no class name changes)
- 8 page files — class-level migration only (no logic changes)
- All existing components using `bg-zinc-*`, `border-zinc-*`, `text-zinc-*` get new colors automatically via token cascade — zero component changes needed for those
- No backend changes
- No new dependencies
