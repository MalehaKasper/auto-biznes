## ADDED Requirements

### Requirement: Catalog listing CRUD
The system SHALL allow staff with `catalog:listings:write` to create, edit, and soft-delete vehicle listings stored in the shared `catalog_listings` table.

#### Scenario: Create listing
- **WHEN** a staff user with `catalog:listings:write` posts to `POST /catalog-listings` with required fields (type, make, model, year, description)
- **THEN** a new `catalog_listings` row is created with `status = AVAILABLE` and an empty `photos` array

#### Scenario: Edit listing
- **WHEN** a staff user with `catalog:listings:write` sends `PATCH /catalog-listings/{id}` with updated fields
- **THEN** the listing is updated; `updatedAt` is refreshed

#### Scenario: Read listing list
- **WHEN** a staff user with `catalog:listings:read` calls `GET /catalog-listings` with optional filters (type, status)
- **THEN** the system returns a paginated list of listings including all statuses (not filtered to AVAILABLE only, unlike the public site endpoint)

#### Scenario: Read single listing
- **WHEN** a staff user with `catalog:listings:read` calls `GET /catalog-listings/{id}`
- **THEN** the system returns the full listing record including photos array and current status

#### Scenario: Delete listing
- **WHEN** a staff user with `catalog:listings:write` calls `DELETE /catalog-listings/{id}`
- **THEN** the listing status is set to `CLOSED`; no row is physically removed

### Requirement: Listing status transitions
Staff with `catalog:listings:write` SHALL be able to transition listing status through a defined state machine.

#### Scenario: Mark as reserved
- **WHEN** a staff user patches `status = RESERVED` on a listing with current status `AVAILABLE`
- **THEN** the status is updated to `RESERVED`

#### Scenario: Mark as sold
- **WHEN** a staff user patches `status = SOLD` on a listing with current status `AVAILABLE` or `RESERVED`
- **THEN** the status is updated to `SOLD`

#### Scenario: Reopen closed or sold listing
- **WHEN** a staff user patches `status = AVAILABLE` on a listing with status `CLOSED` or `SOLD`
- **THEN** the status is updated to `AVAILABLE`

#### Scenario: Invalid transition rejected
- **WHEN** a staff user attempts to set `status = RESERVED` on a listing with status `SOLD`
- **THEN** the system returns `422 Unprocessable Entity`

### Requirement: Photo upload via presigned URL
The system SHALL support uploading photos to Cloudflare R2 via a two-step presigned URL flow. The CRM backend SHALL NOT hold R2 credentials directly.

#### Scenario: Request presigned upload URL
- **WHEN** a staff user with `catalog:listings:write` calls `POST /catalog-listings/{id}/upload-url` with `{ filename, contentType }`
- **THEN** the CRM backend calls `POST /internal/storage/upload-url` on the NestJS API and returns `{ presignedUrl, publicUrl, key }` to the client

#### Scenario: Register uploaded photo
- **WHEN** a staff user calls `POST /catalog-listings/{id}/photos` with `{ key, publicUrl }` after a successful R2 PUT
- **THEN** the `publicUrl` is appended to `catalog_listings.photos[]`

#### Scenario: Delete photo
- **WHEN** a staff user with `catalog:listings:write` calls `DELETE /catalog-listings/{id}/photos` with `{ key }`
- **THEN** the CRM backend calls `DELETE /internal/storage/object` on the NestJS API and removes the matching URL from `catalog_listings.photos[]`

#### Scenario: NestJS storage unavailable
- **WHEN** the NestJS internal storage endpoint returns a non-2xx response
- **THEN** the CRM backend returns `502 Bad Gateway` with a descriptive error message; no change is made to `catalog_listings`

### Requirement: NestJS internal storage endpoints
The NestJS API SHALL expose internal endpoints for presigned URL generation and object deletion, authenticated by a shared secret.

#### Scenario: Presigned URL generation succeeds
- **WHEN** a request with valid `X-Internal-Key` header calls `POST /internal/storage/upload-url` with `{ key, contentType }`
- **THEN** the system returns `{ presignedUrl, publicUrl }` where `presignedUrl` expires in 300 seconds

#### Scenario: Object deletion succeeds
- **WHEN** a request with valid `X-Internal-Key` header calls `DELETE /internal/storage/object` with `{ key }`
- **THEN** the object is deleted from R2 and the system returns `204 No Content`

#### Scenario: Invalid internal key rejected
- **WHEN** a request to any `/internal/*` endpoint has a missing or incorrect `X-Internal-Key` header
- **THEN** the system returns `401 Unauthorized`

#### Scenario: R2 not configured
- **WHEN** R2 environment variables are absent and a request reaches `/internal/storage/upload-url`
- **THEN** the system returns `503 Service Unavailable`
