## Why

The public-facing site uses a generic light-mode blue theme with no visual identity. The brand needs to be renamed "Автобізнесмені" and reskinned to the established Junkyard design system (brutal dark mode, industrial palette, heavy typography) so it feels like a premium auto business rather than a placeholder app. The homepage and booking flow also need to be elevated from a basic form to the conversion-optimised widget flow described in the design spec.

## What Changes

- Rename brand from "AutoService" → "Автобізнесмені" across all site text, `<title>`, and metadata
- Replace light-mode CSS with dark-mode design system: `zinc-950` backgrounds, industrial yellow/orange accents, noise texture utility, Oswald headings + Inter body
- Overhaul homepage: atmospheric dark hero with H1 "Твоя тачка в надійних руках" and 3 CTA buttons (Заїхати на СТО / Шиномонтаж / Купити/Продати авто); live catalog slider (3-4 COMPANY_INVENTORY vehicles)
- Replace current `/login` page redirect with an inline phone-number modal that creates or looks up a shadow account
- Replace the single-page booking form with a 4-step SPA widget (phone → vehicle → service → date/time) — all transitions in-page without page reload
- Update Header: dark nav, brand name, profile icon that opens phone modal for guests

## Capabilities

### New Capabilities
- `site-design-system`: Global CSS tokens, dark-mode palette, typography scale, noise texture, component base styles
- `site-homepage`: Hero section with 3 CTAs, catalog slider fetching live inventory
- `site-phone-auth-modal`: Modal overlay for phone-based shadow-account login/lookup (guest flow)
- `site-booking-widget`: 4-step in-page booking widget replacing the current full-page form

### Modified Capabilities
- `booking-flow`: Step structure changes from single page → 4-step widget; phone capture is now step 1 and creates shadow account inline
- `garage`: Phone modal replaces `/login` redirect for unauthenticated access to garage
- `user-identity`: Phone-first identity lookup (shadow account) now happens at booking entry, not just garage

## Impact

- `apps/site/src/app/globals.css` — full rewrite (tokens, dark mode, fonts)
- `apps/site/src/app/page.tsx` — full rewrite (hero + catalog slider)
- `apps/site/src/components/Header.tsx` — dark nav, brand rename, phone modal trigger
- `apps/site/src/app/book/page.tsx` — replaced by 4-step widget component
- `apps/site/src/components/BookingWidget/` — new component tree (4 steps)
- `apps/site/src/components/PhoneAuthModal/` — new modal component
- No backend API changes required; reads existing `/api/listings` (COMPANY_INVENTORY filter) and existing booking endpoints
