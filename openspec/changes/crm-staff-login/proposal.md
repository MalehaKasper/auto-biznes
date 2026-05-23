## Why

CRM staff accounts are internal, admin-created employee accounts — they have no reason to carry email addresses as identifiers. The current email-based login is borrowed from the site's public auth model and doesn't fit the back-office context. Additionally, the sysadmin account (which can create and deactivate all other staff accounts) needs a second security factor to prevent privilege escalation by anyone who obtains the sysadmin password alone.

## What Changes

- Rename `crm_staff_users.email → login` (free-format username, no email validation, unique)
- Add `crm_staff_users.is_sysadmin BOOLEAN DEFAULT FALSE`
- `POST /auth/login` now accepts `{ login, password }` instead of `{ email, password }`
- If the authenticated user has `is_sysadmin = true` and no `key` was provided, the server returns `HTTP 401 { detail: "sysadmin_key_required" }` instead of issuing tokens
- If `is_sysadmin = true` and `key` is provided, it must match `SYSADMIN_KEY` env var; mismatch returns `HTTP 401`
- Regular staff `key` field is ignored server-side
- Frontend login form: two-step UX — key field appears only after receiving `sysadmin_key_required` error, not upfront
- `GET /auth/me` returns `login` instead of `email`
- `POST /staff-users` accepts `login` instead of `email`
- Seed script uses `FIRST_ADMIN_LOGIN` + `FIRST_ADMIN_PASSWORD` env vars; created user has `is_sysadmin = true`
- Config gains `SYSADMIN_KEY` and `FIRST_ADMIN_LOGIN`; removes `FIRST_ADMIN_EMAIL`

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `crm-staff-auth`: authentication identifier changes from email to login; sysadmin two-factor key requirement added; admin bootstrap env vars updated

## Impact

- **Backend**: Alembic migration (rename column + add column); `crm_staff.py` model; `schemas/auth.py`; `schemas/staff_users.py`; `routers/auth.py`; `routers/staff_users.py`; `config.py`; `seed_admin.py`
- **Frontend**: `api/auth.ts` (types); `pages/Login.tsx` (two-step key field); `pages/Settings/StaffUsers.tsx` (login field instead of email)
- **Database**: `crm_staff_users` schema change — non-breaking for existing rows (column rename + nullable-with-default add)
- **Environment**: `.env` — add `SYSADMIN_KEY`, `FIRST_ADMIN_LOGIN`; remove `FIRST_ADMIN_EMAIL`
