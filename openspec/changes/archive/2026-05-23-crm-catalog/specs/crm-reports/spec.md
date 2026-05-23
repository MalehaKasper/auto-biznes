## ADDED Requirements

### Requirement: Date range filter on all reports
Every report endpoint SHALL accept `date_from` and `date_to` query parameters (ISO 8601 date strings). The system SHALL default to the current calendar month if no range is provided.

#### Scenario: Default date range applied
- **WHEN** a staff user calls any report endpoint without `date_from` or `date_to`
- **THEN** the system uses the first and last day of the current month as the range

#### Scenario: Custom date range applied
- **WHEN** a staff user calls a report endpoint with `date_from=2026-01-01&date_to=2026-03-31`
- **THEN** data is aggregated within that range inclusive

#### Scenario: Invalid date range rejected
- **WHEN** `date_from` is after `date_to`
- **THEN** the system returns `422 Unprocessable Entity`

### Requirement: Revenue report
Staff with `reports:financial` SHALL be able to retrieve revenue aggregated by period (week or month).

#### Scenario: Monthly revenue breakdown
- **WHEN** a staff user with `reports:financial` calls `GET /reports/revenue`
- **THEN** the system returns a list of periods, each with `total_paid` (sum of `crm_payments.amount` within period), `period_label` (e.g., "2026-05"), and a running `cumulative` total

#### Scenario: Grouped by week
- **WHEN** a staff user calls `GET /reports/revenue?group_by=week`
- **THEN** periods are calendar weeks (ISO week number + year)

### Requirement: P&L report
Staff with `reports:financial` SHALL be able to retrieve a profit and loss summary comparing revenue against expenses per period.

#### Scenario: P&L breakdown
- **WHEN** a staff user with `reports:financial` calls `GET /reports/pl`
- **THEN** the system returns periods each containing `revenue` (sum of payments), `expenses` (sum of non-voided `crm_expenses.amount`), and `net` (revenue − expenses)

### Requirement: Expenses by category report
Staff with `reports:financial` SHALL be able to retrieve expense totals grouped by expense category within the date range.

#### Scenario: Category breakdown
- **WHEN** a staff user with `reports:financial` calls `GET /reports/expenses-by-category`
- **THEN** the system returns a list of `{ category_name, total_amount }` entries for non-voided expenses, ordered by `total_amount` descending

### Requirement: Mechanic workload report
Staff with `reports:operations` SHALL be able to retrieve hours worked and work orders completed per mechanic.

#### Scenario: Workload breakdown
- **WHEN** a staff user with `reports:operations` calls `GET /reports/mechanics`
- **THEN** the system returns a list of mechanics each with `employee_name`, `approved_hours` (sum of approved `crm_timesheet_entries.hours`), and `work_orders_count` (distinct work orders assigned to them in the period)

### Requirement: Popular services report
Staff with `reports:operations` SHALL be able to retrieve the most frequently used service line items across work orders in the period.

#### Scenario: Top services
- **WHEN** a staff user with `reports:operations` calls `GET /reports/popular-services`
- **THEN** the system returns up to 20 `{ service_name, count }` entries from `crm_work_order_items` where `item_type = SERVICE`, ordered by `count` descending

### Requirement: Inventory value report
Staff with `reports:operations` SHALL be able to retrieve the current total stock value (quantity × cost_price per part per warehouse).

#### Scenario: Inventory value snapshot
- **WHEN** a staff user with `reports:operations` calls `GET /reports/inventory-value`
- **THEN** the system returns a list of `{ part_name, warehouse_name, quantity, cost_price, total_value }` rows and an overall `grand_total`, representing the current stock snapshot (not filtered by date range)

#### Scenario: Permission denied
- **WHEN** a staff user without `reports:financial` calls a financial report endpoint
- **THEN** the system returns `403 Forbidden`
