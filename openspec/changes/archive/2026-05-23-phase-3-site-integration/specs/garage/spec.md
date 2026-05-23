## ADDED Requirements

### Requirement: Book service for specific vehicle from Garage
The site SHALL allow authenticated users to start a booking pre-filled with a specific vehicle's details from the Garage vehicle detail page.

#### Scenario: Book from vehicle detail
- **WHEN** an authenticated user clicks "Записати на сервіс" on a vehicle detail page
- **THEN** the user is navigated to `/book?vehicleId={id}` with the booking form pre-populated with vehicle make, model, year, and plate

#### Scenario: Pre-filled vehicle data in booking form
- **WHEN** the booking form is loaded with `vehicleId` query param
- **THEN** the vehicle fields (make, model, year, plate) are pre-filled and the vehicle section shows "Дані авто підставлено з Гаражу"
