## ADDED Requirements

### Requirement: Turborepo монорепо з двома додатками та shared-пакетами
Система SHALL бути організована як Turborepo монорепо з такою структурою: `apps/site` (Next.js), `apps/api` (NestJS), `packages/types` (shared TypeScript типи та Zod-схеми), `packages/db` (Prisma schema та client).

#### Scenario: Shared типи доступні в обох додатках
- **WHEN** розробник імпортує тип з `@auto/types` в `apps/site` або `apps/api`
- **THEN** TypeScript резолвить тип без помилок, без дублювання коду

#### Scenario: Паралельний запуск dev-серверів
- **WHEN** виконується команда `turbo dev` в кореневій директорії
- **THEN** запускаються одночасно Next.js dev-сервер (port 3000) та NestJS dev-сервер (port 4000)

### Requirement: Docker Compose для локальної інфраструктури
Монорепо SHALL містити `docker-compose.yml` в корені, який запускає PostgreSQL та Redis для локальної розробки.

#### Scenario: Запуск інфраструктури
- **WHEN** виконується `docker compose up -d`
- **THEN** PostgreSQL доступний на port 5432, Redis на port 6379, дані персистуються між перезапусками

#### Scenario: Prisma міграції після запуску БД
- **WHEN** виконується `turbo db:migrate` після `docker compose up -d`
- **THEN** всі Prisma міграції застосовуються успішно, схема БД актуальна

### Requirement: Єдина точка конфігурації змінних середовища
Кожен додаток SHALL мати свій `.env.example` файл. Спільні змінні (DATABASE_URL, REDIS_URL) визначаються в корені.

#### Scenario: Розробник клонує репо
- **WHEN** розробник копіює `.env.example` → `.env` і запускає `docker compose up -d`
- **THEN** проєкт запускається без додаткової конфігурації
