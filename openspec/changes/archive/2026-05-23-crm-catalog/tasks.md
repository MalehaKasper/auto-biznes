## 1. Bug Fix — site_readonly.py & shadow_user.py

- [x] 1.1 Update `app/models/site_readonly.py` `SiteUser`: change `id` to `Column(String(36))`, rename `account_type` → `status`, add `email`, `password_hash`, `updated_at` columns to match Prisma schema
- [x] 1.2 Add `CatalogListing` SQLAlchemy model to `site_readonly.py`: all fields from Prisma schema including `photos = Column(ARRAY(String))` from `sqlalchemy.dialects.postgresql`
- [x] 1.3 Add `CatalogInquiry` SQLAlchemy model to `site_readonly.py`: all fields including nullable trade vehicle fields and `offered_price`
- [x] 1.4 Update `app/services/shadow_user.py`: replace `account_type="SHADOW"` with `status="SHADOW"`, add `id=str(uuid.uuid4())` and `updated_at=datetime.utcnow()` on insert
- [x] 1.5 Verify `alembic/env.py` `include_object` filter excludes `SiteBase` tables from autogenerate (tables without `crm_` prefix must be ignored)
- [x] 1.6 Write and run one-off script: nullify `crm_client_profiles.user_id` where the UUID does not match any row in `users.id` (clean up garbage IDs from broken shadow user writes)

## 2. Database Models — Client Notes

- [x] 2.1 Create `app/models/crm_client_notes.py`: `CrmClientNote` (id UUID PK, client_profile_id FK, work_order_id FK nullable, content Text, created_by FK to crm_staff_users, created_at, updated_by FK nullable, updated_at nullable, deleted_at nullable); `CrmClientNoteHistory` (id UUID PK, note_id FK, content Text, changed_by FK, changed_at)

## 3. Alembic Migration

- [ ] 3.1 Run `alembic revision --autogenerate -m "phase_2_3_client_notes"` and review generated migration for correctness
- [ ] 3.2 Run `alembic upgrade head` to apply migration

## 4. Data Migration — Notes from Client Profiles

- [x] 4.1 Write migration script (or startup event): for each `crm_client_profiles` row where `notes IS NOT NULL AND notes != ''`, insert one `CrmClientNote` with `content = notes`, `client_profile_id = profile.id`, `created_by = NULL` (system), `created_at = profile.created_at`

## 5. NestJS Internal Storage Endpoints

- [x] 5.1 Add `getPresignedUploadUrl(key: string, contentType: string): Promise<string>` method to `StorageService` using `@aws-sdk/s3-request-presigner` and `PutObjectCommand`; expires in 300s
- [x] 5.2 Add `deleteObject(key: string): Promise<void>` method to `StorageService` using `DeleteObjectCommand`
- [x] 5.3 Create `InternalStorageController` at prefix `/internal/storage`: guard all routes with `X-Internal-Key` header check against `INTERNAL_API_KEY` env var
- [x] 5.4 Add `POST /internal/storage/upload-url` route: accepts `{ key, contentType }`, calls `StorageService.getPresignedUploadUrl`, returns `{ presignedUrl, publicUrl }`
- [x] 5.5 Add `DELETE /internal/storage/object` route: accepts `{ key }` in body, calls `StorageService.deleteObject`, returns 204
- [x] 5.6 Add `INTERNAL_API_KEY` to `apps/api/.env.example`
- [x] 5.7 Register `InternalStorageController` and update `StorageModule`

## 6. Catalog Listings Backend (FastAPI)

- [x] 6.1 Create `app/schemas/catalog_listings.py`: `CatalogListingCreate`, `CatalogListingUpdate`, `CatalogListingResponse`, `UploadUrlRequest`, `UploadUrlResponse`, `PhotoRegisterRequest`, `PhotoDeleteRequest`
- [x] 6.2 Create `app/routers/catalog_listings.py`: `GET /catalog-listings` (filter by type, status; paginated), `POST /catalog-listings`, `GET /catalog-listings/{id}`, `PATCH /catalog-listings/{id}`, `DELETE /catalog-listings/{id}` (sets status=CLOSED)
- [x] 6.3 Add status transition validation in PATCH handler: enforce allowed transitions per design (invalid transition → 422)
- [x] 6.4 Add `POST /catalog-listings/{id}/upload-url`: calls NestJS `POST /internal/storage/upload-url` via `httpx`; key format `catalog/{listing_id}/{uuid4()}.{ext}`; returns presigned URL to client; returns 502 on NestJS error
- [x] 6.5 Add `POST /catalog-listings/{id}/photos`: appends `publicUrl` to `photos[]`
- [x] 6.6 Add `DELETE /catalog-listings/{id}/photos`: calls NestJS `DELETE /internal/storage/object` then removes URL from `photos[]`; returns 502 on NestJS error
- [x] 6.7 Add `SITE_API_BASE_URL` and `INTERNAL_API_KEY` to CRM backend config (`app/config.py`) and `.env.example`
- [x] 6.8 Register router in `app/main.py` with prefix `/catalog-listings`; require `catalog:listings:read` for GET, `catalog:listings:write` for mutation routes

## 7. Catalog Inquiries Backend (FastAPI)

- [x] 7.1 Create `app/schemas/catalog_inquiries.py`: `CatalogInquiryResponse`, `CatalogInquiryStatusUpdate`
- [x] 7.2 Create `app/routers/catalog_inquiries.py`: `GET /catalog-inquiries` (filter by status, type, listing_id; paginated), `GET /catalog-inquiries/{id}`, `PATCH /catalog-inquiries/{id}` (status only; requires `catalog:inquiries:manage`)
- [x] 7.3 Register router in `app/main.py` with prefix `/catalog-inquiries`

## 8. Client Notes Backend (FastAPI)

- [x] 8.1 Create `app/schemas/client_notes.py`: `NoteCreate`, `NoteUpdate`, `NoteResponse` (includes `created_by_name`, `updated_by_name`, `work_order_id`), `NoteHistoryEntry`
- [x] 8.2 Create `app/routers/client_notes.py` under `/clients/{client_id}/notes`: `GET /` (exclude deleted; `include_deleted=true` requires `notes:manage`), `POST /`, `PATCH /{note_id}`, `DELETE /{note_id}`, `GET /{note_id}/history`
- [x] 8.3 Implement edit logic: before updating `content`, insert current content into `crm_client_note_history`; set `updated_by` and `updated_at`
- [x] 8.4 Enforce ownership check on PATCH and DELETE: staff without `notes:manage` may only modify their own notes (created_by == current_staff_id); return 403 otherwise
- [x] 8.5 Validate `work_order_id` belongs to the given `client_profile_id` when provided; return 422 otherwise
- [x] 8.6 Register router in `app/main.py` nested under `/clients`

## 9. Reports Backend (FastAPI)

- [x] 9.1 Create `app/routers/reports.py` with shared date-range parsing dependency: `date_from` and `date_to` defaults to first/last day of current month; validate `date_from <= date_to`
- [x] 9.2 Implement `GET /reports/revenue`: group `crm_payments.amount` by month (or week if `group_by=week`); add cumulative column; require `reports:financial`
- [x] 9.3 Implement `GET /reports/pl`: join revenue (payments) and expenses (non-voided) per period; return `{ period, revenue, expenses, net }`; require `reports:financial`
- [x] 9.4 Implement `GET /reports/expenses-by-category`: group non-voided `crm_expenses` by `category_id`; join category name; require `reports:financial`
- [x] 9.5 Implement `GET /reports/mechanics`: join `crm_timesheet_entries` (APPROVED) and `crm_work_orders` by employee; return `{ employee_name, approved_hours, work_orders_count }`; require `reports:operations`
- [x] 9.6 Implement `GET /reports/popular-services`: aggregate `crm_work_order_items` where `item_type = SERVICE` by `name`; top 20; require `reports:operations`
- [x] 9.7 Implement `GET /reports/inventory-value`: join `crm_inventory_items`, `crm_parts`, `crm_warehouses`; compute `quantity × cost_price`; include `grand_total`; not date-filtered; require `reports:operations`
- [x] 9.8 Create `app/schemas/reports.py`: all response models for the six reports
- [x] 9.9 Register router in `app/main.py` with prefix `/reports`

## 10. Permissions Update

- [x] 10.1 Add new permission strings to `app/seed_admin.py`: `catalog:listings:read`, `catalog:listings:write`, `catalog:inquiries:read`, `catalog:inquiries:manage`, `reports:financial`, `reports:operations`, `notes:read`, `notes:write`, `notes:manage`
- [x] 10.2 Update Settings → Roles page in frontend: display and toggle all new permission strings in the role permission editor

## 11. Frontend — Catalog Listings

- [x] 11.1 Install `recharts` as a CRM frontend dependency
- [x] 11.2 Create `src/api/catalog_listings.ts`: hooks `useCatalogListings`, `useCatalogListing`, `useCreateListing`, `useUpdateListing`, `useDeleteListing`, `useRequestUploadUrl`, `useRegisterPhoto`, `useDeletePhoto`
- [x] 11.3 Create `src/pages/Catalog/ListingsIndex.tsx`: table with type + status filter, status badge, "New Listing" button
- [x] 11.4 Create `src/pages/Catalog/ListingForm.tsx`: create/edit form with all fields; photo upload widget (request presigned URL → PUT to R2 → register publicUrl → show thumbnail); photo delete button per thumbnail
- [x] 11.5 Create `src/pages/Catalog/ListingDetail.tsx`: detail view with status switcher (dropdown showing allowed transitions), photos gallery, linked inquiries count
- [x] 11.6 Add `/catalog`, `/catalog/new`, `/catalog/:id` routes to `src/router.tsx`

## 12. Frontend — Catalog Inquiries

- [x] 12.1 Create `src/api/catalog_inquiries.ts`: hooks `useCatalogInquiries`, `useCatalogInquiry`, `useUpdateInquiryStatus`
- [x] 12.2 Create `src/pages/Catalog/InquiriesIndex.tsx`: table with status + type filter; status badge; click row to view detail
- [x] 12.3 Create `src/pages/Catalog/InquiryDetail.tsx`: full inquiry fields; status change dropdown (requires `catalog:inquiries:manage`); link to listing if set
- [x] 12.4 Add `/catalog/inquiries` and `/catalog/inquiries/:id` routes to `src/router.tsx`

## 13. Frontend — Client Notes

- [x] 13.1 Create `src/api/client_notes.ts`: hooks `useClientNotes`, `useCreateNote`, `useUpdateNote`, `useDeleteNote`, `useNoteHistory`
- [x] 13.2 Add "Нотатки" tab to `src/pages/Clients/ClientDetail.tsx`: shows note list (hidden if no `notes:read`); each note shows author, timestamp, "edited" label if `updated_at` is set
- [x] 13.3 Create `src/components/NoteEditor.tsx`: inline textarea for create/edit with save/cancel; shows warning before discarding unsaved changes
- [x] 13.4 Create `src/components/NoteHistoryModal.tsx`: modal listing history entries (before-snapshots, who changed, when); triggered by clicking "edited" label on a note
- [x] 13.5 Implement delete button on note: visible for own notes (with `notes:write`) or any note (with `notes:manage`); confirm before soft delete

## 14. Frontend — Reports

- [x] 14.1 Create `src/api/reports.ts`: hooks `useRevenueReport`, `usePLReport`, `useExpensesByCategoryReport`, `useMechanicsReport`, `usePopularServicesReport`, `useInventoryValueReport`; all accept `{ date_from, date_to }` params
- [x] 14.2 Create `src/components/DateRangePicker.tsx`: two `<input type="date">` inputs with preset buttons (Цей місяць / 3 місяці / Цей рік)
- [x] 14.3 Create `src/pages/Reports/RevenueReport.tsx`: `ComposedChart` (bars per period + cumulative Line); `DateRangePicker` + `group_by` toggle (month/week)
- [x] 14.4 Create `src/pages/Reports/PLReport.tsx`: grouped `BarChart` (revenue + expenses per period); net value displayed as text summary
- [x] 14.5 Create `src/pages/Reports/ExpensesByCategoryReport.tsx`: `PieChart` (donut) with legend; requires `reports:financial`
- [x] 14.6 Create `src/pages/Reports/MechanicsReport.tsx`: horizontal `BarChart` by approved hours per mechanic; requires `reports:operations`
- [x] 14.7 Create `src/pages/Reports/PopularServicesReport.tsx`: horizontal `BarChart` top-20 services; requires `reports:operations`
- [x] 14.8 Create `src/pages/Reports/InventoryValueReport.tsx`: plain table with `grand_total` footer; no chart; requires `reports:operations`
- [x] 14.9 Create `src/pages/Reports/index.tsx`: reports hub page with cards linking to each report; hide cards the current staff lacks permission for
- [x] 14.10 Add `/reports` and sub-routes to `src/router.tsx`

## 15. Navigation & Sidebar

- [x] 15.1 Add "Каталог" nav group to sidebar in `src/components/Layout.tsx`: sub-links "Оголошення" (`/catalog`) and "Заявки" (`/catalog/inquiries`); visible if `catalog:listings:read` or `catalog:inquiries:read`
- [x] 15.2 Add "Звіти" nav link to sidebar pointing to `/reports`; visible if `reports:financial` or `reports:operations`
