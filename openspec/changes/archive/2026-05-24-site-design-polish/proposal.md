## Why

The public-facing site has accumulated several visual and UX defects since the initial Junkyard redesign: the booking status page was never migrated from the old light-mode theme (white inserts on a dark site), card text contrast is too low in places, step transitions in the booking widget are instant with no animation, header navigation to the garage is hidden behind an unlabelled icon, the brand name is misspelled, and "Зберігання шин" is missing as a bookable service type.

## What Changes

- Fix brand name: "Автобізнесмені" → "Автобізнесмени" everywhere (Header, hero, metadata)
- Rewrite `apps/site/src/app/book/[id]/page.tsx` from light-mode slate/green/red palette to full Junkyard dark-mode design system
- Fix card text contrast: `text-zinc-600` → `text-zinc-400` for metadata text; `text-zinc-500` → `text-zinc-300` for plate numbers in VehicleCard
- Add `framer-motion` and animate BookingWidget step transitions (slide-left on advance, slide-right on back)
- Replace the unlabelled profile icon in Header with explicit text: "Увійти" for guests, "Мій гараж" for authenticated users (Variant B)
- Add "Зберігання шин" (`TIRE_STORAGE`) as a fourth service option in `Step3Service`

## Capabilities

### New Capabilities

*(none — all changes are polish and fixes within existing capabilities)*

### Modified Capabilities

- `site-design-system`: Card text contrast requirements tightened; booking status page must use dark-mode tokens
- `booking-flow`: Step transitions must be animated; `TIRE_STORAGE` added as a valid service type
- `site-homepage`: Brand name corrected to "Автобізнесмени"

## Impact

- `apps/site/src/components/Header.tsx` — brand name fix, profile button → text button
- `apps/site/src/app/page.tsx` — brand name fix in hero label
- `apps/site/src/app/book/[id]/page.tsx` — full visual rewrite (no logic change)
- `apps/site/src/app/garage/page.tsx` — card text contrast fix
- `apps/site/src/components/BookingWidget/index.tsx` — framer-motion step transitions
- `apps/site/src/components/BookingWidget/Step3Service.tsx` — add TIRE_STORAGE option
- `apps/site/package.json` — add `framer-motion` dependency
- No backend API changes required; `TIRE_STORAGE` is already a valid enum value on the API side (or treated as free-text service type)
