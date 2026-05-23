## 1. Project Bootstrap

- [x] 1.1 Create `~/Documents/auto-crm/` directory with `backend/` and `frontend/` subdirectories
- [x] 1.2 Create `backend/requirements.txt` with fastapi, uvicorn, sqlmodel, alembic, psycopg2-binary, python-jose[cryptography], passlib[bcrypt], pydantic-settings, python-multipart
- [x] 1.3 Set up Python virtual environment and install dependencies
- [x] 1.4 Create `backend/app/config.py` using pydantic-settings (DATABASE_URL, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS, FIRST_ADMIN_EMAIL, FIRST_ADMIN_PASSWORD)
- [x] 1.5 Create `backend/app/database.py` with SQLAlchemy engine, session factory, and `get_db` dependency
- [x] 1.6 Create `backend/app/main.py` with FastAPI app factory, CORS middleware, and router includes
- [x] 1.7 Create `backend/.env.example` with all required variables

## 2. Alembic Setup

- [x] 2.1 Initialize Alembic in `backend/alembic/` with `alembic init alembic`
- [x] 2.2 Configure `alembic/env.py`: connect to DATABASE_URL from config, import all models, add `include_object` filter that returns `False` for tables without `crm_` prefix
- [x] 2.3 Create initial migration with all `crm_*` tables (run `alembic revision --autogenerate -m "initial_crm_tables"`)
- [x] 2.4 Apply migration: `alembic upgrade head`

## 3. Database Models

- [x] 3.1 Create `backend/app/models/crm_settings.py`: `CrmCompanySettings` (singleton)
- [x] 3.2 Create `backend/app/models/crm_staff.py`: `CrmStaffUser`, `CrmRole`, `CrmRolePermission`
- [x] 3.3 Create `backend/app/models/crm_employees.py`: `CrmEmployee`
- [x] 3.4 Create `backend/app/models/crm_clients.py`: `CrmClientProfile`
- [x] 3.5 Create `backend/app/models/crm_work_orders.py`: `CrmWorkOrder`, `CrmWorkOrderItem`
- [x] 3.6 Create `backend/app/models/crm_invoices.py`: `CrmInvoice`, `CrmInvoiceItem`
- [x] 3.7 Create `backend/app/models/crm_payments.py`: `CrmPayment`
- [x] 3.8 Create `backend/app/models/crm_cash.py`: `CrmCashSession`, `CrmCashTransaction`
- [x] 3.9 Create `backend/app/models/site_readonly.py`: read-only SQLAlchemy models for `users`, `vehicles`, `catalog_inquiries`, `service_records` (no Alembic migrations for these)
- [x] 3.10 Create `backend/app/models/__init__.py` exporting all models

## 4. Auth Module

- [x] 4.1 Create `backend/app/auth/hashing.py`: bcrypt password hash and verify helpers
- [x] 4.2 Create `backend/app/auth/jwt.py`: create_access_token, create_refresh_token, decode_token using python-jose
- [x] 4.3 Create `backend/app/auth/dependencies.py`: `get_current_staff` FastAPI dependency (reads Bearer token, returns CrmStaffUser); `require_permission(perm: str)` dependency factory
- [x] 4.4 Create `backend/app/routers/auth.py`: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `POST /auth/change-password`
- [x] 4.5 Create `backend/app/schemas/auth.py`: LoginRequest, TokenResponse, ChangePasswordRequest

## 5. Settings & Roles Module

- [x] 5.1 Create `backend/app/routers/settings.py`: `GET /settings`, `PATCH /settings`
- [x] 5.2 Create `backend/app/routers/roles.py`: `GET /roles`, `POST /roles`, `PUT /roles/{id}/permissions`, `DELETE /roles/{id}`
- [x] 5.3 Create `backend/app/schemas/settings.py`: CompanySettingsRead, CompanySettingsUpdate
- [x] 5.4 Create `backend/app/schemas/roles.py`: RoleRead, RoleCreate, RolePermissionsUpdate
- [x] 5.5 Add startup event handler in `main.py` to create default `CrmCompanySettings` if table is empty

## 6. Staff Users Module

- [x] 6.1 Create `backend/app/routers/staff_users.py`: `GET /staff-users`, `POST /staff-users`, `PATCH /staff-users/{id}`, `DELETE /staff-users/{id}`
- [x] 6.2 Create `backend/app/schemas/staff_users.py`: StaffUserRead, StaffUserCreate, StaffUserUpdate
- [x] 6.3 Create `backend/app/seed_admin.py`: CLI script to create first admin user with all permissions if no staff users exist

## 7. Employees Module

- [x] 7.1 Create `backend/app/routers/employees.py`: `GET /employees`, `POST /employees`, `PATCH /employees/{id}`
- [x] 7.2 Create `backend/app/schemas/employees.py`: EmployeeRead, EmployeeCreate, EmployeeUpdate

## 8. Clients Module

- [x] 8.1 Create `backend/app/services/shadow_user.py`: `get_or_create_shadow_user(phone, db)` — looks up `users.phone`, inserts shadow user if not found
- [x] 8.2 Create `backend/app/routers/clients.py`: `GET /clients`, `POST /clients`, `PATCH /clients/{id}`, `GET /clients/{id}/work-orders`
- [x] 8.3 Create `backend/app/schemas/clients.py`: ClientProfileRead, ClientProfileCreate, ClientProfileUpdate
- [x] 8.4 Wire shadow user creation in client create/update service logic

## 9. Work Orders Module

- [x] 9.1 Create `backend/app/services/work_orders.py`: status transition validator (allowed transitions map), auto-invoice trigger on `READY_FOR_PAYMENT`
- [x] 9.2 Create `backend/app/routers/work_orders.py`: `GET /work-orders`, `POST /work-orders`, `PATCH /work-orders/{id}`, `GET /work-orders/{id}`
- [x] 9.3 Create `backend/app/routers/work_order_items.py`: `POST /work-orders/{id}/items`, `PATCH /work-orders/{id}/items/{item_id}`, `DELETE /work-orders/{id}/items/{item_id}`
- [x] 9.4 Create `backend/app/schemas/work_orders.py`: WorkOrderRead, WorkOrderCreate, WorkOrderUpdate, WorkOrderItemRead, WorkOrderItemCreate, WorkOrderItemUpdate

## 10. Invoices Module

- [x] 10.1 Create `backend/app/services/invoices.py`: `create_invoice_from_work_order(work_order_id, db)` — copies items, applies VAT from settings, sets status UNPAID; `recalculate_totals(invoice_id, db)`
- [x] 10.2 Create `backend/app/routers/invoices.py`: `GET /invoices`, `GET /invoices/{id}`, `PATCH /invoices/{id}` (discount only), `POST /invoices/{id}/cancel`
- [x] 10.3 Create `backend/app/routers/invoice_items.py`: `PATCH /invoices/{id}/items/{item_id}` (line discount only)
- [x] 10.4 Create `backend/app/schemas/invoices.py`: InvoiceRead, InvoiceUpdate, InvoiceItemRead, InvoiceItemUpdate

## 11. Payments Module

- [x] 11.1 Create `backend/app/services/payments.py`: overpayment check, invoice status recalculation after payment/void, auto-close work order when invoice PAID
- [x] 11.2 Create `backend/app/routers/payments.py`: `POST /payments`, `POST /payments/{id}/void`
- [x] 11.3 Create `backend/app/schemas/payments.py`: PaymentCreate, PaymentRead

## 12. Cash Register Module

- [x] 12.1 Create `backend/app/services/cash.py`: open session (check for existing open session), close session (calculate summary + discrepancy), create transaction
- [x] 12.2 Create `backend/app/routers/cash_sessions.py`: `GET /cash-sessions`, `POST /cash-sessions`, `POST /cash-sessions/{id}/close`, `POST /cash-sessions/{id}/transactions`
- [x] 12.3 Create `backend/app/schemas/cash.py`: CashSessionRead, CashSessionCreate, CashSessionClose, CashTransactionRead, CashTransactionCreate

## 13. Frontend Setup

- [x] 13.1 Scaffold Vite + React + TypeScript project in `frontend/` using `npm create vite@latest . -- --template react-ts`
- [x] 13.2 Install dependencies: `@tanstack/react-query`, `react-router-dom`, `axios`
- [x] 13.3 Create `frontend/src/api/client.ts`: axios instance with base URL and Authorization header interceptor
- [x] 13.4 Create `frontend/src/store/auth.ts`: simple token store (localStorage for access token, cookie handled by browser for refresh)
- [x] 13.5 Create `frontend/src/router.tsx`: React Router v6 routes with protected route wrapper (redirect to `/login` if no token)

## 14. Frontend Auth Pages

- [x] 14.1 Create `frontend/src/pages/Login.tsx`: email + password form, calls `POST /auth/login`, stores token
- [x] 14.2 Create `frontend/src/pages/ChangePassword.tsx`: shown on first login when `password_change_required` is true
- [x] 14.3 Create `frontend/src/api/auth.ts`: TanStack Query mutations for login, logout, refresh, changePassword

## 15. Frontend Layout & Navigation

- [x] 15.1 Create `frontend/src/components/Layout.tsx`: sidebar nav with links to Work Orders, Invoices, Clients, Employees, Cash Register, Settings
- [x] 15.2 Create `frontend/src/components/ProtectedRoute.tsx`: checks auth token, redirects to login if missing

## 16. Frontend Work Orders Pages

- [x] 16.1 Create `frontend/src/api/work_orders.ts`: TanStack Query hooks for list, get, create, update, delete items
- [x] 16.2 Create `frontend/src/pages/WorkOrders/List.tsx`: paginated list with status filter
- [x] 16.3 Create `frontend/src/pages/WorkOrders/Detail.tsx`: work order detail with line items editor and status change button
- [x] 16.4 Create `frontend/src/pages/WorkOrders/Create.tsx`: form to create new work order (client search, vehicle info, technician select)

## 17. Frontend Invoices Pages

- [x] 17.1 Create `frontend/src/api/invoices.ts`: TanStack Query hooks for list, get, update discount, cancel
- [x] 17.2 Create `frontend/src/pages/Invoices/List.tsx`: list of invoices with status badges
- [x] 17.3 Create `frontend/src/pages/Invoices/Detail.tsx`: invoice detail with line items, discount fields, payment history, and add payment form

## 18. Frontend Clients Pages

- [x] 18.1 Create `frontend/src/api/clients.ts`: TanStack Query hooks for search, create, update
- [x] 18.2 Create `frontend/src/pages/Clients/List.tsx`: searchable client list
- [x] 18.3 Create `frontend/src/pages/Clients/Detail.tsx`: client profile view with work order history

## 19. Frontend Cash Register Page

- [x] 19.1 Create `frontend/src/api/cash.ts`: TanStack Query hooks for session state, open, close, add transaction
- [x] 19.2 Create `frontend/src/pages/CashRegister/index.tsx`: shows current session state, open/close buttons, transaction list, shift summary on close

## 20. Frontend Settings Pages

- [x] 20.1 Create `frontend/src/api/settings.ts`: hooks for company settings and roles CRUD
- [x] 20.2 Create `frontend/src/pages/Settings/Company.tsx`: edit company name, currency, VAT rate
- [x] 20.3 Create `frontend/src/pages/Settings/Roles.tsx`: role list, create/edit role with permission string checkboxes
- [x] 20.4 Create `frontend/src/pages/Settings/StaffUsers.tsx`: staff user list, create user form with role assignment
- [x] 20.5 Create `frontend/src/pages/Settings/Employees.tsx`: employee list, create/edit employee form
