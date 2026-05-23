## Why

The site (Phase 1 / 1.5) captures leads and bookings but has no back-office to process them. Phase 2.1 delivers the CRM Core — the minimum operational back-office needed to receive requests, create work orders, issue invoices, and close payments — before any site integration takes place.

## What Changes

- New standalone project `~/Documents/auto-crm/` (FastAPI backend + Vite/React frontend), sharing the same PostgreSQL database as the site
- Staff authentication: email + password, JWT, admin-managed accounts, RBAC with admin-configurable roles and permission strings
- Work Orders (`crm_work_orders`, `crm_work_order_items`): create, assign, track status, add service/parts line items
- Invoices (`crm_invoices`, `crm_invoice_items`): auto-generated from a work order; optional VAT, line-level and total discounts
- Payments (`crm_payments`): multi-payment support per invoice; types CASH / CARD / BANK_TRANSFER / OTHER
- Cash Register (`crm_cash_sessions`, `crm_cash_transactions`): open/close shifts, per-cashier tracking
- Client Database (`crm_client_profiles`): CRM-side client records linked (optional) to site `users`; walk-in clients auto-create a Shadow User on first save with a phone number
- Employee Database (`crm_employees`): staff records with position, rate type (hourly / fixed)
- Company Settings (`crm_company_settings`): VAT toggle, company name, currency

## Capabilities

### New Capabilities

- `crm-staff-auth`: CRM staff user table, roles, permissions, JWT login/refresh
- `crm-work-orders`: Work order lifecycle — create, assign technician, add line items, change status
- `crm-invoices`: Invoice generation from work order, VAT, discounts, PDF-ready structure
- `crm-payments`: Record payments against an invoice; track payment method and amount
- `crm-cash-register`: Cash shift sessions, per-session transaction log, shift summary
- `crm-clients`: CRM client profiles, Shadow User auto-creation, link to site users
- `crm-employees`: Employee records referenced by work orders as assignees
- `crm-settings`: Company-level configuration (VAT, currency, name)

### Modified Capabilities

- `catalog-inquiries`: CRM will read `catalog_inquiries` to display leads; no requirement change to the site spec — CRM is read-only here

## Impact

- **New project**: `~/Documents/auto-crm/` — Python/FastAPI backend, Vite+React frontend; not inside the Turborepo
- **Database**: New `crm_*` tables managed by Alembic; site tables (`users`, `vehicles`, `catalog_listings`, `catalog_inquiries`, `service_records`) read by CRM via SQLAlchemy models without Alembic migrations
- **No site changes** in Phase 2.1 — site and CRM are fully isolated
- **Dependencies**: Python 3.12+, FastAPI, SQLModel, Alembic, psycopg2, python-jose (JWT), passlib, Vite, React, TanStack Query, React Router v6
