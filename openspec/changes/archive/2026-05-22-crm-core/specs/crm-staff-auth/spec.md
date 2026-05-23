## ADDED Requirements

### Requirement: Staff user login
CRM staff SHALL authenticate via email and bcrypt-hashed password. On success the system SHALL issue a signed JWT (access token, 8h expiry) and a refresh token (30d expiry, stored in an HttpOnly cookie).

#### Scenario: Successful login
- **WHEN** a staff user submits valid email and password to `POST /auth/login`
- **THEN** the system returns an access token and sets the refresh token cookie

#### Scenario: Invalid credentials
- **WHEN** a staff user submits an incorrect password or unknown email
- **THEN** the system returns HTTP 401 with a generic "Invalid credentials" message

#### Scenario: Token refresh
- **WHEN** a client sends a valid refresh token cookie to `POST /auth/refresh`
- **THEN** the system issues a new access token without requiring re-login

#### Scenario: Logout
- **WHEN** a staff user calls `POST /auth/logout`
- **THEN** the refresh token cookie is cleared and the token is invalidated server-side

### Requirement: Admin-managed staff accounts
Staff accounts SHALL be created only by users with `settings:write` permission. Self-registration is not allowed. A newly created account receives a temporary password that MUST be changed on first login.

#### Scenario: Admin creates a staff user
- **WHEN** an admin POSTs to `POST /staff-users` with email, name, and role_id
- **THEN** a new `crm_staff_users` record is created with `must_change_password = true`

#### Scenario: Non-admin attempts to create staff user
- **WHEN** a staff user without `settings:write` posts to `POST /staff-users`
- **THEN** the system returns HTTP 403

#### Scenario: Forced password change on first login
- **WHEN** a staff user with `must_change_password = true` successfully authenticates
- **THEN** the returned JWT payload contains `password_change_required: true` and the frontend redirects to the change-password page

### Requirement: RBAC via admin-configured roles
The system SHALL enforce permissions via role-based access control. Each `crm_staff_user` has one `crm_role`. Each `crm_role` has a set of `crm_role_permissions` (permission strings). Every protected endpoint SHALL declare the required permission string and verify it against the authenticated user's role.

#### Scenario: Permitted action
- **WHEN** a staff user with permission `workorders:create` calls `POST /work-orders`
- **THEN** the request is processed normally

#### Scenario: Forbidden action
- **WHEN** a staff user without permission `cash:open_session` calls `POST /cash-sessions`
- **THEN** the system returns HTTP 403

#### Scenario: Admin configures a new role
- **WHEN** an admin POSTs to `POST /roles` with a name and a list of permission strings
- **THEN** a new `crm_role` and its `crm_role_permissions` records are created

#### Scenario: Admin assigns a role to a staff user
- **WHEN** an admin PATCHes `/staff-users/{id}` with a new `role_id`
- **THEN** the staff user's permissions change immediately on the next authenticated request

### Requirement: Admin bootstrap
The system SHALL provide a CLI seed command to create the first admin user when no staff users exist.

#### Scenario: First-run seed
- **WHEN** `python -m app.seed_admin` is executed with `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars set
- **THEN** a staff user is created with a built-in admin role that holds all permission strings
