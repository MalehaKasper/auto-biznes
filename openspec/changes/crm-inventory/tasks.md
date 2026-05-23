## 1. Database Models — Warehouses & Parts

- [x] 1.1 Create `app/models/crm_warehouses.py`: `CrmWarehouse` (id, name unique, description, is_active, created_at)
- [x] 1.2 Create `app/models/crm_parts.py`: `CrmPart` (id, part_number unique, name, unit, sale_price Numeric(12,2), cost_price Numeric(12,2), min_quantity Numeric(10,3) default 0, is_active, created_at); `CrmPartAnalog` (id, part_id FK, analog_part_id FK, unique constraint on ordered pair)
- [x] 1.3 Create `app/models/crm_inventory.py`: `CrmInventoryItem` (id, part_id FK, warehouse_id FK, quantity Numeric(10,3) default 0, reserved_quantity Numeric(10,3) default 0, unique(part_id, warehouse_id)); `CrmInventoryTransaction` (id, part_id FK, warehouse_id FK, type Enum, quantity_delta Numeric(10,3), reference_id nullable, created_by FK to crm_staff_users, created_at, notes nullable)

## 2. Database Models — Counterparties & Purchase Orders

- [x] 2.1 Create `app/models/crm_counterparties.py`: `CrmCounterparty` (id, name unique, type Enum SUPPLIER/OTHER, edrpou nullable, iban nullable, bank_name nullable, mfo nullable, contact_person nullable, phone nullable, email nullable, is_active, created_at)
- [x] 2.2 Create `app/models/crm_purchase_orders.py`: `CrmPurchaseOrder` (id, counterparty_id FK, status Enum DRAFT/RECEIVED/PAID, notes nullable, created_by FK, created_at); `CrmPurchaseOrderItem` (id, order_id FK, part_id FK, warehouse_id FK, quantity Numeric(10,3), unit_cost Numeric(12,2))

## 3. Database Models — Timesheet, Expenses & Budget

- [x] 3.1 Create `app/models/crm_timesheet.py`: `CrmTimesheetEntry` (id, employee_id FK to crm_employees, work_order_id FK nullable, date Date, hours Numeric(5,2), original_hours Numeric(5,2) nullable, status Enum PENDING/APPROVED/REJECTED, approved_by FK nullable to crm_staff_users, approved_at nullable, created_at)
- [x] 3.2 Create `app/models/crm_expenses.py`: `CrmExpenseCategory` (id, name unique, created_at); `CrmExpense` (id, amount Numeric(12,2), date Date, category_id FK, description nullable, counterparty_id FK nullable, employee_id FK nullable, inventory_transaction_id FK nullable, voided_at nullable, created_by FK, created_at)
- [x] 3.3 Create `app/models/crm_budget.py`: `CrmCategoryBudget` (id, category_id FK, amount Numeric(12,2), period_start Date, period_end Date, label nullable, created_at)
- [x] 3.4 Extend `app/models/crm_work_orders.py`: add `part_id` (FK nullable to crm_parts) and `warehouse_id` (FK nullable to crm_warehouses) columns to `CrmWorkOrderItem`

## 4. Alembic Migration

- [x] 4.1 Run `alembic revision --autogenerate -m "phase_2_2_inventory_budget_timesheet"` and review generated migration
- [x] 4.2 Run `alembic upgrade head` to apply migration
- [x] 4.3 Seed default expense categories: Закупівля, Зарплата, Оренда, Комунальні, Інше (add to startup event in `main.py`)

## 5. Inventory Service

- [x] 5.1 Create `app/services/inventory.py`: `get_or_create_inventory_item(part_id, warehouse_id, db)` — returns/creates the inventory item row
- [x] 5.2 Implement `create_transaction(part_id, warehouse_id, type, quantity_delta, created_by, db, reference_id=None, notes=None)` — inserts transaction and updates quantity/reserved_quantity counters using `SELECT FOR UPDATE` on inventory item
- [x] 5.3 Implement `reserve_stock(part_id, warehouse_id, quantity, work_order_item_id, created_by, db)` — validates available >= quantity, creates RESERVATION, raises 409 with analog suggestions if insufficient
- [x] 5.4 Implement `release_reservation(work_order_item_id, db)` — creates RELEASE transaction, decrements reserved_quantity
- [x] 5.5 Implement `write_off_work_order(work_order_id, created_by, db)` — for each PART item with part_id: creates WRITE_OFF_WORK transaction + auto-expense entry at cost_price × quantity
- [x] 5.6 Implement `reverse_write_off(work_order_id, db)` — for each PART item with part_id: creates WRITE_OFF_REVERSAL, voids linked expense entry
- [x] 5.7 Implement `recalculate_stock(part_id, warehouse_id, db)` — utility to recompute quantity/reserved_quantity from transaction log sum
- [x] 5.8 Implement `get_analog_suggestions(part_id, db)` — returns analog parts with available stock per warehouse

## 6. Work Order Service Extensions

- [x] 6.1 Modify `app/services/work_orders.py`: in `apply_status_change`, before triggering invoice at `READY_FOR_PAYMENT`, call `write_off_work_order`
- [x] 6.2 Modify recall logic (`READY_FOR_PAYMENT → IN_PROGRESS`): call `reverse_write_off` and cancel invoice
- [x] 6.3 Add work order item add/edit/delete hooks: call `reserve_stock` on PART item add; call `release_reservation` then `reserve_stock` on PART item quantity edit; call `release_reservation` on PART item delete

## 7. Expense Service

- [x] 7.1 Create `app/services/expenses.py`: `create_expense(amount, date, category_id, created_by, db, description=None, counterparty_id=None, employee_id=None, inventory_transaction_id=None)` — inserts expense, checks budget, returns expense + budget_exceeded flag
- [x] 7.2 Implement `check_budget(category_id, date, amount, db)` — finds active budget for period, sums expenses, returns `(exceeded: bool, overage: Decimal | None)`
- [x] 7.3 Implement `void_expense(expense_id, db)` — sets voided_at to now

## 8. Warehouses API

- [x] 8.1 Create `app/routers/warehouses.py` with routes: `GET /warehouses`, `POST /warehouses`, `GET /warehouses/{id}`, `PATCH /warehouses/{id}`, `DELETE /warehouses/{id}` (soft deactivate)
- [x] 8.2 Create Pydantic schemas in `app/schemas/warehouses.py`: `WarehouseCreate`, `WarehouseUpdate`, `WarehouseResponse`
- [x] 8.3 Register router in `app/main.py` with prefix `/warehouses`

## 9. Parts API

- [x] 9.1 Create `app/routers/parts.py` with routes: `GET /parts` (search, filter active), `POST /parts`, `GET /parts/{id}`, `PATCH /parts/{id}`, `GET /parts/{id}/stock` (per warehouse), `GET /parts/{id}/analogs`
- [x] 9.2 Add analog routes: `POST /parts/{id}/analogs` (add pair), `DELETE /parts/{id}/analogs/{analog_id}` (remove pair)
- [x] 9.3 Create Pydantic schemas in `app/schemas/parts.py`: `PartCreate`, `PartUpdate`, `PartResponse`, `PartAnalogResponse`, `StockByWarehouseResponse`
- [x] 9.4 Register router in `app/main.py` with prefix `/parts`

## 10. Inventory API

- [x] 10.1 Create `app/routers/inventory.py` with routes: `GET /inventory` (filter by part/warehouse), `GET /inventory/low-stock`, `GET /inventory/transactions` (filter by part, warehouse, type, date), `POST /inventory/adjustments` (admin only), `POST /inventory/write-offs` (manual defect/consumption)
- [x] 10.2 Create Pydantic schemas in `app/schemas/inventory.py`: `InventoryItemResponse`, `TransactionResponse`, `AdjustmentCreate`, `ManualWriteOffCreate`
- [x] 10.3 Register router in `app/main.py` with prefix `/inventory`

## 11. Counterparties API

- [x] 11.1 Create `app/routers/counterparties.py` with routes: `GET /counterparties` (search, filter by type), `POST /counterparties`, `GET /counterparties/{id}`, `PATCH /counterparties/{id}`, `DELETE /counterparties/{id}` (soft deactivate)
- [x] 11.2 Create Pydantic schemas in `app/schemas/counterparties.py`: `CounterpartyCreate`, `CounterpartyUpdate`, `CounterpartyResponse`
- [x] 11.3 Register router in `app/main.py` with prefix `/counterparties`

## 12. Purchase Orders API

- [x] 12.1 Create `app/routers/purchase_orders.py` with routes: `GET /purchase-orders` (filter by status, counterparty), `POST /purchase-orders`, `GET /purchase-orders/{id}`, `PATCH /purchase-orders/{id}` (edit DRAFT), `DELETE /purchase-orders/{id}` (DRAFT only), `POST /purchase-orders/{id}/receive`, `POST /purchase-orders/{id}/pay`
- [x] 12.2 Implement receive service: iterates line items, calls `create_transaction(INCOME)`, calls `create_expense(Закупівля)`
- [x] 12.3 Create Pydantic schemas in `app/schemas/purchase_orders.py`: `PurchaseOrderCreate`, `PurchaseOrderUpdate`, `PurchaseOrderItemCreate`, `PurchaseOrderResponse`, `PurchaseOrderDetailResponse`
- [x] 12.4 Register router in `app/main.py` with prefix `/purchase-orders`

## 13. Timesheet API

- [x] 13.1 Create `app/routers/timesheet.py` with routes: `GET /timesheet` (filter by employee, date range, status — scoped to own entries if no approve permission), `POST /timesheet`, `GET /timesheet/{id}`, `PATCH /timesheet/{id}` (PENDING only, own only), `DELETE /timesheet/{id}` (PENDING only, own only)
- [x] 13.2 Add approval routes: `POST /timesheet/{id}/approve` (approve or correct), `POST /timesheet/bulk-approve` (list of IDs)
- [x] 13.3 Create Pydantic schemas in `app/schemas/timesheet.py`: `TimesheetEntryCreate`, `TimesheetEntryUpdate`, `TimesheetApprovalRequest`, `TimesheetEntryResponse`
- [x] 13.4 Register router in `app/main.py` with prefix `/timesheet`

## 14. Expenses & Budget API

- [x] 14.1 Create `app/routers/expenses.py` with routes: `GET /expenses` (filter by category, date, counterparty), `POST /expenses`, `GET /expenses/{id}`, `GET /expenses/categories`, `POST /expenses/categories`, `PATCH /expenses/categories/{id}`, `DELETE /expenses/categories/{id}`
- [x] 14.2 Create `app/routers/budget.py` with routes: `GET /budget` (summary for date range), `GET /budget/periods` (list all budget records), `POST /budget`, `PATCH /budget/{id}`, `DELETE /budget/{id}`
- [x] 14.3 Create Pydantic schemas in `app/schemas/expenses.py` and `app/schemas/budget.py`: all Create/Update/Response models including `ExpenseCreateResponse` (with budget_exceeded field)
- [x] 14.4 Register both routers in `app/main.py`

## 15. Frontend — Warehouses

- [x] 15.1 Create `src/api/warehouses.ts`: hooks `useWarehouses`, `useCreateWarehouse`, `useUpdateWarehouse`, `useDeactivateWarehouse`
- [x] 15.2 Create `src/pages/Warehouses/index.tsx`: list with deactivate action
- [x] 15.3 Create `src/pages/Warehouses/WarehouseForm.tsx`: create/edit form
- [x] 15.4 Add `/warehouses` route to `src/router.tsx`

## 16. Frontend — Parts Catalog

- [x] 16.1 Create `src/api/parts.ts`: hooks `useParts`, `usePart`, `usePartStock`, `usePartAnalogs`, `useCreatePart`, `useUpdatePart`, `useAddAnalog`, `useRemoveAnalog`
- [x] 16.2 Create `src/pages/Parts/index.tsx`: searchable list with low-stock badge
- [x] 16.3 Create `src/pages/Parts/PartDetail.tsx`: detail view with stock per warehouse and analogs tab
- [x] 16.4 Create `src/pages/Parts/PartForm.tsx`: create/edit form
- [x] 16.5 Add `/parts` and `/parts/:id` routes to `src/router.tsx`

## 17. Frontend — Inventory

- [x] 17.1 Create `src/api/inventory.ts`: hooks `useInventory`, `useLowStock`, `useInventoryTransactions`, `useCreateAdjustment`, `useCreateManualWriteOff`
- [x] 17.2 Create `src/pages/Inventory/index.tsx`: stock overview table, low-stock filter tab
- [x] 17.3 Create `src/pages/Inventory/TransactionLog.tsx`: filterable transaction log per part/warehouse
- [x] 17.4 Create `src/pages/Inventory/AdjustmentForm.tsx`: admin adjustment form with mandatory notes
- [x] 17.5 Add `/inventory` route to `src/router.tsx`

## 18. Frontend — Counterparties

- [x] 18.1 Create `src/api/counterparties.ts`: hooks `useCounterparties`, `useCreateCounterparty`, `useUpdateCounterparty`
- [x] 18.2 Create `src/pages/Counterparties/index.tsx`: list with type filter
- [x] 18.3 Create `src/pages/Counterparties/CounterpartyForm.tsx`: create/edit form with all fields
- [x] 18.4 Add `/counterparties` route to `src/router.tsx`

## 19. Frontend — Purchase Orders

- [x] 19.1 Create `src/api/purchase_orders.ts`: hooks `usePurchaseOrders`, `usePurchaseOrder`, `useCreatePurchaseOrder`, `useUpdatePurchaseOrder`, `useReceivePurchaseOrder`, `usePayPurchaseOrder`, `useDeletePurchaseOrder`
- [x] 19.2 Create `src/pages/PurchaseOrders/index.tsx`: list with status filter badges
- [x] 19.3 Create `src/pages/PurchaseOrders/PurchaseOrderDetail.tsx`: detail with line items table, receive/pay action buttons
- [x] 19.4 Create `src/pages/PurchaseOrders/PurchaseOrderForm.tsx`: create/edit with line item builder, counterparty picker, part + warehouse selectors
- [x] 19.5 Add `/purchase-orders` and `/purchase-orders/:id` routes to `src/router.tsx`

## 20. Frontend — Timesheet

- [x] 20.1 Create `src/api/timesheet.ts`: hooks `useTimesheetEntries`, `useCreateTimesheetEntry`, `useUpdateTimesheetEntry`, `useDeleteTimesheetEntry`, `useApproveTimesheetEntry`, `useBulkApproveTimesheet`
- [x] 20.2 Create `src/pages/Timesheet/index.tsx`: table with date range filter; manager sees all, mechanic sees own; PENDING rows have approve/correct action
- [x] 20.3 Create `src/pages/Timesheet/TimesheetEntryForm.tsx`: create/edit form with date, hours, optional work order picker
- [x] 20.4 Create `src/pages/Timesheet/ApprovalModal.tsx`: modal for manager to approve or correct hours before confirming
- [x] 20.5 Add `/timesheet` route to `src/router.tsx`

## 21. Frontend — Expenses

- [x] 21.1 Create `src/api/expenses.ts`: hooks `useExpenses`, `useExpenseCategories`, `useCreateExpense`, `useCreateExpenseCategory`, `useUpdateExpenseCategory`
- [x] 21.2 Create `src/pages/Expenses/index.tsx`: expense ledger with category + date filter; over-budget rows highlighted
- [x] 21.3 Create `src/pages/Expenses/ExpenseForm.tsx`: manual expense form with category, counterparty (optional), employee (optional) pickers; shows budget warning if exceeded
- [x] 21.4 Add `/expenses` route to `src/router.tsx`

## 22. Frontend — Budget

- [x] 22.1 Create `src/api/budget.ts`: hooks `useBudgetSummary`, `useBudgetPeriods`, `useCreateBudget`, `useUpdateBudget`, `useDeleteBudget`
- [x] 22.2 Create `src/pages/Budget/index.tsx`: summary table (budgeted vs actual vs remaining per category) with date range picker; over-budget rows in red
- [x] 22.3 Create `src/pages/Budget/BudgetForm.tsx`: create/edit budget period per category
- [x] 22.4 Add `/budget` route to `src/router.tsx`

## 23. Frontend — Work Order Form Extensions

- [x] 23.1 Update `src/pages/WorkOrders/WorkOrderDetail.tsx`: for PART items, add part picker (search crm_parts), warehouse picker, show reserved stock status
- [x] 23.2 Show analog suggestion when insufficient stock is returned (409 response): display list of available analogs with their stock

## 24. Navigation & Permissions

- [x] 24.1 Add new permission strings to `app/seed_admin.py`: `inventory:read`, `inventory:write`, `purchasing:read`, `purchasing:write`, `timesheet:read`, `timesheet:write`, `timesheet:approve`, `expenses:read`, `expenses:write`, `budget:read`, `budget:write`
- [x] 24.2 Update Settings → Roles page: display and toggle new permission strings in the role permission editor
- [x] 24.3 Add new nav links to the sidebar in `src/components/Layout.tsx` (or equivalent): Склад (Inventory, Parts, Warehouses), Закупівлі (Counterparties, Purchase Orders), Фінанси (Expenses, Budget), Табель
