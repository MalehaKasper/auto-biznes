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

### Сайт (Turborepo монорепо)
| Шар | Технологія |
|-----|-----------|
| Монорепо | Turborepo + `@auto/types` (shared) |
| Frontend | Next.js 15 (App Router) + TypeScript |
| Backend API | NestJS + TypeScript |
| ORM | Prisma |
| Міграції | Prisma Migrate (тільки site-таблиці, без `crm_` префіксу) |
| Сховище фото | Cloudflare R2 (S3-сумісний) |
| Черги / Кеш | Redis + BullMQ |
| Auth (сайт) | Кастомний Phone OTP (NestJS) |
| SMS-шлюз | Turbosms / SMS-Fly (UA) |

### CRM (окремий проєкт `~/Documents/auto-crm/`)
| Шар | Технологія |
|-----|-----------|
| Backend | FastAPI (Python) + SQLAlchemy |
| Міграції | Alembic (тільки `crm_*` таблиці) |
| Frontend | Vite + React + TypeScript |
| Стан / Запити | TanStack Query |
| Auth (CRM) | Email + Password (JWT, акаунти створює адмін) |

### Спільна інфраструктура
| Шар | Технологія |
|-----|-----------|
| База даних | PostgreSQL (спільна для сайту і CRM) |
| QA Bot (Фаза 5) | Playwright + k6 + nuclei |
| Деплой | Окремий сервер (налаштовуємо пізніше) |
