## ADDED Requirements

### Requirement: 4-step booking widget with in-page transitions
The site SHALL provide a booking widget component that guides the user through 4 sequential steps — phone, vehicle, service, date/time — all within a single page without full-page reloads. Step transitions SHALL be smooth (CSS transition or fade). The widget SHALL be rendered on `/book`.

#### Scenario: Widget renders at step 1 (phone)
- **WHEN** a visitor navigates to `/book`
- **THEN** step 1 (phone input) is visible and steps 2–4 are not rendered

#### Scenario: Step advances after phone submission
- **WHEN** the user submits a valid phone in step 1
- **THEN** the widget transitions to step 2 (vehicle) without page reload

#### Scenario: Step advances through all 4 steps
- **WHEN** the user completes steps 2 (vehicle), 3 (service), and 4 (date/time)
- **THEN** each step transition is in-page and the final step allows submission of the booking

### Requirement: Step 1 auto-filled if user already authenticated
If the phone auth modal was already completed (phone stored in context), Step 1 of the booking widget SHALL be auto-filled and automatically advanced so the user starts at Step 2.

#### Scenario: Authenticated user starts at step 2
- **WHEN** an authenticated user (phone in context) opens the booking widget
- **THEN** step 1 is skipped and the widget shows step 2 (vehicle)

### Requirement: Step 2 shows existing garage vehicles if available
If the user has vehicles in their garage, Step 2 SHALL present them as selectable options in addition to a "New vehicle" manual entry option.

#### Scenario: Garage vehicles shown in step 2
- **WHEN** an authenticated user reaches step 2 and has existing vehicles
- **THEN** each garage vehicle is shown as a selectable card; user can also choose "Додати нове авто"

#### Scenario: No garage vehicles — manual entry shown
- **WHEN** a user reaches step 2 with no garage vehicles
- **THEN** only manual entry fields (make, model, year, plate) are shown

### Requirement: Step 3 presents service type selection
Step 3 SHALL display available service types as visually distinct selectable cards (СТО, Шиномонтаж, Інше). Selecting a type advances to step 4.

#### Scenario: Service type selection
- **WHEN** the user clicks a service type card in step 3
- **THEN** that type is selected and the widget advances to step 4

### Requirement: Step 4 presents available time slots
Step 4 SHALL fetch available slots from `GET /bookings/slots?serviceType=<type>&date=<date>` and display them as selectable buttons grouped by date. Selecting a slot and confirming submits the booking.

#### Scenario: Available slots loaded
- **WHEN** step 4 renders with a selected service type
- **THEN** the widget calls the slots API and displays available dates and times

#### Scenario: Booking submission
- **WHEN** the user selects a slot and clicks confirm
- **THEN** `POST /bookings` is called with phone, vehicle data, service type, and slot; on success the widget shows a confirmation screen with the booking ID

#### Scenario: No slots available
- **WHEN** the slots API returns an empty array for the selected date
- **THEN** the widget shows "Немає вільних слотів на цю дату, оберіть іншу"
