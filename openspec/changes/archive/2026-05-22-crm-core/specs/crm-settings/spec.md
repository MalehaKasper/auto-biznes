## ADDED Requirements

### Requirement: Company settings
The system SHALL maintain a single `crm_company_settings` record (singleton pattern) with: `company_name`, `currency` (ISO 4217, default `UAH`), `vat_rate` (nullable decimal 0–1, e.g. `0.20` for 20%), `vat_included_in_price` (boolean). Only staff with `settings:write` may update these.

#### Scenario: Read company settings
- **WHEN** any authenticated staff user calls `GET /settings`
- **THEN** the current company settings record is returned

#### Scenario: Update VAT rate
- **WHEN** a staff user with `settings:write` patches `/settings` with `vat_rate = 0.20`
- **THEN** the setting is updated; new invoices will include VAT; existing invoices are unaffected

#### Scenario: Disable VAT
- **WHEN** a staff user with `settings:write` patches `/settings` with `vat_rate = null`
- **THEN** new invoices have `vat_amount = 0`

#### Scenario: Non-admin update attempt
- **WHEN** a staff user without `settings:write` attempts to patch `/settings`
- **THEN** the system returns HTTP 403

### Requirement: Settings singleton bootstrap
On application startup, if no `crm_company_settings` record exists, the system SHALL create one with defaults: `company_name = ""`, `currency = "UAH"`, `vat_rate = null`.

#### Scenario: First startup creates defaults
- **WHEN** the FastAPI app starts and `crm_company_settings` table is empty
- **THEN** a default row is created automatically via a startup event handler

### Requirement: Permission management
Admins SHALL be able to create, rename, and delete roles, and assign permission strings to roles. Permission strings follow the `<resource>:<action>` convention. Deleting a role is only allowed if no staff users are currently assigned to it.

#### Scenario: Create role with permissions
- **WHEN** an admin posts to `POST /roles` with name and list of permission strings
- **THEN** a `crm_roles` record and associated `crm_role_permissions` records are created

#### Scenario: Update role permissions
- **WHEN** an admin puts to `PUT /roles/{id}/permissions` with a new list of permission strings
- **THEN** old permissions are replaced with the new set

#### Scenario: Delete role with assigned users
- **WHEN** an admin deletes a role that has staff users assigned to it
- **THEN** the system returns HTTP 422 with message "Role has assigned users"
