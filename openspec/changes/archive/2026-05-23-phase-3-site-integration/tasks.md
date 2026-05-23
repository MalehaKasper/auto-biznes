## Підфаза 3.1 — Критичні баги та базовий UX сайту

> Незалежна від CRM. Тільки Next.js + NestJS. Реалізується першою.

## 1. Booking — Time Slot UI

- [x] 1.1 Add date picker to `/book` page: renders a `<input type="date">` that triggers fetch to `GET /bookings/slots?serviceType={type}&date={date}`
- [x] 1.2 Display available time slots as clickable buttons (e.g., "09:00", "09:30"); highlight selected slot
- [x] 1.3 Disable submit button until a slot is selected; show "На цю дату вільних місць нема" if slots array is empty
- [x] 1.4 Update booking form submission to include `scheduledAt` from selected slot
- [x] 1.5 Handle `?serviceType=STO` and `?serviceType=TIRE` query params to pre-select service type on page load
- [x] 1.6 Handle `?vehicleId={id}` query param: fetch vehicle from `GET /garage/vehicles/{id}` and pre-fill plate/make/model/year fields

## 2. Booking Status Tracking Page

- [x] 2.1 Create `apps/site/src/app/book/[id]/page.tsx`: public page (no auth required)
- [x] 2.2 Fetch `GET /bookings/{id}/status` on mount; display: service type, scheduled time, vehicle plate, status badge
- [x] 2.3 Map status values to Ukrainian labels and colors: PENDING=yellow, CONFIRMED=blue, IN_PROGRESS=orange, COMPLETED=green, CANCELLED=red
- [x] 2.4 Show "Запис не знайдено" with link to `/book` if API returns 404
- [x] 2.5 Update `SmsQueue.sendBookingConfirmation` in NestJS to include `{SITE_URL}/book/{bookingId}` in SMS text

## 3. Garage — Add Vehicle Page

- [x] 3.1 Create `apps/site/src/app/garage/add/page.tsx` with form: plate (required), make, model, year, color, vin
- [x] 3.2 On submit call `POST /garage/vehicles`; redirect to `/garage` on success
- [x] 3.3 Add client-side validation: plate required, VIN exactly 17 chars if provided, year 1900–2100
- [x] 3.4 Protect route: unauthenticated users redirected to `/login?redirect=/garage/add`

## 4. Garage — Book from Vehicle Detail

- [x] 4.1 Add "Записати на сервіс" button to `apps/site/src/app/garage/[vehicleId]/page.tsx`; link to `/book?vehicleId={id}`
- [x] 4.2 Implement vehicle pre-fill in `/book` page from vehicleId param (task 1.6 dependency)

## 5. Service Pages & Footer

- [x] 5.1 Rewrite `apps/site/src/app/services/sto/page.tsx`: add services list with price ranges, duration estimates, FAQ section, "Записатись" CTA button
- [x] 5.2 Rewrite `apps/site/src/app/services/tire/page.tsx`: seasonal tire change pricing, storage service, balancing, FAQ section, "Записатись" CTA button
- [x] 5.3 Create `apps/site/src/components/Footer.tsx`: phone, address, working hours (Mon–Sat 08:00–18:00), links to STO/Tire pages
- [x] 5.4 Add `<Footer />` to `apps/site/src/app/layout.tsx`

---

## Підфаза 3.2 — Інтеграція: Booking → CRM

> Вимагає нові NestJS internal endpoints та Alembic міграцію в CRM.

## 6. NestJS — Internal Booking Status Endpoint

- [x] 6.1 Add `PATCH /internal/bookings/:id/status` to `InternalStorageController` (or new `InternalBookingsController`): accepts `{ status, notes? }` with `X-Internal-Key` guard
- [x] 6.2 Update `BookingsService`: add `updateStatus(id, status, notes?)` method that writes to DB and enqueues appropriate SMS
- [x] 6.3 Add SMS templates `booking_confirmed` and `booking_cancelled` to `SmsService`/`SmsQueue`
- [x] 6.4 Return `404` if booking not found, `400` if status transition is invalid

## 7. NestJS — Internal SMS Endpoint

- [x] 7.1 Add `POST /internal/sms` endpoint: accepts `{ phone, template, params }` with `X-Internal-Key` guard
- [x] 7.2 Map template names to SMS text generators in `SmsService`; return `400` for unknown template
- [x] 7.3 Enqueue via `SmsQueue` and return `202 Accepted`

## 8. CRM — SiteBase Models for Bookings

- [x] 8.1 Add `SiteBooking` and `SiteVehicle` SQLAlchemy models to `app/models/site_readonly.py` (read-only, `SiteBase`)
- [x] 8.2 Add `SiteBooking` fields: id, userId, vehicleId, serviceType, status, scheduledAt, notes, createdAt; FK relation to `SiteVehicle`

## 9. CRM — Incoming Bookings Page (Backend)

- [x] 9.1 Create `app/routers/incoming_bookings.py`: `GET /incoming-bookings` with optional `?status=` filter; queries `SiteBooking` JOIN `SiteVehicle`; requires `workorders:create`
- [x] 9.2 Add `PATCH /incoming-bookings/{id}/confirm` and `PATCH /incoming-bookings/{id}/cancel`: call NestJS `PATCH /internal/bookings/{id}/status` via `httpx` with retry logic (3 attempts, exponential backoff)
- [x] 9.3 Add `POST /incoming-bookings/{id}/convert`: creates `crm_client_profile` (Shadow User logic), creates `crm_work_order` with `source_booking_id`; return 409 if already converted
- [x] 9.4 Add `source_booking_id VARCHAR(36) NULL` column to `crm_work_orders` via Alembic migration
- [x] 9.5 Register router in `main.py`

## 10. CRM — Incoming Bookings Frontend

- [x] 10.1 Create `src/api/incoming_bookings.ts`: hooks `useIncomingBookings`, `useConfirmBooking`, `useCancelBooking`, `useConvertToWorkOrder`
- [x] 10.2 Create `src/pages/IncomingBookings/index.tsx`: table with columns phone/name/serviceType/scheduledAt/vehiclePlate/status; status filter tabs
- [x] 10.3 Add "Підтвердити" / "Скасувати" action buttons per row; confirm dialog before cancel
- [x] 10.4 Add "Створити наряд" button for CONFIRMED bookings; show "Переглянути наряд" link if already converted
- [x] 10.5 Add "Вхідні заявки" nav link to CRM sidebar under "Сервіс" section; visible if `workorders:create`
- [x] 10.6 Add route `/incoming-bookings` to CRM `src/router.tsx`

---

## Підфаза 3.3 — Інтеграція: WorkOrder → Гараж

> Вимагає завершення Підфази 3.2.

## 11. NestJS — Internal Service Records Endpoint

- [x] 11.1 Add `POST /internal/service-records` to NestJS with `X-Internal-Key` guard: accepts `{ vehicleId, bookingId?, serviceType, description, mileage?, cost?, performedAt }`
- [x] 11.2 Validate `vehicleId` exists in `vehicles` table; return `422` if not found
- [x] 11.3 Create `ServiceRecord` via Prisma; link to `bookingId` if provided
- [x] 11.4 Return `201 Created` with the new service record id

## 12. CRM — WorkOrder Completion Writeback

- [x] 12.1 In `app/routers/work_orders.py`: when status changes to `COMPLETED` and `source_booking_id` is set, fetch `SiteBooking.vehicleId`
- [x] 12.2 Call `POST /internal/service-records` via `httpx` with work order summary; log error on failure
- [x] 12.3 On failure: complete the status change, return `200` with `{ warning: "service_record_write_failed" }` in response body
- [x] 12.4 Display dismissible warning banner in CRM WorkOrder detail UI when `warning` field is present in response

---

## Підфаза 3.4 — Каталог та Профіль Клієнта

> Незалежна від 3.2/3.3. Може виконуватись паралельно або після.

## 13. NestJS — Catalog Filters API

- [x] 13.1 Update `CatalogService.list()` to accept filter params: `make?`, `priceMin?`, `priceMax?`, `yearMin?`, `yearMax?`
- [x] 13.2 Apply filters in Prisma WHERE clause; ensure they compose with existing `type` and `status` filters
- [x] 13.3 Encode active filters as URL query params so catalog URLs are shareable

## 14. Site — Catalog Filters UI

- [x] 14.1 Add filter panel to `apps/site/src/app/catalog/page.tsx`: make text input, price range (min/max), year range (min/max)
- [x] 14.2 Sync filter state to URL query params (use `useSearchParams` + `router.push`)
- [x] 14.3 Initialize filter state from URL params on page load (shareable URLs)
- [x] 14.4 Add "Скинути фільтри" button that clears all filter state and URL params
- [x] 14.5 Re-fetch listings on filter change (debounced 300ms for text inputs)

## 15. NestJS — Client Profile Endpoint

- [x] 15.1 Add `GET /auth/profile` endpoint (JWT required): returns `{ phone, name, email, bookings[] }`; bookings ordered by `createdAt DESC`
- [x] 15.2 Add `PATCH /auth/profile` endpoint: accepts `{ name?, email? }`; validates email format; returns updated profile

## 16. Site — Client Profile Page

- [x] 16.1 Create `apps/site/src/app/profile/page.tsx`: requires auth (redirect to `/login?redirect=/profile` if not)
- [x] 16.2 Display: phone (read-only), editable name and email fields, save button
- [x] 16.3 Display bookings list: service type, scheduled date, status badge, link to `/book/{id}`
- [x] 16.4 Add "Профіль" link to `Header.tsx` — visible when authenticated, hidden when not
