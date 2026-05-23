## ADDED Requirements

### Requirement: NestJS internal booking status endpoint
NestJS SHALL expose `PATCH /internal/bookings/:id/status` for CRM to update booking status and trigger client SMS notifications.

#### Scenario: Confirm booking via internal API
- **WHEN** CRM calls `PATCH /internal/bookings/{id}/status` with `{ status: "CONFIRMED" }` and valid `X-Internal-Key`
- **THEN** NestJS sets `booking.status = CONFIRMED` and enqueues a confirmation SMS with the tracking URL

#### Scenario: Cancel booking via internal API
- **WHEN** CRM calls `PATCH /internal/bookings/{id}/status` with `{ status: "CANCELLED", notes? }` and valid `X-Internal-Key`
- **THEN** NestJS sets `booking.status = CANCELLED` and enqueues a cancellation SMS

#### Scenario: Booking not found
- **WHEN** the booking UUID does not exist
- **THEN** NestJS returns `404 Not Found`

### Requirement: NestJS internal service record creation endpoint
NestJS SHALL expose `POST /internal/service-records` for CRM to write completed work into the client's Garage after closing a work order.

#### Scenario: Write service record on work order completion
- **WHEN** CRM calls `POST /internal/service-records` with `{ vehicleId, bookingId, serviceType, description, mileage?, cost?, performedAt }` and valid `X-Internal-Key`
- **THEN** NestJS creates a `service_record` linked to the vehicle; the record is immediately visible in the client's Garage

#### Scenario: Vehicle not found in site DB
- **WHEN** the `vehicleId` does not exist in the `vehicles` table
- **THEN** NestJS returns `422 Unprocessable Entity`; CRM logs the error but still marks the work order complete

### Requirement: NestJS internal SMS endpoint
NestJS SHALL expose `POST /internal/sms` for CRM to trigger SMS notifications without holding SMS provider credentials.

#### Scenario: Send SMS via internal API
- **WHEN** CRM calls `POST /internal/sms` with `{ phone, template, params }` and valid `X-Internal-Key`
- **THEN** NestJS enqueues the SMS via BullMQ and returns `202 Accepted`

#### Scenario: Unknown template
- **WHEN** the `template` field does not match a known SMS template
- **THEN** NestJS returns `400 Bad Request`

### Requirement: CRM writes service record on WorkOrder completion
When a CRM work order with a `source_booking_id` is moved to COMPLETED status, CRM SHALL call NestJS to create a service record in the shared DB.

#### Scenario: WorkOrder completed with site booking source
- **WHEN** a staff user sets a work order with `source_booking_id` to COMPLETED
- **THEN** CRM calls `POST /internal/service-records` with work order summary data; on success the client's Garage reflects the completed service

#### Scenario: WorkOrder completed without site booking source
- **WHEN** a staff user sets a work order without `source_booking_id` to COMPLETED
- **THEN** no service record is written; the work order closes normally

#### Scenario: Internal API write fails
- **WHEN** `POST /internal/service-records` returns a non-2xx response
- **THEN** CRM logs the error, shows a warning to staff, but completes the work order status change regardless
