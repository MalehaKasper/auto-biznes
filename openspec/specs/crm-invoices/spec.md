## ADDED Requirements

### Requirement: Invoice auto-generation from work order
An invoice SHALL be created automatically when a work order transitions to `READY_FOR_PAYMENT`. The invoice SHALL copy all line items from the work order at that moment. The invoice is not re-generated if the work order is recalled to `IN_PROGRESS`; instead, a new status transition creates a new invoice.

#### Scenario: Invoice created on status change
- **WHEN** a work order moves to `READY_FOR_PAYMENT`
- **THEN** a `crm_invoice` record exists with `work_order_id`, status `UNPAID`, and line items matching the work order

#### Scenario: Invoice not duplicated on re-transition
- **WHEN** a work order moves back to `IN_PROGRESS` and then again to `READY_FOR_PAYMENT`
- **THEN** a new invoice is created; the old invoice is marked `CANCELLED`

### Requirement: VAT on invoices
Invoices SHALL optionally include VAT based on the company-level VAT setting (`crm_company_settings.vat_rate`). When VAT is enabled, the invoice SHALL store `subtotal`, `vat_amount`, and `total_amount` separately.

#### Scenario: Invoice with VAT enabled
- **WHEN** `vat_rate` is set (e.g. 20%) and an invoice is generated
- **THEN** `vat_amount = subtotal * vat_rate` and `total_amount = subtotal + vat_amount`

#### Scenario: Invoice with VAT disabled
- **WHEN** `vat_rate` is null in company settings
- **THEN** `vat_amount = 0` and `total_amount = subtotal`

### Requirement: Discounts on invoices
Invoices SHALL support two non-exclusive discount types: a percentage discount applied to the entire invoice total, and individual line-item discounts. Both are applied before VAT calculation.

#### Scenario: Invoice-level percentage discount
- **WHEN** a staff user patches `/invoices/{id}` with `discount_percent` (0–100)
- **THEN** `subtotal = SUM(line_items.total) * (1 - discount_percent/100)` and totals are recalculated

#### Scenario: Line-item discount
- **WHEN** a staff user patches `/invoices/{id}/items/{item_id}` with `discount_percent`
- **THEN** that line item's total is reduced and the invoice totals are recalculated

#### Scenario: Combined discounts
- **WHEN** both line-item and invoice-level discounts are set
- **THEN** line-item discounts apply first, then the invoice-level discount applies to the resulting subtotal

### Requirement: Invoice status
An invoice SHALL have status: `UNPAID` → `PARTIALLY_PAID` → `PAID` or `CANCELLED`. Status transitions are driven by payment records, not manual edits.

#### Scenario: Partial payment updates status
- **WHEN** a payment is recorded for an amount less than the invoice total
- **THEN** invoice status becomes `PARTIALLY_PAID`

#### Scenario: Full payment marks invoice paid
- **WHEN** total payments equal or exceed the invoice total amount
- **THEN** invoice status becomes `PAID` and the linked work order moves to `CLOSED`

#### Scenario: Invoice cancellation
- **WHEN** a staff user with `invoices:write` cancels an invoice
- **THEN** invoice status becomes `CANCELLED` and no further payments can be added
