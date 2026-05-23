## ADDED Requirements

### Requirement: Work order source booking linkage
CRM work orders SHALL support an optional `source_booking_id` field linking them to site bookings. This field is set when a work order is created by converting an incoming site booking.

#### Scenario: Work order created from site booking
- **WHEN** a staff user converts a site booking to a work order via the Incoming Bookings page
- **THEN** the created `crm_work_order` has `source_booking_id` set to the site booking UUID

#### Scenario: Work order created manually
- **WHEN** a staff user creates a work order without using the booking conversion flow
- **THEN** `source_booking_id` is null

### Requirement: Service record writeback on work order completion
When a work order with a `source_booking_id` is completed, CRM SHALL call the NestJS internal API to write a service record to the shared DB, making the service visible in the client's Garage.

#### Scenario: Completion triggers service record write
- **WHEN** a staff user sets a work order with `source_booking_id` to COMPLETED
- **THEN** CRM calls `POST /internal/service-records` with the work order summary (serviceType, description, mileage if set, total cost from invoice, performedAt = now)

#### Scenario: Write failure does not block completion
- **WHEN** `POST /internal/service-records` fails
- **THEN** CRM completes the status change, logs the error, and shows a dismissible warning to staff: "Не вдалося записати до сервісної книги клієнта"
