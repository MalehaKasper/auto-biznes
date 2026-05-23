## ADDED Requirements

### Requirement: Service pages with pricing and process
The site SHALL provide informative pages for each service type (STO and Tire) with a list of services, indicative prices, and a call-to-action booking button.

#### Scenario: View STO service page
- **WHEN** a user navigates to `/services/sto`
- **THEN** the page displays: list of offered services with price ranges, approximate service duration, a "Записатись" button linking to `/book?serviceType=STO`

#### Scenario: View tire service page
- **WHEN** a user navigates to `/services/tire`
- **THEN** the page displays: tire services list with prices, seasonal changeover info, a "Записатись" button linking to `/book?serviceType=TIRE`

#### Scenario: Pre-fill service type from URL param
- **WHEN** a user arrives at `/book?serviceType=STO`
- **THEN** the booking form has "СТО" pre-selected in the service type dropdown

### Requirement: Site footer with contact information
Every page on the site SHALL display a footer containing company contact details.

#### Scenario: Footer visible on all pages
- **WHEN** a user visits any page on the site
- **THEN** the footer is visible and contains: phone number, address, working hours (Mon–Sat 08:00–18:00), and links to STO and Tire service pages
