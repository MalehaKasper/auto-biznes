## MODIFIED Requirements

### Requirement: Hero section with brand identity and 3 CTA buttons
The homepage SHALL display a full-viewport hero section with a dark atmospheric background (image or gradient), the brand name "Автобізнесмени" (corrected spelling — no trailing "і"), an H1 headline "Твоя тачка в надійних руках", and exactly 3 primary CTA buttons: "Заїхати на СТО", "Шиномонтаж", "Купити/Продати авто". All CTA buttons SHALL be visually prominent with industrial styling (sharp corners, heavy border, accent color). The brand name "Автобізнесмені" (with trailing "і") SHALL NOT appear anywhere on the site.

#### Scenario: Hero renders with correct brand name
- **WHEN** a visitor loads the homepage
- **THEN** the brand name displayed is "Автобізнесмени" (not "Автобізнесмені")

#### Scenario: Hero renders with all 3 CTAs
- **WHEN** a visitor loads the homepage
- **THEN** the hero section is visible with H1 text, 3 CTA buttons all visible without scrolling on a 1280px viewport

#### Scenario: СТО CTA navigates to booking
- **WHEN** a visitor clicks "Заїхати на СТО"
- **THEN** the booking widget opens (or user navigates to `/book?service=sto`)

#### Scenario: Шиномонтаж CTA navigates to booking
- **WHEN** a visitor clicks "Шиномонтаж"
- **THEN** the booking widget opens (or user navigates to `/book?service=tire`)

#### Scenario: Купити/Продати CTA navigates to catalog
- **WHEN** a visitor clicks "Купити/Продати авто"
- **THEN** the user is navigated to the catalog/listings page
