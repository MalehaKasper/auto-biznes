## 1. База даних (Prisma)

- [x] 1.1 Додати модель `CatalogListing` до `packages/db/prisma/schema.prisma` (id, type, make, model, year, yearMax?, mileage?, mileageMax?, price?, bargainEnabled, description, photos String[], status, vehicleId?, timestamps)
- [x] 1.2 Додати модель `CatalogInquiry` до schema.prisma (id, listingId?, type, phone, name, message?, offeredPrice?, tradeVehicleMake?, tradeVehicleModel?, tradeVehicleYear?, tradeVehicleMileage?, tradeVehiclePlate?, status, createdAt)
- [x] 1.3 Додати enum `CatalogListingType` (SALE, WANTED) та `CatalogListingStatus` (AVAILABLE, RESERVED, SOLD, CLOSED) та `CatalogInquiryType` (BUY, EXCHANGE, QUESTION, CALLBACK, EVALUATE) та `CatalogInquiryStatus` (NEW, IN_PROGRESS, CLOSED)
- [x] 1.4 Написати та застосувати міграцію (`pnpm --filter @auto/db db:migrate`)
- [x] 1.5 Оновити seed-файл: додати 4 SALE лістинги (з photos[], цінами, bargainEnabled mix) та 2 WANTED лістинги (з yearMax, mileageMax, price)

## 2. Shared Types (packages/types)

- [x] 2.1 Додати Zod-схему `createCatalogInquirySchema` з умовною валідацією: EXCHANGE/EVALUATE вимагають `tradeVehicleMake` + `tradeVehicleModel`, QUESTION вимагає `message`
- [x] 2.2 Додати `getCatalogSchema` (query params: type?, cursor?, limit?) та відповідні TypeScript типи

## 3. NestJS API — CatalogModule

- [x] 3.1 Створити `CatalogModule` з `CatalogController` та `CatalogService` в `apps/api/src/catalog/`
- [x] 3.2 Реалізувати `GET /catalog` — список лістингів з фільтром `type` (sale|wanted) та cursor-based пагінацією (limit 12)
- [x] 3.3 Реалізувати `GET /catalog/:id` — деталі лістингу; повертає 404 якщо не знайдено
- [x] 3.4 Реалізувати `POST /catalog/inquiries` — створення заявки з Zod-валідацією через `@auto/types`; бізнес-валідація: BUY не можна на WANTED лістинг; EXCHANGE/EVALUATE вимагають дані авто; QUESTION вимагає message
- [x] 3.5 Зареєструвати `CatalogModule` в `AppModule`

## 4. Cloudflare R2 — конфігурація

- [x] 4.1 Додати `@aws-sdk/client-s3` до `apps/api/package.json`
- [x] 4.2 Додати змінні `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL` до `apps/api/.env.example` та кореневого `.env.example`
- [x] 4.3 Створити `apps/api/src/storage/storage.module.ts` з `StorageService` що ініціалізує S3Client (endpoint: R2); не fail-fast якщо R2 не налаштований (Phase 1.5 не завантажує файли)

## 5. Next.js Сайт — Каталог

- [x] 5.1 Додати методи `api.catalog.list(params)` та `api.catalog.getById(id)` та `api.catalog.createInquiry(data)` до `apps/site/src/lib/api.ts`
- [x] 5.2 Розробити сторінку `/catalog` — дві вкладки "Продаж" / "Викуп", картки лістингів з фото (перше фото), ціною, make/model/year, кнопка "Детальніше"
- [x] 5.3 Реалізувати cursor-based "Завантажити ще" на сторінці каталогу
- [x] 5.4 Розробити сторінку `/catalog/[id]` — галерея фото, повні деталі авто, панель дій
- [x] 5.5 Реалізувати панель дій на `/catalog/[id]` для SALE: кнопки "Купити", "Запропонувати ціну" (якщо bargainEnabled), "Обмін", "Питання", "Передзвоніть"
- [x] 5.6 Реалізувати панель дій на `/catalog/[id]` для WANTED: кнопки "Є таке авто", "Передзвоніть"
- [x] 5.7 Реалізувати форми заявок (модальні або inline): BUY (phone, name, offeredPrice?), EXCHANGE (phone, name, tradeVehicle fields), EVALUATE (phone, name, tradeVehicle fields), QUESTION (phone, name, message), CALLBACK (phone, name)
- [x] 5.8 Додати посилання "Каталог" до `Header` компонента
- [x] 5.9 Відобразити стан SOLD/CLOSED на сторінці деталей (мітка + деактивовані кнопки)

## 6. Фінальна перевірка

- [x] 6.1 Перевірити `GET /catalog?type=sale` — повертає seed SALE лістинги
- [x] 6.2 Перевірити `GET /catalog?type=wanted` — повертає seed WANTED лістинги
- [x] 6.3 Перевірити `GET /catalog/:id` — повертає деталі; 404 для неіснуючого id
- [x] 6.4 Перевірити `POST /catalog/inquiries` з кожним типом (BUY, BUY+offeredPrice, EXCHANGE, EVALUATE, EVALUATE+listingId, QUESTION, CALLBACK)
- [x] 6.5 Перевірити валідацію: EXCHANGE без tradeVehicleMake → 400; BUY на WANTED лістинг → 422; QUESTION без message → 400
- [x] 6.6 Перевірити сайт: `/catalog` рендериться з вкладками, картки лістингів відображаються
- [x] 6.7 Перевірити сайт: `/catalog/[id]` відображає деталі, bargainEnabled=false ховає кнопку торгу
- [x] 6.8 Перевірити сайт: форма заявки відправляється успішно, показує success-стан
