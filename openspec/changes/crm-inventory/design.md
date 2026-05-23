## Context

Phase 2.1 delivered a functional CRM core (work orders, invoices, payments, cash register, client/employee DB). Parts in work order items are free-text — no catalog, no stock, no cost basis. Phase 2.2 adds the warehouse + procurement + timesheet + expense layer that turns the CRM into a financially traceable back-office.

The system shares a PostgreSQL database with the Next.js site. All new tables use the `crm_` prefix and are managed by Alembic. The backend is FastAPI + SQLAlchemy. Frontend is Vite + React + TypeScript + TanStack Query.

## Goals / Non-Goals

**Goals:**
- Multi-warehouse parts catalog with analog substitution
- Typed inventory transaction log (income, reservation, write-off variants, adjustment)
- Automatic reservation/write-off hooks integrated into the existing work order status machine
- Counterparty registry for purchase orders and expense attribution
- Purchase order flow that generates stock income and expense entries on receipt
- Two-step timesheet: mechanic entry → manager approve/correct
- Expense ledger with category-based budgets and over-limit warnings

**Non-Goals:**
- Barcode / QR scanning
- Automated reorder (min-quantity is stored; reorder is manual)
- Multi-currency (all amounts in UAH)
- Payroll calculation (timesheet tracks hours; wage computation is out of scope)
- Real-time inventory sync with external systems

## Decisions

### D1: Inventory transaction as the single source of truth

**Decision**: `crm_inventory_items.quantity` and `reserved_quantity` are derived from summing `crm_inventory_transactions`. The columns are updated eagerly (on every transaction insert) for read performance. A `recalculate_stock` utility can recompute them from the log for reconciliation.

**Alternatives considered**:
- Pure event-sourced (always sum transactions): consistent but slow for reads — rejected.
- Mutable counters only (no log): fast but no audit trail — rejected.

**Chosen**: Eager counter update + full transaction log. Counters are the fast path; log is the audit path.

---

### D2: Reservation model — reserve at item add, write-off at READY_FOR_PAYMENT

**Decision**:
- `PART` item added to work order → `RESERVATION` transaction (reserved_quantity++)
- Work order → `READY_FOR_PAYMENT` → `WRITE_OFF_WORK` per part item (quantity--, reserved_quantity--)
- Work order recalled (`READY_FOR_PAYMENT → IN_PROGRESS`) → `WRITE_OFF_REVERSAL` (quantity++, reserved_quantity++)
- Quantity check (available = quantity - reserved_quantity) at reservation time; reject if insufficient

**Alternatives considered**:
- Reserve at work order creation (too early, speculative): rejected.
- Write-off immediately at item add (no reservation phase): loses visibility of "reserved but not yet consumed" — rejected.

---

### D3: Auto-warehouse selection when part has no stock at chosen warehouse

**Decision**: If a work order item references a part with zero available stock at the explicitly selected warehouse, the system checks analog parts across all warehouses. The first analog with available stock is surfaced as a suggestion (not auto-applied). The user chooses.

**Rationale**: Auto-swapping parts silently would hide stock problems and create audit confusion.

---

### D4: Counterparty as a general entity (not supplier-only)

**Decision**: `crm_counterparties` has `type: SUPPLIER | OTHER`. Both types can appear in expenses (as creditor). Only `SUPPLIER` type appears in the purchase order counterparty picker. `OTHER` covers landlords, utilities, service providers.

---

### D5: Purchase order triggers expense on RECEIVED (not PAID)

**Decision**: The expense entry for a purchase is created when the order status changes to `RECEIVED` (goods arrive), not when it is marked `PAID` (cash leaves). This matches accrual accounting — cost is recognized when goods are in hand.

**Rationale**: Tracking when money actually leaves is handled by the payment record on the purchase order itself (future enhancement). The inventory is available immediately on receive.

---

### D6: Timesheet original_hours for manager corrections

**Decision**: `crm_timesheet_entries` stores both `original_hours` (mechanic's submission, nullable) and `hours` (final approved value). If the manager approves without correction, `original_hours` is null and `hours` is the mechanic's value. If the manager corrects, `original_hours` = mechanic's value, `hours` = corrected value.

**Rationale**: Preserves audit trail without a separate history table.

---

### D7: Expense auto-entries are created by service layer, not triggers

**Decision**: All auto-generated expenses (on inventory write-off, on purchase order receive) are created by Python service functions, not database triggers.

**Rationale**: Keeps logic testable and visible in the Python codebase. DB triggers would be invisible in code review.

---

### D8: Budget warnings are advisory, not blocking

**Decision**: Exceeding a category budget emits a warning field in the API response but does not reject the expense creation. Only admins can dismiss or override.

**Rationale**: Blocking expenses would halt operations in a real workshop. The budget is a management tool, not a hard limit.

---

### D9: Permissions — 11 new strings, role-level as before

All new permissions use the existing RBAC system (`crm_role_permissions`). New strings:
`inventory:read`, `inventory:write`, `purchasing:read`, `purchasing:write`,
`timesheet:read`, `timesheet:write`, `timesheet:approve`,
`expenses:read`, `expenses:write`, `budget:read`, `budget:write`

---

### D10: WorkOrderItem schema extension — non-breaking

`crm_work_order_items` gains two nullable FK columns: `part_id` and `warehouse_id`. Existing rows remain valid (both null = free-text part as before). Only rows with item_type=PART and non-null `part_id` participate in the inventory flow.

## Risks / Trade-offs

- **Counter drift**: If a bug skips the counter update on a transaction insert, `quantity` diverges from the log sum. Mitigation: `recalculate_stock` utility run on demand; unit tests covering all transaction types.
- **Concurrent reservation**: Two requests reserving the last unit simultaneously could both succeed. Mitigation: wrap reservation in `SELECT FOR UPDATE` on `crm_inventory_items`.
- **Timesheet manager correction visibility**: If manager corrects hours without notifying the mechanic, trust issues arise. Mitigation: `approved_by` + `approved_at` stored; correction is visible to mechanic in read view (out of scope for notifications in 2.2).
- **Budget period overlap**: Budget periods are stored as `period_start / period_end` dates. Overlapping periods for the same category are not prevented at DB level. Mitigation: service-layer validation rejects overlapping inserts.

## Migration Plan

1. Run Alembic migration: adds all new `crm_*` tables + nullable columns on `crm_work_order_items`
2. Seed default expense categories: Закупівля, Зарплата, Оренда, Комунальні, Інше
3. No existing data migration required (new tables are empty; existing work order items have null part_id)
4. Rollback: `alembic downgrade -1` drops new tables and removes added columns

## Open Questions

- Should `WRITE_OFF_CONSUMPTION` (recurring shop supplies) auto-generate an expense entry, or is it manual? → Assumed auto (same as WRITE_OFF_WORK) for consistency.
- Should purchase orders have a payment record (cash/card/transfer) or just a paid/unpaid flag? → Kept as simple `status: PAID` flag in 2.2; full payment record is Phase 2.2 extension if needed.
