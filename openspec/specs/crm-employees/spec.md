## ADDED Requirements

### Requirement: Employee records
The system SHALL maintain `crm_employees` records for staff members who perform work (technicians, mechanics). An employee record stores: name, position (free text), rate_type (`HOURLY` or `FIXED`), rate_amount, phone (optional), notes, and `is_active` flag.

#### Scenario: Create employee
- **WHEN** a staff user with `settings:write` posts to `POST /employees` with name, position, rate_type, rate_amount
- **THEN** a `crm_employees` record is created with `is_active = true`

#### Scenario: Deactivate employee
- **WHEN** a staff user with `settings:write` patches `/employees/{id}` with `is_active = false`
- **THEN** the employee is deactivated; existing work order references are preserved

#### Scenario: List active employees
- **WHEN** a staff user with any auth calls `GET /employees`
- **THEN** only employees with `is_active = true` are returned by default; `?include_inactive=true` returns all

### Requirement: Employee assignable to work orders
Only employees with `is_active = true` SHALL be assignable to new work orders. The system SHALL validate this on assignment.

#### Scenario: Assign active employee to work order
- **WHEN** a staff user assigns an active employee to a work order
- **THEN** the assignment succeeds

#### Scenario: Assign inactive employee blocked
- **WHEN** a staff user attempts to assign an inactive employee to a work order
- **THEN** the system returns HTTP 422 with message "Employee is not active"
