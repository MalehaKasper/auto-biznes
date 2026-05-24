## ADDED Requirements

### Requirement: Hero section with brand identity and 3 CTA buttons
The homepage SHALL display a full-viewport hero section with a dark atmospheric background (image or gradient), the brand name "Автобізнесмені", an H1 headline "Твоя тачка в надійних руках", and exactly 3 primary CTA buttons: "Заїхати на СТО", "Шиномонтаж", "Купити/Продати авто". All CTA buttons SHALL be visually prominent with industrial styling (sharp corners, heavy border, accent color).

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

### Requirement: Live catalog slider showing company inventory
The homepage SHALL display a horizontal slider of 3–4 vehicles currently in `COMPANY_INVENTORY` status, fetched from the API. Each card SHALL show make, model, year, price, and a primary characteristic. If no inventory is available, the slider section is hidden.

#### Scenario: Catalog slider renders with live data
- **WHEN** the homepage loads and `GET /api/listings?status=COMPANY_INVENTORY&limit=4` returns vehicles
- **THEN** a horizontal slider shows up to 4 vehicle cards with make, model, year, and price

#### Scenario: Catalog slider hidden when no inventory
- **WHEN** `GET /api/listings?status=COMPANY_INVENTORY&limit=4` returns an empty array
- **THEN** the catalog slider section is not rendered in the DOM
