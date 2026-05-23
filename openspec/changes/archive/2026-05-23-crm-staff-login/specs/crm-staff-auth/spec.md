## MODIFIED Requirements

### Requirement: Staff user login
CRM staff SHALL authenticate via login (username) and bcrypt-hashed password. On success the system SHALL issue a signed JWT (access token, 8h expiry) and a refresh token (30d expiry, stored in an HttpOnly cookie). If the authenticated user has `is_sysadmin = true` and no `key` was provided, the system SHALL return HTTP 401 with `detail: "sysadmin_key_required"` instead of issuing tokens. If `is_sysadmin = true` and `key` is provided, it MUST match the `SYSADMIN_KEY` environment variable using constant-time comparison; mismatch returns HTTP 401.

#### Scenario: Successful login — regular staff
- **WHEN** a regular staff user submits valid `login` and `password` to `POST /auth/login`
- **THEN** the system returns an access token and sets the refresh token cookie

#### Scenario: Successful login — sysadmin with key
- **WHEN** the sysadmin submits valid `login`, `password`, and correct `key` to `POST /auth/login`
- **THEN** the system returns an access token and sets the refresh token cookie

#### Scenario: Sysadmin login without key
- **WHEN** the sysadmin submits valid `login` and `password` but omits `key`
- **THEN** the system returns HTTP 401 with `detail: "sysadmin_key_required"`

#### Scenario: Sysadmin login with wrong key
- **WHEN** the sysadmin submits valid `login` and `password` but an incorrect `key`
- **THEN** the system returns HTTP 401

#### Scenario: Invalid credentials
- **WHEN** a staff user submits an incorrect password or unknown login
- **THEN** the system returns HTTP 401 with a generic "Invalid credentials" message

#### Scenario: Token refresh
- **WHEN** a client sends a valid refresh token cookie to `POST /auth/refresh`
- **THEN** the system issues a new access token without requiring re-login

#### Scenario: Logout
- **WHEN** a staff user calls `POST /auth/logout`
- **THEN** the refresh token cookie is cleared

### Requirement: Admin-managed staff accounts
Staff accounts SHALL be created only by users with `settings:write` permission using a `login` username (not email). Self-registration is not allowed. A newly created account receives a temporary password that MUST be changed on first login.

#### Scenario: Admin creates a staff user
- **WHEN** an admin POSTs to `POST /staff-users` with `login`, `name`, `password`, and `role_id`
- **THEN** a new `crm_staff_users` record is created with `must_change_password = true`

#### Scenario: Duplicate login rejected
- **WHEN** an admin attempts to create a staff user with a `login` that already exists
- **THEN** the system returns HTTP 409

#### Scenario: Non-admin attempts to create staff user
- **WHEN** a staff user without `settings:write` posts to `POST /staff-users`
- **THEN** the system returns HTTP 403

#### Scenario: Forced password change on first login
- **WHEN** a staff user with `must_change_password = true` successfully authenticates
- **THEN** the returned JWT payload contains `password_change_required: true` and the frontend redirects to the change-password page

## MODIFIED Requirements

### Requirement: Admin bootstrap
The system SHALL provide a CLI seed command to create the first sysadmin user when no staff users exist. The created user SHALL have `is_sysadmin = true`.

#### Scenario: First-run seed
- **WHEN** `python -m app.seed_admin` is executed with `FIRST_ADMIN_LOGIN`, `FIRST_ADMIN_PASSWORD`, and `SYSADMIN_KEY` env vars set
- **THEN** a staff user is created with `is_sysadmin = true` and a built-in Admin role that holds all permission strings

#### Scenario: Seed skipped when users exist
- **WHEN** `python -m app.seed_admin` is executed and staff users already exist
- **THEN** the script exits without creating any records
