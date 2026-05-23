## ADDED Requirements

### Requirement: Work order lifecycle
A work order SHALL represent a single service job for one vehicle. It MUST have a status that progresses through: `DRAFT` → `IN_PROGRESS` → `READY_FOR_PAYMENT` → `CLOSED`. Backward transitions are not allowed except `IN_PROGRESS` → `DRAFT` (recall for revision).

#### Scenario: Create work order
- **WHEN** a staff user with `workorders:create` posts to `POST /work-orders` with client_id (or walk-in name/phone), vehicle make/model, and optional assigned_employee_id
- **THEN** a new `crm_work_orders` record is created with status `DRAFT`

#### Scenario: Move to IN_PROGRESS
- **WHEN** a staff user with `workorders:write` patches status to `IN_PROGRESS`
- **THEN** the work order status changes and `started_at` is recorded

#### Scenario: Invalid status transition
- **WHEN** a staff user attempts to move a `CLOSED` work order to `DRAFT`
- **THEN** the system returns HTTP 422 with an error describing the invalid transition

### Requirement: Work order line items
A work order SHALL support an ordered list of line items. Each line item has a type (`SERVICE` or `PART`), a name, quantity, and unit price. Line items can be added, edited, or removed while the work order is in `DRAFT` or `IN_PROGRESS` status.

#### Scenario: Add line item
- **WHEN** a staff user posts to `POST /work-orders/{id}/items` with type, name, quantity, unit_price
- **THEN** a new `crm_work_order_items` record is created linked to the work order

#### Scenario: Edit line item
- **WHEN** a staff user patches `/work-orders/{id}/items/{item_id}` with updated quantity or price
- **THEN** the item is updated and the work order total is recalculated

#### Scenario: Remove line item
- **WHEN** a staff user deletes `/work-orders/{id}/items/{item_id}`
- **THEN** the item is removed from the work order

#### Scenario: Attempt to edit item on closed work order
- **WHEN** a staff user tries to add/edit/remove an item on a `CLOSED` or `READY_FOR_PAYMENT` work order
- **THEN** the system returns HTTP 422

### Requirement: Technician assignment
A work order MAY be assigned to one employee (`crm_employees`). Assignment can be set at creation or updated later while the order is not `CLOSED`.

#### Scenario: Assign technician
- **WHEN** a staff user patches `/work-orders/{id}` with `assigned_employee_id`
- **THEN** the work order reflects the new assignee

### Requirement: Walk-in client on work order
A work order SHALL support walk-in clients who do not have a CRM client profile. In that case `client_name_override` and `client_phone_override` fields are used instead of `client_id`.

#### Scenario: Work order with walk-in client
- **WHEN** a staff user creates a work order with `client_name_override` and `client_phone_override` (no `client_id`)
- **THEN** the work order is saved with walk-in fields populated and `client_id` as null

### Requirement: Auto-invoice on READY_FOR_PAYMENT
When a work order transitions to `READY_FOR_PAYMENT`, the system SHALL automatically create a `crm_invoice` with line items mirroring the work order items.

#### Scenario: Invoice auto-creation
- **WHEN** a staff user patches a work order status to `READY_FOR_PAYMENT`
- **THEN** a `crm_invoice` is created and linked to the work order; the response includes `invoice_id`
