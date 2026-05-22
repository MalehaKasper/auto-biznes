## Why

Проєкт Auto Lifecycle Ecosystem стартує з нуля. Щоб почати розробку сайту (Фасаду), потрібно закласти технічний фундамент: монорепо, схему бази даних та мінімальну продуктову логіку (гостьовий запис на сервіс + особистий кабінет "Гараж").

## What Changes

- Ініціалізація Turborepo монорепо з трьома пакетами: `apps/site`, `apps/api`, `packages/types`
- Розгортання Next.js 15 (App Router) для сайту-фасаду
- Розгортання NestJS як основного Backend API
- Визначення схеми PostgreSQL (Prisma) для Фази 1
- Реалізація гостьового флоу: форма запису → тіньовий акаунт → vehicle → booking
- Реалізація OTP-аутентифікації через телефон (SMS-шлюз)
- Реалізація особистого кабінету "Гараж" (список авто + сервісна книга)
- Базовий UI сайту: лендінг, сторінки послуг, форма запису

## Capabilities

### New Capabilities

- `monorepo-setup`: Turborepo-монорепо зі shared-types пакетом і двома додатками (site, api)
- `user-identity`: Тіньовий акаунт на основі телефону, OTP-верифікація, конвертація shadow → registered
- `vehicle-management`: Сутність Vehicle з lazy-заповненням полів (адмін підв'язує деталі пізніше)
- `booking-flow`: Гостьовий запис на послугу (СТО / Шиномонтаж) без обов'язкової реєстрації
- `garage`: Особистий кабінет клієнта — список автомобілів та їх сервісна історія
- `sms-notifications`: Черга BullMQ + SMS-шлюз для OTP та підтверджень бронювань

### Modified Capabilities

*(немає — старт проєкту)*

## Impact

- **Нові залежності:** Next.js 15, NestJS, Prisma, PostgreSQL, Redis, BullMQ, Turborepo
- **Нові API endpoints:** `/auth/*`, `/bookings/*`, `/vehicles/*`, `/garage/*`
- **Нові сторінки:** `/` (лендінг), `/services`, `/book`, `/garage`, `/garage/[vehicleId]`
- **Інфраструктура:** PostgreSQL + Redis (локально через Docker Compose для розробки)
- **Зовнішні сервіси:** SMS-шлюз (Turbosms або SMS-Fly)
