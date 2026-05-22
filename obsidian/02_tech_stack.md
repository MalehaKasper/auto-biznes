# Технічний Стек

> Статус: `🟢 ЗАТВЕРДЖЕНО` — ADR-001 (2026-05-22)

## Кандидати для обговорення

### Сайт (Фасад)
| Рівень | Варіант A | Варіант B |
|--------|-----------|-----------|
| Frontend | Next.js (React/TS) | Nuxt.js (Vue/TS) |
| Backend API | NestJS (Node/TS) | FastAPI (Python) |
| БД | PostgreSQL | PostgreSQL |
| Кеш/Черги | Redis | Redis |
| ORM | Prisma / Drizzle | SQLAlchemy |

### CRM
| Рівень | Варіанти |
|--------|----------|
| Frontend | Next.js Admin / Refine.dev |
| Backend | Той самий API або окремий сервіс |

### QA/Security Bot
| Інструмент | Призначення |
|------------|-------------|
| Playwright | E2E / браузерні тести |
| k6 | Навантажувальне тестування |
| OWASP ZAP / nuclei | Security сканування |

---

## Зафіксований стек

| Шар | Технологія |
|-----|-----------|
| Монорепо | Turborepo + `@auto/types` (shared) |
| Сайт (Фасад) | Next.js 15 (App Router) + TypeScript |
| CRM | Refine.dev + Next.js + TypeScript |
| Backend API | NestJS + TypeScript |
| ORM | Prisma |
| База даних | PostgreSQL |
| Черги / Кеш | Redis + BullMQ |
| Auth | Кастомний Phone OTP (NestJS) |
| SMS-шлюз | Turbosms / SMS-Fly (UA) |
| QA Bot (Фаза 5) | Playwright + k6 + nuclei |
| Деплой | Окремий сервер (налаштовуємо пізніше) |
