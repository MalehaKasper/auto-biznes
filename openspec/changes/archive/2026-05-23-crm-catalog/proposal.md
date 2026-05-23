## Why

Phase 2.1 and 2.2 delivered work order management, invoicing, inventory, and expense tracking — but the CRM has no visibility into the catalog of vehicles for sale/purchase and no structured way for managers to record client context. Phase 2.3 closes these gaps: it gives the CRM team a full catalog management back-office, lead handling for catalog inquiries, a structured client notes system with audit history, and financial/operational reports to inform decisions.

## What Changes

- Add CRM-side CRUD for `catalog_listings` (shared Prisma table): create, edit, soft-delete, status transitions (AVAILABLE / RESERVED / SOLD / CLOSED)
- Add photo upload flow for listings: CRM calls NestJS internal API to get a presigned R2 PUT URL; browser uploads directly to R2; CRM saves public URL to `catalog_listings.photos[]`; photo removal triggers NestJS internal delete from R2
- Add CRM-side lead management for `catalog_inquiries` (shared Prisma table): read-only list with filters, status transitions (NEW → IN_PROGRESS → CLOSED)
- Add `crm_client_notes` table with edit history: managers attach notes to client profiles (optionally linked to a work order); each edit is recorded in `crm_client_note_history`; soft delete with `deleted_at`
- Add reports module with Recharts charts: revenue (bar + cumulative line), P&L, expenses by category (donut), mechanic workload (horizontal bar), popular services (horizontal bar), inventory value (table)
- Add NestJS internal storage endpoints: `POST /internal/storage/upload-url` and `DELETE /internal/storage/object` — authenticated by `X-Internal-Key` header; used exclusively by CRM backend
- **BREAKING (data)**: `crm_client_profiles.notes` (free-text field) is superseded by `crm_client_notes`; existing free-text notes are migrated as a single initial note entry per profile
- Fix `site_readonly.py` SiteUser model: correct `id` type (String/UUID), rename `account_type` → `status`, align all fields with actual Prisma schema; fix `shadow_user.py` accordingly

## Capabilities

### New Capabilities

- `crm-catalog-listings`: CRM management of `catalog_listings` — CRUD, status machine, photo upload/delete via NestJS internal storage API
- `crm-catalog-inquiries`: CRM lead management for `catalog_inquiries` — filtered list, status transitions, link to listing
- `crm-client-notes`: Dedicated notes per client profile (optionally per work order) — create, edit with full history in `crm_client_note_history`, soft delete
- `crm-reports`: Six reports with Recharts charts — revenue, P&L, expenses by category, mechanic workload, popular services, inventory value; date-range filtered

### Modified Capabilities

- `crm-clients`: `crm_client_profiles.notes` free-text field is replaced by `crm_client_notes` relation; Shadow User model corrected (`account_type` → `status`, `id` type UUID)

## Impact

- **Backend (CRM)**: 2 new Alembic-managed tables (`crm_client_notes`, `crm_client_note_history`); 4 new routers (`catalog_listings`, `catalog_inquiries`, `notes`, `reports`); `site_readonly.py` updated with corrected `SiteUser` + new `CatalogListing` and `CatalogInquiry` SQLAlchemy models (no Alembic migration — Prisma owns these tables)
- **Backend (NestJS/site)**: `StorageService` gains `getPresignedUploadUrl()` and `deleteObject()` methods; new `InternalStorageController` at `/internal/storage` protected by `X-Internal-Key`
- **Frontend (CRM)**: 3 new page groups (Catalog, Reports, Notes tab on client profile); Recharts added as dependency
- **Permissions**: New strings — `catalog:listings:read`, `catalog:listings:write`, `catalog:inquiries:read`, `catalog:inquiries:manage`, `reports:financial`, `reports:operations`, `notes:read`, `notes:write`, `notes:manage`
- **Environment**: `INTERNAL_API_KEY` added to both CRM and NestJS envs; `SITE_API_BASE_URL` added to CRM env
