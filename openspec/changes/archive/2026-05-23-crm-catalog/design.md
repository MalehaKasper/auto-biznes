## Context

Phase 2.1–2.2 built a fully functional CRM back-office (work orders, invoices, payments, inventory, timesheet, expenses). The CRM and the Next.js site share a single PostgreSQL database: Prisma owns site tables (`catalog_listings`, `catalog_inquiries`, `users`, etc.), Alembic owns `crm_*` tables. The CRM backend is FastAPI + SQLAlchemy; the site backend is NestJS + Prisma.

Two existing problems surface in Phase 2.3:
1. `site_readonly.py` declares `SiteUser` with `id: BigInteger` and `account_type: String` — both wrong. The actual Prisma schema uses `id: UUID (String)` and `status: UserStatus`. Shadow User writes using these wrong columns are silently failing.
2. `crm_client_profiles.notes` is a free-text field — no history, no author, no structure.

## Goals / Non-Goals

**Goals:**
- CRM can create, edit, and manage `catalog_listings` (including photo upload to Cloudflare R2)
- CRM can view and triage `catalog_inquiries` (leads from the site)
- Managers can attach structured, editable notes to client profiles, with full change history
- Six reports covering revenue, P&L, expenses, mechanics, services, and inventory value
- NestJS exposes internal storage endpoints used by CRM; CRM never holds R2 credentials directly
- Fix `site_readonly.py` and `shadow_user.py` to match actual Prisma schema

**Non-Goals:**
- Real-time push notifications for new inquiries (Phase 3)
- CRM-initiated SMS on listing status change (Phase 3)
- Barcode scanning for inventory (not in scope)
- Payroll computation from timesheet hours (not in scope)
- Multi-currency catalog prices (UAH only)

## Decisions

### D1: Photo upload routed through NestJS internal API

**Decision**: CRM backend calls `POST /internal/storage/upload-url` on the NestJS API to obtain a presigned PUT URL. The browser uploads directly to R2. Photo deletion calls `DELETE /internal/storage/object`. R2 credentials (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`) live only in the NestJS environment. CRM only needs `SITE_API_BASE_URL` and `INTERNAL_API_KEY`.

**Authentication**: NestJS validates `X-Internal-Key` header against `INTERNAL_API_KEY` env var on all `/internal/*` routes. This is a simple shared-secret pattern — sufficient for a private service-to-service channel on the same Railway private network.

**Key naming**: `catalog/{listing_id}/{uuid}.{ext}` — scoped per listing, enables future bulk deletion of all photos for a listing.

**Alternatives considered**:
- CRM holds its own R2 credentials: simpler for CRM but splits the single source of truth for storage config — rejected.
- Proxy upload through NestJS (NestJS receives the file, forwards to R2): avoids presigned URLs but doubles bandwidth and latency for potentially large photo files — rejected.

---

### D2: Note history stores the "before" snapshot

**Decision**: `crm_client_note_history` records the content of a note *before* each edit, plus who changed it and when. The current `crm_client_notes.content` is always the latest state.

```
Timeline of a note edited twice:

crm_client_note_history rows:
  changed_at=T1, content="original text",   changed_by=Alice
  changed_at=T2, content="first revision",  changed_by=Bob

crm_client_notes.content = "second revision"  ← current state
```

**Soft delete**: `crm_client_notes.deleted_at` (nullable). Deleted notes are hidden from standard queries but preserved with their history. Staff with `notes:manage` can view deleted notes.

**Alternatives considered**:
- Store "after" snapshots: requires reconstructing previous state by going back one entry — confusing, rejected.
- Full version store (before + after): redundant; current state is always in the main row — rejected.

---

### D3: CatalogListing and CatalogInquiry as SQLAlchemy read-write models (no Alembic migration)

**Decision**: `CatalogListing` and `CatalogInquiry` are defined in `site_readonly.py` using a separate `SiteBase = declarative_base()`. Alembic `env.py` is configured to exclude tables not prefixed with `crm_` from autogenerate. CRM reads and writes these tables directly via SQLAlchemy; Prisma remains the migration owner.

`photos` is mapped as `Column(ARRAY(String))` from `sqlalchemy.dialects.postgresql`.

**Corrected SiteUser fields**:
```python
id            = Column(String(36), primary_key=True)   # UUID string
phone         = Column(String(30), unique=True)
name          = Column(String(200), nullable=True)
email         = Column(String(200), nullable=True)
status        = Column(String(20), nullable=True)       # 'SHADOW' | 'REGISTERED'
password_hash = Column(String, nullable=True)
created_at    = Column(DateTime(timezone=True))
updated_at    = Column(DateTime(timezone=True))
```

Shadow User creation must now supply `id=str(uuid.uuid4())` and `updated_at=datetime.utcnow()` since Prisma's `@default(uuid())` and `@updatedAt` are client-side, not database-level.

---

### D4: Recharts for report visualizations

**Decision**: Recharts is added as a CRM frontend dependency. It is idiomatic React, TypeScript-first, and composes naturally with TanStack Query data. All six reports use `ResponsiveContainer` wrappers so charts adapt to any panel width.

Chart types per report:
- Revenue: `ComposedChart` (Bar + Line for cumulative)
- P&L: `BarChart` with two bars per period (revenue / expenses)
- Expenses by category: `PieChart` (inner radius > 0 = donut)
- Mechanic workload: `BarChart` horizontal (hours per mechanic)
- Popular services: `BarChart` horizontal (count per service name)
- Inventory value: plain table (no chart — values need precision, not visualization)

**Alternatives considered**:
- Chart.js via react-chartjs-2: more chart types but imperative API and heavier config overhead — rejected.
- Tremor: includes charting but pulls in a full component library we don't need — rejected.

---

### D5: Permissions granularity

Eight new permission strings are added to `seed_admin.py` and the roles editor:

```
catalog:listings:read   catalog:listings:write
catalog:inquiries:read  catalog:inquiries:manage
reports:financial       reports:operations
notes:read              notes:write              notes:manage
```

`notes:manage` allows editing or soft-deleting notes created by any staff member. `notes:write` allows creating notes and editing only own notes. Viewing deleted notes requires `notes:manage`.

## Risks / Trade-offs

**Cross-service call latency for every photo upload** → The presigned URL request is a fast HTTP call to NestJS (same Railway private network, sub-millisecond). Acceptable.

**site_readonly.py correction is a silent data fix** → If any existing `crm_client_profiles` rows have a `user_id` set from the old broken shadow user logic, those IDs may be garbage (old BigInt values cast to UUID). Mitigation: before deploying, run a one-off script that nullifies `user_id` values that don't match any row in `users.id`. Document in migration plan.

**Alembic autogenerate exclusion must not drift** → If a developer adds a new Prisma table without `crm_` prefix and Alembic picks it up, it could generate a DROP TABLE migration. Mitigation: the existing `include_object` filter in `alembic/env.py` should already block this — verify it covers new models in `SiteBase`.

**Note history grows unbounded** → For a small garage operation, this is not a concern. If needed in the future, a periodic archive of history older than N years is a one-query operation.

## Migration Plan

1. Apply Alembic migration: creates `crm_client_notes` and `crm_client_note_history`
2. Run data migration script: for each `crm_client_profiles` row where `notes IS NOT NULL AND notes != ''`, insert one `crm_client_notes` row with `content = notes`, `created_by = NULL` (system), `created_at = profile.created_at`
3. Run `site_readonly.py` fix: nullify invalid `user_id` values in `crm_client_profiles` (those not found in `users.id`)
4. Deploy CRM backend (new routers, corrected models)
5. Deploy NestJS with internal storage endpoints
6. Deploy CRM frontend (new pages)
7. Rollback: revert deploys; the Alembic migration is reversible (drop the two new tables); `crm_client_profiles.notes` field is untouched by the migration

## Open Questions

- Should `crm_client_profiles.notes` free-text field be retained as a deprecated column after migration, or dropped in a follow-up migration? (Keeping it makes rollback safer; dropping it is cleaner.)
- Date range picker library for reports — use a simple dual `<input type="date">` for MVP or integrate a third-party picker (e.g., react-day-picker)?
