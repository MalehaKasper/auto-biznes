## ADDED Requirements

### Requirement: Record payment against invoice
A payment SHALL be linked to exactly one `crm_invoice`. Multiple payments per invoice are allowed until the invoice is fully paid. Each payment requires an amount and a payment method (`CASH`, `CARD`, `BANK_TRANSFER`, `OTHER`).

#### Scenario: Record first payment
- **WHEN** a staff user with `invoices:write` posts to `POST /payments` with `invoice_id`, `amount`, and `method`
- **THEN** a `crm_payments` record is created and the invoice status is recalculated

#### Scenario: Record split payment (cash + card)
- **WHEN** two payments are recorded for the same invoice — one CASH and one CARD
- **THEN** both records exist and the invoice status is `PAID` when their sum equals the total

#### Scenario: Overpayment prevention
- **WHEN** a payment amount would cause total payments to exceed `invoice.total_amount`
- **THEN** the system returns HTTP 422 with message "Payment exceeds remaining balance"

### Requirement: Cash payment linked to open session
When the payment method is `CASH`, the system SHALL link the payment to the currently open `crm_cash_session` of the authenticated cashier. If no session is open, the request SHALL be rejected.

#### Scenario: Cash payment with open session
- **WHEN** a CASH payment is recorded and the cashier has an open session
- **THEN** the payment is saved with `cash_session_id` and a `crm_cash_transaction` record is created

#### Scenario: Cash payment without open session
- **WHEN** a CASH payment is recorded and the cashier has no open session
- **THEN** the system returns HTTP 422 with message "No open cash session"

### Requirement: Payment immutability
Payments SHALL NOT be edited after creation. If an error is made, the payment must be voided (soft-deleted with `voided_at` timestamp and `voided_by`) and a corrected payment added. Voiding a payment triggers invoice status recalculation.

#### Scenario: Void a payment
- **WHEN** a staff user with `invoices:write` posts to `POST /payments/{id}/void`
- **THEN** the payment record has `voided_at` set, and the invoice status is recalculated as if the payment never existed

#### Scenario: Edit attempt on payment
- **WHEN** a staff user sends PATCH to `/payments/{id}`
- **THEN** the system returns HTTP 405 Method Not Allowed
