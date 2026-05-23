## Context

The site (Next.js / NestJS) is running with Phase 1.5 complete. It stores leads in `catalog_inquiries`, bookings in `bookings`, clients in `users`/`vehicles`/`service_records`. There is no back-office to process any of this. Phase 2.1 builds the CRM as an entirely separate project (`~/Documents/auto-crm/`) sharing the same PostgreSQL database. No site code changes in this phase.

## Goals / Non-Goals

**Goals:**
- Standalone FastAPI backend + Vite/React frontend for the CRM
- Staff authentication with RBAC (admin-managed roles and permission strings)
- Work Orders: create, assign, manage line items, track status
- Invoices: auto-generate from work order, VAT toggle, discounts
- Payments: multi-payment per invoice, payment method tracking
- Cash Register: open/close shift sessions, per-session transaction log
- Client database: CRM profiles linked optionally to site `users`; Shadow User creation
- Employee database: records referenced as work order assignees
- Company Settings: VAT toggle, company name, default currency

**Non-Goals:**
- Site integration, webhooks, or real-time sync (Phase 3)
- Inventory / parts warehouse (Phase 2.2)
- Expense tracking and budgeting (Phase 2.2)
- Catalog management UI (Phase 2.3)
- Reports and analytics (Phase 2.3)
- PDF generation (can be added later on top of invoice data structure)
- Mobile app

## Decisions

### D1: Separate project, shared database
**Decision:** CRM lives at `~/Documents/auto-crm/`, not in the Turborepo monorepo.  
**Rationale:** CRM uses Python/FastAPI — a completely different language ecosystem. Forcing it into the Node monorepo would add friction without benefit. The only shared artifact is the PostgreSQL database.  
**Alternative considered:** CRM as another NestJS app in the monorepo — rejected because we want Python/FastAPI for its auto-generated Swagger docs and type safety via Pydantic.  

### D2: Alembic owns only `crm_*` tables
**Decision:** Alembic generates and runs migrations exclusively for tables prefixed `crm_`. Site tables (`users`, `vehicles`, `bookings`, `catalog_*`, `service_records`) are defined in SQLAlchemy models for reading/joining but are excluded from Alembic migrations with `include_object` filter.  
**Rationale:** Prevents migration conflicts between Prisma and Alembic on the same database. Each tool is authoritative for its own namespace.  

### D3: Staff authentication separate from site auth
**Decision:** `crm_staff_users` is a completely separate table. Login is email + bcrypt password. JWTs are issued by the FastAPI backend and carry `staff_user_id` + `role_id`. No relation to site `users`.  
**Rationale:** CRM accounts are admin-controlled, have no phone/OTP flow, and carry different permissions than site clients.  

### D4: RBAC via admin-configured roles
**Decision:** `crm_roles` contains role definitions. `crm_role_permissions` contains permission strings (e.g. `workorders:read`, `cash:open_session`). Staff users have one role. Admins can create/edit roles and assign permission strings.  
**Rationale:** Flexible enough to support mechanic / manager / admin distinctions without hardcoding roles in code.  
**Permission strings convention:** `<resource>:<action>` — e.g. `workorders:create`, `invoices:read`, `cash:open_session`, `clients:write`, `settings:write`.  

### D5: Invoice auto-created on WorkOrder status transition
**Decision:** When a WorkOrder transitions to `READY_FOR_PAYMENT` status, the system automatically creates an `crm_invoice` with line items mirroring `crm_work_order_items`. The invoice is not editable after creation except for discount fields.  
**Rationale:** Enforces the single source of truth: prices and services are set in the WorkOrder phase; the invoice is a financial record.  

### D6: Multi-payment model
**Decision:** `crm_payments` allows multiple records per invoice. Invoice is considered `PAID` when `SUM(payments.amount) >= invoice.total_amount`. Overpayment is prevented at application level.  
**Rationale:** Real-world scenario: partial cash payment + card for the rest. Simpler than a single payment with split types.  

### D7: Cash Register as shift sessions
**Decision:** `crm_cash_sessions` records open/close events per cashier. `crm_cash_transactions` records each cash movement linked to a session and optionally to a payment. Only one open session per cashier at a time.  
**Rationale:** Standard POS pattern. Allows end-of-shift reconciliation without a complex accounting engine.  

### D8: Shadow User creation on client save
**Decision:** When a CRM client profile is saved with a phone number and no linked `user_id`, the system looks up `users.phone` in the site table. If found, links the profile. If not found, inserts a new `users` record with `account_type = 'SHADOW'`. This is a write operation across the namespace boundary — acceptable because it serves data continuity for the client.  
**Rationale:** Allows the client to later log into the site and see their service history.  

### D9: Project structure
```
auto-crm/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app factory
│   │   ├── config.py        # Settings (pydantic-settings)
│   │   ├── database.py      # SQLAlchemy engine + session
│   │   ├── auth/            # JWT, password hashing, dependencies
│   │   ├── models/          # SQLModel table definitions (crm_* + site read-only)
│   │   ├── routers/         # One file per domain (work_orders, invoices, ...)
│   │   └── schemas/         # Pydantic request/response models
│   ├── alembic/
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/             # TanStack Query hooks
    │   ├── pages/           # React Router v6 routes
    │   ├── components/
    │   └── main.tsx
    ├── index.html
    └── vite.config.ts
```

## Risks / Trade-offs

- **Dual-write to `users` table** (Shadow User) → breaks the hard namespace separation. Mitigation: wrap in a transaction; if insert fails (duplicate phone race condition), retry with a select.
- **Alembic autogenerate sees site tables** → could accidentally generate DROP TABLE migrations. Mitigation: `include_object` hook in `env.py` that returns `False` for any table without `crm_` prefix.
- **No row-level security** → all CRM staff can read all data unless permissions are checked at the API layer. Mitigation: every router endpoint checks the required permission string against the token's role.
- **Shared DB connection pool** → site and CRM contend for connections. Mitigation: set `pool_size` conservatively (5-10) in both apps; revisit if load grows.

## Migration Plan

1. Run `alembic upgrade head` to create all `crm_*` tables (no site table changes)
2. Seed first admin user via a CLI script (`python -m app.seed_admin`)
3. Start FastAPI backend (`uvicorn app.main:app`)
4. Start Vite dev server (`npm run dev`)
5. No rollback risk: new tables only; site is unaffected

## Open Questions

- Final deployment target for CRM backend (Railway vs VPS vs Docker Compose) — deferred to post-Phase 2.3
- Should cash session be per-device or per-user? — decided: per-user (one open session per `staff_user_id` at a time)
