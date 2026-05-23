## ADDED Requirements

### Requirement: Cash shift sessions
A cashier SHALL open a cash session before recording CASH payments. Only one session per staff user may be open at a time. Closing a session requires a declared closing balance and produces a shift summary.

#### Scenario: Open session
- **WHEN** a staff user with `cash:open_session` posts to `POST /cash-sessions` with `opening_balance`
- **THEN** a `crm_cash_sessions` record is created with `opened_at` = now and `cashier_id` = authenticated user

#### Scenario: Duplicate open session blocked
- **WHEN** a cashier already has an open session and attempts to open another
- **THEN** the system returns HTTP 422 with message "You already have an open session"

#### Scenario: Close session
- **WHEN** a cashier with `cash:close_session` posts to `POST /cash-sessions/{id}/close` with `closing_balance`
- **THEN** `closed_at` is set; the session calculates `expected_balance = opening_balance + SUM(cash_in_transactions) - SUM(cash_out_transactions)` and records `discrepancy = closing_balance - expected_balance`

#### Scenario: Close session of another cashier
- **WHEN** a staff user attempts to close a session they did not open (and lacks `settings:write`)
- **THEN** the system returns HTTP 403

### Requirement: Cash transactions
Every CASH payment recorded during an open session SHALL create a `crm_cash_transactions` entry with type `CASH_IN`. Manual cash-out transactions (e.g. petty cash expenses) MAY be added by cashiers with `cash:manage_transactions`.

#### Scenario: Automatic CASH_IN on payment
- **WHEN** a CASH payment is created linked to an open session
- **THEN** a `crm_cash_transactions` record with `type = CASH_IN` and the payment amount is created

#### Scenario: Manual CASH_OUT
- **WHEN** a cashier with `cash:manage_transactions` posts to `POST /cash-sessions/{id}/transactions` with `type = CASH_OUT`, amount, and description
- **THEN** a cash-out transaction is recorded against the session

### Requirement: Session shift summary
Closing a session SHALL produce a summary including: opening balance, total cash-in, total cash-out, expected closing balance, declared closing balance, and discrepancy.

#### Scenario: Shift summary on close
- **WHEN** a session is closed
- **THEN** the response includes all summary fields and the `crm_cash_sessions` record stores them persistently
