## ADDED Requirements

### Requirement: Catalog inquiry list and filtering
The system SHALL allow staff with `catalog:inquiries:read` to view all `catalog_inquiries` submitted from the site, with filtering by status, type, and linked listing.

#### Scenario: List inquiries
- **WHEN** a staff user with `catalog:inquiries:read` calls `GET /catalog-inquiries`
- **THEN** the system returns a paginated list of inquiries ordered by `createdAt` descending, including linked listing make/model/year if `listingId` is set

#### Scenario: Filter by status
- **WHEN** a staff user calls `GET /catalog-inquiries?status=NEW`
- **THEN** only inquiries with `status = NEW` are returned

#### Scenario: Filter by type
- **WHEN** a staff user calls `GET /catalog-inquiries?type=BUY`
- **THEN** only inquiries with the matching type are returned

#### Scenario: Filter by listing
- **WHEN** a staff user calls `GET /catalog-inquiries?listing_id={id}`
- **THEN** only inquiries linked to that listing are returned

#### Scenario: View single inquiry
- **WHEN** a staff user with `catalog:inquiries:read` calls `GET /catalog-inquiries/{id}`
- **THEN** the full inquiry record is returned including all trade vehicle fields, offered price, and linked listing summary

### Requirement: Inquiry status management
Staff with `catalog:inquiries:manage` SHALL be able to transition inquiry status.

#### Scenario: Mark inquiry as in progress
- **WHEN** a staff user with `catalog:inquiries:manage` calls `PATCH /catalog-inquiries/{id}` with `{ status: "IN_PROGRESS" }` on an inquiry with status `NEW`
- **THEN** the inquiry status is updated to `IN_PROGRESS`

#### Scenario: Close inquiry
- **WHEN** a staff user with `catalog:inquiries:manage` calls `PATCH /catalog-inquiries/{id}` with `{ status: "CLOSED" }`
- **THEN** the inquiry status is updated to `CLOSED` regardless of current status

#### Scenario: Reopen closed inquiry
- **WHEN** a staff user with `catalog:inquiries:manage` calls `PATCH /catalog-inquiries/{id}` with `{ status: "IN_PROGRESS" }` on a `CLOSED` inquiry
- **THEN** the inquiry status is updated to `IN_PROGRESS`

#### Scenario: Permission denied
- **WHEN** a staff user without `catalog:inquiries:manage` attempts to change inquiry status
- **THEN** the system returns `403 Forbidden`
