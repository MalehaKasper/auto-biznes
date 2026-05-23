## Why

Phase 2.1 (CRM Core) handles work orders, invoices, and payments but has no inventory awareness — parts are added as free-text line items with no stock tracking, no procurement flow, and no cost accounting. Phase 2.2 closes this gap by introducing a full warehouse + procurement + expense + timesheet system that connects physical stock to financial records.

## What Changes

- Add multi-warehouse parts catalog with analog (substitute) support
- Add inventory transaction log with typed write-off reasons (work, defect, consumption)
- Add automatic reservation when a part is added to a work order item; write-off triggered at `READY_FOR_PAYMENT`; reversal on work order recall
- Add counterparty registry (suppliers, landlords, utilities, and others) as the foundation for purchase orders and expense attribution
- Add purchase order flow: counterparty → order → receive → auto-stock income + expense entry
- Add timesheet: mechanic fills daily hours per work order; manager approves or corrects before payroll
- Add expense tracking with categories (Закупівля, Зарплата, Оренда, Комунальні, Інше) and auto-entries from inventory write-offs and purchase receipts
- Add period budgets per expense category with over-budget warnings
- **BREAKING**: `crm_work_order_items` gains `part_id` (nullable FK) and `warehouse_id` (nullable FK); item_type=PART rows now participate in reservation flow

## Capabilities

### New Capabilities

- `crm-warehouses`: Warehouse location registry; each inventory item is scoped to a warehouse
- `crm-parts`: Parts catalog with part number, unit, sale price, cost price, min quantity alert; analog pairs for substitute suggestions
- `crm-inventory`: Stock per part per warehouse; typed transaction log; reservation/write-off/adjustment flows; auto-warehouse selection when analog is used
- `crm-counterparties`: General counterparty registry (type: SUPPLIER / OTHER); stores EDRPOU, bank details, contact info; used by purchase orders and expenses
- `crm-purchase-orders`: Draft → Received → Paid purchase orders from counterparties; receiving triggers INCOME inventory transactions and a "Закупівля" expense entry per line item
- `crm-timesheet`: Mechanic creates PENDING entries (date, hours, optional work_order_id); manager approves (APPROVED) or corrects hours and approves; original hours preserved for audit
- `crm-expenses`: Manual and auto-generated expense records linked to category, optionally to counterparty, employee, or inventory transaction
- `crm-budget`: Period-based (monthly/quarterly/yearly) budget limits per expense category; over-budget flag surfaced at entry time

### Modified Capabilities

- `crm-work-orders`: WorkOrderItem gains `part_id` and `warehouse_id`; adding a PART item triggers a stock reservation; transitioning to `READY_FOR_PAYMENT` triggers write-off; recalling the work order reverses the write-off
- `crm-employees`: Referenced by timesheet entries; no spec-level requirement change beyond FK relationship

## Impact

- **Backend**: 8 new Alembic-managed table groups; new services for inventory transactions, purchase flow, timesheet approval; extensions to `WorkOrderService` for reservation/write-off hooks
- **Frontend**: 6 new page groups (Warehouses, Parts, Counterparties, Purchase Orders, Timesheet, Expenses/Budget); existing WorkOrder form updated with part picker + warehouse selector
- **Database**: `crm_work_order_items` schema change (nullable FKs added — non-breaking for existing rows)
- **Permissions**: New permission strings: `inventory:read`, `inventory:write`, `purchasing:read`, `purchasing:write`, `timesheet:read`, `timesheet:write`, `timesheet:approve`, `expenses:read`, `expenses:write`, `budget:read`, `budget:write`
