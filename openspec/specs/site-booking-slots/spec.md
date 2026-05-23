## ADDED Requirements

### Requirement: Time slot selection in booking form
The site SHALL display available time slots per day and allow the user to pick a specific slot before submitting the booking form.

#### Scenario: Load available slots for a date
- **WHEN** the user selects a date in the booking form
- **THEN** the system calls `GET /bookings/slots?serviceType={type}&date={date}` and displays available 30-minute slots between 08:00 and 18:00

#### Scenario: Submit booking with selected slot
- **WHEN** the user selects a time slot and submits the form
- **THEN** `scheduledAt` is included in the `POST /bookings` payload and the booking is created with the chosen time

#### Scenario: No slots available for selected date
- **WHEN** all slots for the selected day are taken
- **THEN** the system displays "На цю дату вільних місць нема. Оберіть іншу дату."

### Requirement: Booking status tracking page
The site SHALL provide a public (no-auth) page at `/book/[id]` where users can check the status of their booking using only the booking UUID.

#### Scenario: View booking status
- **WHEN** a user navigates to `/book/{bookingId}`
- **THEN** the system displays: booking date/time, service type, vehicle plate (if set), and current status (PENDING / CONFIRMED / IN_PROGRESS / COMPLETED / CANCELLED)

#### Scenario: Booking not found
- **WHEN** the UUID does not exist in the system
- **THEN** the page displays "Запис не знайдено" with a link back to `/book`

#### Scenario: SMS contains tracking link
- **WHEN** a booking is created successfully
- **THEN** the confirmation SMS includes the URL `{siteUrl}/book/{bookingId}`
