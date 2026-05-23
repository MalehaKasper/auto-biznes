## ADDED Requirements

### Requirement: Manual vehicle addition to Garage
The site SHALL provide a page at `/garage/add` where authenticated users can manually add a vehicle to their Garage.

#### Scenario: Add vehicle with plate number
- **WHEN** an authenticated user submits the add-vehicle form with a plate number and optional make/model/year
- **THEN** the system calls `POST /garage/vehicles` and the new vehicle appears in the user's Garage list

#### Scenario: Required field validation
- **WHEN** the user submits the form without a plate number
- **THEN** the system displays a validation error "Будь ласка, вкажіть номерний знак"

#### Scenario: Navigate to add vehicle from Garage
- **WHEN** an authenticated user clicks "+ Додати авто" on the Garage page
- **THEN** the user is taken to `/garage/add`

#### Scenario: Redirect after successful add
- **WHEN** the vehicle is successfully added
- **THEN** the user is redirected to `/garage` where the new vehicle is visible in the list
