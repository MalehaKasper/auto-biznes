## Context

Phase 1 побудувала монорепо (Turborepo), NestJS API, Next.js сайт, Prisma з моделями Vehicle/Booking/Garage/Auth. Зараз сайт має лише операційні сутності (запис на сервіс, гараж клієнта). Каталог — окремий домен: публічна вітрина авто на продаж/викуп. Адмін-частина (додавання лістингів, управління заявками) — Phase 2 CRM. Phase 1.5 будує тільки публічну сторону.

## Goals / Non-Goals

**Goals:**
- Нові Prisma-моделі `CatalogListing` та `CatalogInquiry` + міграція
- Публічний API: `GET /catalog`, `GET /catalog/:id`, `POST /catalog/inquiries`
- Сторінки `/catalog` та `/catalog/[id]` на Next.js сайті
- Конфігурація Cloudflare R2 (env + пакет) без upload UI
- Seed-дані з реалістичним контентом (3–5 SALE, 2–3 WANTED)

**Non-Goals:**
- Адмін UI для керування лістингами (→ Phase 2 CRM)
- Upload фото через API (→ Phase 2 CRM, presigned URL endpoint)
- Автентифікація для перегляду каталогу (каталог публічний)
- SMS/email нотифікація адміна при новій заявці (→ Phase 2 CRM)
- Пошук за повнотекстовим індексом / Elasticsearch

## Decisions

### D1: Окрема модель CatalogListing, не перевикористання Vehicle

**Рішення:** Нова таблиця `CatalogListing` зі своїми полями. Опціональний `vehicleId FK` для провенансу.

**Чому:** Каталогові авто мають маркетинговий контекст (фото[], опис, ціна, bargainEnabled, status), відмінний від операційного Vehicle (nullable plate/vin для сервісного запису). Змішування ускладнило б обидві моделі. `vehicleId?` зберігає зв'язок без злиття.

**Альтернатива:** Додати `catalogStatus` до Vehicle — відхилено, бо не всі каталогові авто проходять через сервіс.

---

### D2: `bargainEnabled` — прапор на лістингу, не окремий тип заявки

**Рішення:** `CatalogListing.bargainEnabled: Boolean @default(true)`. Торг — це `CatalogInquiry { type: BUY, offeredPrice: X }`. Кнопка "Запропонувати ціну" рендериться тільки якщо `bargainEnabled = true`.

**Чому:** З точки зору CRM, BUY-заявка з `offeredPrice` і без — різна обробка, але це деталь поля, не окремий workflow. Єдиний тип спрощує enum і API.

---

### D3: WANTED — окремий тип лістингу, не просто форма

**Рішення:** `CatalogListing.type: SALE | WANTED`. На WANTED-вкладці відображаються реальні лістинги того, що компанія шукає. Плюс — загальна форма EVALUATE без прив'язки до лістингу.

**Чому:** "Ми шукаємо Toyota Camry 2019–2022, бюджет 700к" — це конкретний запит з параметрами (`yearMax`, `mileageMax`, `price` = max budget). Відвідувач з відповідним авто відповідає на конкретний запит → `CatalogInquiry { listingId: <wanted_id>, type: EVALUATE }`. Це дає CRM структурований лід замість аморфної форми.

---

### D4: Cloudflare R2 для зберігання фото

**Рішення:** `photos: String[]` в `CatalogListing` — масив публічних R2 URL. Конфігурація через env (`R2_*`). Пакет `@aws-sdk/client-s3` додається зараз (R2 — S3-сумісний). Upload — Phase 2.

**Чому:** R2 немає egress-плати, S3-сумісний API, generous free tier. Presigned URL дозволяє браузеру завантажувати прямо в бакет без проксі через API — критично для CRM-адміна з мобільного. В Phase 1.5 URLs вставляються в seed вручну.

**Альтернатива:** Суто локальний upload через Multer → відхилено, не масштабується і ламає деплой.

---

### D5: Публічні ендпоінти без auth

**Рішення:** Жодного JwtAuthGuard на `CatalogController`. `POST /catalog/inquiries` — анонімний (phone + name у payload).

**Чому:** Каталог — верхня частина воронки. Вимога логіну перед поданням заявки = втрата лідів. Телефон у заявці достатній для CRM.

---

### D6: Пагінація через cursor, не offset

**Рішення:** `GET /catalog?type=sale&cursor=<id>&limit=12` — cursor-based пагінація.

**Чому:** Listing-сторінка потенційно динамічна (адмін додає/видаляє лістинги). Offset-пагінація дає дублювання/пропуски при зміні даних між сторінками. Cursor стабільний.

## Risks / Trade-offs

- **Seed-only дані в Phase 1.5** → каталог виглядає "мертвим" без CRM. Mitigation: реалістичні seed-дані з фото, цінами, описами.
- **photos[] як рядки** → ніякої валідації що URL дійсно вказує на R2. Mitigation: CRM-форма валідує URL при додаванні.
- **yearMax / mileageMax тільки для WANTED** → можна зловживати і заповнити для SALE. Mitigation: API ігнорує ці поля якщо type=SALE при створенні через CRM.
- **Без нотифікацій** → нові заявки CRM побачить тільки при відкритті. Mitigation: додати SMS-нотифікацію адміна в Phase 2 (BullMQ вже є).

## Migration Plan

1. Додати моделі до `packages/db/prisma/schema.prisma`
2. `pnpm --filter @auto/db db:migrate` — генерує та застосовує міграцію
3. Запустити оновлений seed (`pnpm --filter @auto/db db:seed`)
4. Запустити API і перевірити ендпоінти curl-ом
5. Rollback: `DROP TABLE catalog_inquiries, catalog_listings` — дані тестові, втрата не критична
