## 1. Монорепо та інфраструктура

- [x] 1.1 Ініціалізувати Turborepo монорепо (`npx create-turbo@latest`)
- [x] 1.2 Налаштувати `apps/site` (Next.js 15 App Router + TypeScript)
- [x] 1.3 Налаштувати `apps/api` (NestJS + TypeScript)
- [x] 1.4 Створити `packages/types` з базовими shared TS типами та Zod-схемами
- [x] 1.5 Створити `packages/db` з Prisma schema та конфігурацією client
- [x] 1.6 Налаштувати `turbo.json` pipeline (build, dev, lint, db:migrate)
- [x] 1.7 Створити `docker-compose.yml` з PostgreSQL та Redis
- [x] 1.8 Створити `.env.example` для кореня, `apps/site`, `apps/api`
- [ ] 1.9 Перевірити `turbo dev` — одночасний запуск site (3000) та api (4000)

## 2. Схема бази даних (Prisma)

- [x] 2.1 Описати модель `User` (id, phone, name, email, status, password_hash, timestamps)
- [x] 2.2 Описати модель `Vehicle` (id, plate, vin, make, model, year, color, timestamps)
- [x] 2.3 Описати модель `UserVehicle` (userId, vehicleId, is_hidden, owned_since, owned_until)
- [x] 2.4 Описати модель `Booking` (id, userId, vehicleId, serviceType, status, scheduledAt, notes, timestamps)
- [x] 2.5 Описати модель `ServiceRecord` (id, vehicleId, bookingId, ownerUserId, ownerType, serviceType, description, mileage, cost, performedAt, timestamps)
- [x] 2.6 Описати модель `OtpCode` (id, phone, code, expiresAt, usedAt)
- [ ] 2.7 Написати та застосувати першу міграцію (`prisma migrate dev`)
- [x] 2.8 Заповнити seed-файл тестовими даними для розробки

## 3. NestJS API — User Identity та Auth

- [x] 3.1 Створити `AuthModule` з `AuthController` та `AuthService`
- [x] 3.2 Реалізувати `POST /auth/otp/request` — генерація OTP, cooldown 60s, додавання в BullMQ-чергу
- [x] 3.3 Реалізувати `POST /auth/otp/verify` — перевірка коду, видача JWT access + httpOnly refresh token
- [x] 3.4 Реалізувати `POST /auth/refresh` — ротація refresh token
- [x] 3.5 Реалізувати `POST /auth/logout` — інвалідація refresh token
- [x] 3.6 Реалізувати upsert логіку User (Shadow якщо новий, пошук якщо є)
- [x] 3.7 Реалізувати `PATCH /auth/profile` — доповнення профілю (ім'я, email), конвертація SHADOW → REGISTERED
- [x] 3.8 Налаштувати JwtAuthGuard та декоратор `@CurrentUser()`

## 4. NestJS API — SMS Queue

- [x] 4.1 Підключити BullMQ (`@nestjs/bullmq`) та налаштувати Redis connection
- [x] 4.2 Створити `SmsModule` з BullMQ producer (`SmsQueue`)
- [x] 4.3 Реалізувати BullMQ worker (`SmsProcessor`) з retry (3 спроби, exponential backoff)
- [x] 4.4 Інтегрувати SMS-шлюз (Turbosms або SMS-Fly) через HTTP-клієнт
- [x] 4.5 Реалізувати шаблони повідомлень: OTP та booking-підтвердження
- [x] 4.6 Fail-fast при відсутності `SMS_API_KEY` в env

## 5. NestJS API — Booking Flow

- [x] 5.1 Створити `BookingsModule` з `BookingsController` та `BookingsService`
- [x] 5.2 Реалізувати `POST /bookings` — створення booking з upsert User та Vehicle
- [x] 5.3 Реалізувати `GET /bookings/slots` — доступні часові слоти
- [x] 5.4 Реалізувати `GET /bookings/:id/status` — публічна перевірка статусу (без auth)
- [x] 5.5 Додати Zod-валідацію вхідних даних через `@auto/types`
- [x] 5.6 Після створення booking ставити SMS-підтвердження в чергу

## 6. NestJS API — Garage

- [x] 6.1 Створити `GarageModule` з `GarageController` та `GarageService`
- [x] 6.2 Реалізувати `GET /garage/vehicles` — список активних авто поточного користувача
- [x] 6.3 Реалізувати `GET /garage/vehicles/:id` — деталі авто + сервісна книга
- [x] 6.4 Реалізувати `POST /vehicles` — ручне додавання авто до Гаражу
- [x] 6.5 Реалізувати `PATCH /garage/vehicles/:id` — оновлення даних авто
- [x] 6.6 Реалізувати `PATCH /garage/vehicles/:id/hide` — приховання авто (is_hidden = true)
- [x] 6.7 Реалізувати `GET /garage/vehicles?archived=true` — список прихованих авто
- [x] 6.8 Захист усіх garage endpoints через JwtAuthGuard

## 7. Next.js Сайт — UI компоненти та сторінки

- [x] 7.1 Налаштувати Tailwind CSS та базову систему дизайну (шрифти, кольори, spacing)
- [x] 7.2 Створити компонент `Header` з навігацією та посиланням на Гараж
- [x] 7.3 Розробити головну сторінку `/` (лендінг): hero, перелік послуг, заклик до дії
- [x] 7.4 Розробити сторінки послуг `/services/sto` та `/services/tire`
- [ ] 7.5 Розробити сторінку форми запису `/book` з валідацією (react-hook-form + Zod)
- [ ] 7.6 Розробити сторінку входу `/login` (введення телефону → OTP → Гараж)
- [ ] 7.7 Розробити сторінку Гаражу `/garage` — список авто (server component + suspense)
- [ ] 7.8 Розробити сторінку деталей авто `/garage/[vehicleId]` — дані + сервісна книга
- [ ] 7.9 Реалізувати форму доповнення профілю (перший вхід shadow-користувача)
- [x] 7.10 Реалізувати middleware для захисту `/garage/*` маршрутів (redirect → /login)

## 8. Next.js — Auth Integration

- [x] 8.1 Реалізувати API client (`packages/types` або `apps/site/lib/api.ts`) для запитів до NestJS
- [x] 8.2 Реалізувати зберігання access token (memory) та refresh token (httpOnly cookie)
- [x] 8.3 Реалізувати автоматичний refresh при 401 відповіді від API
- [ ] 8.4 Перевірити повний флоу: гостьовий запис → SMS → вхід через OTP → Гараж

## 9. Фінальна перевірка та документація

- [ ] 9.1 Перевірити golden path: гість → форма запису → SMS → OTP вхід → Гараж з авто
- [ ] 9.2 Перевірити edge case: повторний запис того самого телефону
- [ ] 9.3 Перевірити edge case: порожній Гараж (нові акаунти)
- [ ] 9.4 Оновити `obsidian/00_index.md` — Фаза 1 в статусі `🟢 В розробці`
- [ ] 9.5 Зафіксувати початковий commit монорепо
