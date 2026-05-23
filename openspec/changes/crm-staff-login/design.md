## Context

CRM staff authentication currently uses `email + password` with a single-factor flow. Staff accounts are internal-only (no self-registration), so carrying an email address as the login identifier is unnecessary friction. The sysadmin account — which has unrestricted access to create, deactivate, and manage all other CRM accounts — has no additional protection beyond its password.

The change renames the `email` column to `login`, adds an `is_sysadmin` flag, and introduces a pre-shared key second factor that the sysadmin must provide at login time.

## Goals / Non-Goals

**Goals:**
- Replace email identifier with a free-format login string in `crm_staff_users`
- Add `is_sysadmin` boolean to designate the privileged bootstrap account
- Require sysadmin to provide a server-side env key as a second factor
- Surface the key field in the frontend only when the server explicitly requests it (two-step UX)

**Non-Goals:**
- TOTP/OTP or any time-based second factor
- Multiple sysadmin accounts (one sysadmin, identified by `is_sysadmin = true`)
- Changes to RBAC, role permissions, or JWT structure

## Decisions

### D1: Login identifier — `login` string, not email

**Decision:** Replace `email VARCHAR(255)` with `login VARCHAR(100)` (unique, no format validation beyond non-empty and uniqueness).

**Rationale:** Staff accounts are created by the sysadmin with arbitrary usernames (e.g., `mechanic_vasyl`, `manager_oksana`). Forcing email format on internal accounts adds no security value and confuses the UX. Login strings are simpler to communicate verbally.

**Alternative considered:** Keep `email` column but stop validating format. Rejected — a column named `email` carrying non-email values is misleading for future developers and for the seed script.

---

### D2: Sysadmin second factor — server-side env key, not TOTP

**Decision:** `SYSADMIN_KEY` stored in `.env`; compared with the `key` field in the login request using a constant-time comparison.

**Rationale:** For a single-operator local CRM, a static pre-shared key in `.env` provides meaningful protection (the attacker needs both the password and file-system access) without the setup complexity of TOTP or hardware tokens.

**Alternative considered:** TOTP (Google Authenticator). Rejected for Phase 4 scope — adds dependency on `pyotp`, QR code enrollment flow, and clock-sync requirements. Can be added later as a `crm-staff-auth` enhancement.

---

### D3: Two-step UX — key field appears on demand, not upfront

**Decision:** Frontend does not show a key field on initial page load. After submitting `{ login, password }`, if the server returns `HTTP 401 { detail: "sysadmin_key_required" }`, the form reveals a key field and the user resubmits.

**Rationale:** Showing a "Sysadmin key" field to every staff member on every login reveals that a sysadmin account exists and that it uses a key. The two-step approach leaks no information until correct credentials are entered.

**Alternative considered:** Always show an optional key field with a placeholder hint. Simpler to implement, but discloses the sysadmin protection mechanism to all users.

---

### D4: `is_sysadmin` in DB, not derived from role name

**Decision:** Explicit `is_sysadmin BOOLEAN` column rather than checking `role.name == "Admin"` or a special permission string.

**Rationale:** The sysadmin key check is a login-time concern, not a permission check. Tying it to role name creates a fragile implicit contract (admin renames their role → key check breaks). A dedicated column is unambiguous.

---

### D5: Alembic migration — rename column, do not recreate table

**Decision:** `ALTER TABLE crm_staff_users RENAME COLUMN email TO login` + `ADD COLUMN is_sysadmin BOOLEAN NOT NULL DEFAULT FALSE`.

**Rationale:** Renaming preserves all FK-unrelated indexes and constraints. No other table has a FK to `crm_staff_users.email`, so the rename is safe.

## Risks / Trade-offs

- **`SYSADMIN_KEY` in plaintext `.env`** → anyone with filesystem read access can impersonate sysadmin. Mitigation: `.env` is never committed to git; on production use environment injection (Railway secrets, etc.)
- **One sysadmin only** → if `is_sysadmin` is lost (DB wipe + bad seed), access recovery requires re-seeding. Mitigation: document re-seed procedure; seed script is idempotent when no staff users exist.
- **Two HTTP round-trips for sysadmin login** → negligible for an internal tool used by one person occasionally.

## Migration Plan

1. Run `alembic upgrade head` — applies rename + add column
2. Update `.env`: add `FIRST_ADMIN_LOGIN`, `SYSADMIN_KEY`; remove `FIRST_ADMIN_EMAIL`
3. Drop existing staff users (mock data — no value to preserve): `DELETE FROM crm_staff_users; DELETE FROM crm_roles; DELETE FROM crm_role_permissions;`
4. Run `python -m app.seed_admin` — creates sysadmin with `is_sysadmin = true`
5. Restart FastAPI server

**Rollback:** `alembic downgrade -1` reverts column rename + drops `is_sysadmin`. No data loss since mock data.
