## Why

Сайт надає послуги СТО та шиномонтажу, але не охоплює третій напрямок бізнесу — купівлю/продаж автомобілів. Каталог закриває цю прогалину: публічна вітрина авто на продаж та запити на викуп без потреби у CRM (Phase 2) на старті.

## What Changes

- Нова сторінка `/catalog` з двома вкладками: **Продаж** (компанія продає авто) та **Викуп** (компанія шукає авто для купівлі)
- Нова сторінка `/catalog/[id]` — деталі лістингу з набором дій для відвідувача
- Нові Prisma-моделі: `CatalogListing` та `CatalogInquiry`
- Новий NestJS модуль `CatalogModule` з публічними ендпоінтами (без auth)
- Підтримка **торгу**: адмін може ввімкнути/вимкнути per-listing; якщо ввімкнено — відвідувач може запропонувати свою ціну через кнопку "Запропонувати ціну"
- Конфігурація **Cloudflare R2** для зберігання фото (upload-UI — Phase 2 CRM, зараз seed-дані з ручними URL)
- Дані каталогу додає **виключно адмін через CRM** (Phase 2); у Phase 1.5 — тільки seed-дані

## Capabilities

### New Capabilities

- `catalog-listings`: Перегляд лістингів каталогу (SALE / WANTED), фільтрація, пагінація, деталі з фото
- `catalog-inquiries`: Подача заявок до лістингів (BUY, EXCHANGE, QUESTION, CALLBACK, EVALUATE); торг через `offeredPrice` на BUY-заявках

### Modified Capabilities

- `vehicle-management`: Додається опціональний зв'язок `CatalogListing.vehicleId → Vehicle` (для відстеження провенансу авто, що вже є в системі)

## Impact

- **DB**: Нові моделі `CatalogListing`, `CatalogInquiry`; нова міграція Prisma
- **API** (`apps/api`): Новий `CatalogModule` — `GET /catalog`, `GET /catalog/:id`, `POST /catalog/inquiries`; без JwtAuthGuard (публічні ендпоінти)
- **Site** (`apps/site`): Нові сторінки `/catalog`, `/catalog/[id]`; нові методи в `lib/api.ts`
- **packages/types**: Нові Zod-схеми для `CatalogInquiry` payload
- **packages/db**: Нові моделі в schema.prisma + seed-дані
- **Env**: Нові змінні `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`
- **Deps**: `@aws-sdk/client-s3` (для майбутнього upload в Phase 2, конфігурується зараз)
