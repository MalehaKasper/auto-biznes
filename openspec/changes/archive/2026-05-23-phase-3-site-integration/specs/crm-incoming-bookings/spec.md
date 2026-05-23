## ADDED Requirements

### Requirement: CRM incoming bookings queue
CRM SHALL display a queue of bookings submitted through the site, read from the shared `bookings` table via `SiteBase` SQLAlchemy models.

#### Scenario: View incoming bookings
- **WHEN** a staff user with `workorders:create` navigates to the Incoming Bookings page
- **THEN** the system displays all site bookings with status PENDING ordered by `createdAt` descending, showing: client phone, name, service type, requested time, vehicle plate (if set)

#### Scenario: Filter by status
- **WHEN** a staff user selects a status filter (PENDING / CONFIRMED / CANCELLED)
- **THEN** only bookings matching that status are displayed

### Requirement: Confirm or cancel a site booking
Staff with `workorders:create` SHALL be able to confirm or cancel incoming bookings. CRM SHALL call the NestJS internal API to update booking status (not write directly to site DB).

#### Scenario: Confirm booking
- **WHEN** a staff user clicks "Підтвердити" on a booking
- **THEN** CRM calls `PATCH /internal/bookings/{id}/status { status: "CONFIRMED" }` on NestJS, NestJS sends confirmation SMS to the client, and the booking status updates in the list

#### Scenario: Cancel booking
- **WHEN** a staff user clicks "Скасувати" on a booking with an optional cancellation note
- **THEN** CRM calls `PATCH /internal/bookings/{id}/status { status: "CANCELLED", notes }` on NestJS, NestJS sends cancellation SMS, and the booking is removed from the PENDING queue

#### Scenario: NestJS internal API unavailable
- **WHEN** the NestJS API returns a non-2xx response
- **THEN** CRM displays "Помилка з'єднання. Спробуйте ще раз." and does not change the local display

### Requirement: Convert booking to work order
Staff with `workorders:create` SHALL be able to convert a confirmed site booking into a CRM work order in one action.

#### Scenario: Convert to work order
- **WHEN** a staff user clicks "Створити наряд" on a CONFIRMED booking
- **THEN** CRM: (1) creates or finds existing `crm_client_profile` for the client phone via Shadow User logic, (2) creates `crm_work_order` with `source_booking_id` set to the booking UUID, service type, and vehicle info pre-filled, (3) redirects to the new work order detail page

#### Scenario: Prevent duplicate conversion
- **WHEN** a booking already has an associated `crm_work_order` (same `source_booking_id`)
- **THEN** the "Створити наряд" button is replaced with a link "Переглянути наряд #{id}"
