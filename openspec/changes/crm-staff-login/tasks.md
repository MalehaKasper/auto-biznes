## 1. Database Migration

- [x] 1.1 Create Alembic migration: `ALTER TABLE crm_staff_users RENAME COLUMN email TO login`
- [x] 1.2 Add column in migration: `is_sysadmin BOOLEAN NOT NULL DEFAULT FALSE`
- [x] 1.3 Run `alembic upgrade head`

## 2. Backend — Config & Model

- [x] 2.1 Update `app/config.py`: replace `FIRST_ADMIN_EMAIL` with `FIRST_ADMIN_LOGIN`; add `SYSADMIN_KEY`
- [x] 2.2 Update `app/models/crm_staff.py`: rename `email → login`, add `is_sysadmin` column
- [x] 2.3 Update `app/schemas/auth.py`: `LoginRequest` — `email → login`, add `key: Optional[str] = None`
- [x] 2.4 Update `app/schemas/staff_users.py`: `StaffUserRead` and `StaffUserCreate` — `email → login`

## 3. Backend — Auth Router

- [x] 3.1 Update `POST /auth/login` query: filter by `login` instead of `email`
- [x] 3.2 Add sysadmin key check: if `is_sysadmin` and no `key` → return `401 sysadmin_key_required`
- [x] 3.3 Add sysadmin key check: if `is_sysadmin` and `key` provided → `secrets.compare_digest` vs `SYSADMIN_KEY`
- [x] 3.4 Update `GET /auth/me` response: return `login` instead of `email`

## 4. Backend — Staff Users Router & Seed

- [x] 4.1 Update `POST /staff-users`: duplicate check on `login` (was `email`)
- [x] 4.2 Update `POST /staff-users`: create user with `login` field
- [x] 4.3 Update `app/seed_admin.py`: use `FIRST_ADMIN_LOGIN`; set `is_sysadmin=True` on created user
- [x] 4.4 Update `.env`: add `FIRST_ADMIN_LOGIN`, `SYSADMIN_KEY`; remove `FIRST_ADMIN_EMAIL`

## 5. Database Reset & Seed

- [x] 5.1 Drop existing mock staff data: `DELETE FROM crm_staff_users; DELETE FROM crm_roles; DELETE FROM crm_role_permissions;`
- [x] 5.2 Run `python -m app.seed_admin` and verify sysadmin created with `is_sysadmin = true`
- [x] 5.3 Restart FastAPI server and verify `POST /auth/login` returns `sysadmin_key_required` without key

## 6. Frontend — Auth Types & Login Form

- [x] 6.1 Update `src/api/auth.ts`: `LoginRequest` — `email → login`, add `key?: string`; `MeResponse` — `email → login`
- [x] 6.2 Update `src/pages/Login.tsx`: replace `email` input (type=email) with `login` input (type=text)
- [x] 6.3 Add two-step key logic to `Login.tsx`: state `needsKey`, detect `sysadmin_key_required` error, show key field conditionally
- [x] 6.4 Update `src/pages/Settings/StaffUsers.tsx`: form field and display — `email → login`
