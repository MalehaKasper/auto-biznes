## ADDED Requirements

### Requirement: CRM client profile
The system SHALL maintain `crm_client_profiles` for clients served in the CRM. A profile MAY be linked to a site `users` record via `user_id`. Profile includes: name, phone, email (optional), notes, and `user_id` (nullable).

#### Scenario: Create client profile
- **WHEN** a staff user with `clients:write` posts to `POST /clients` with name and phone
- **THEN** a `crm_client_profiles` record is created

#### Scenario: Search clients
- **WHEN** a staff user with `clients:read` queries `GET /clients?q=Іван`
- **THEN** the system returns profiles matching name or phone (partial match)

#### Scenario: View client service history
- **WHEN** a staff user with `clients:read` fetches `GET /clients/{id}/work-orders`
- **THEN** the system returns all work orders linked to this client profile

### Requirement: Shadow User auto-creation
When a `crm_client_profile` with a phone number is saved and no linked `user_id` exists, the system SHALL look up the site `users` table by phone. If found, the profile SHALL be linked to that user. If not found, a new site `users` record SHALL be created with `account_type = 'SHADOW'` and the profile linked to it.

#### Scenario: Phone matches existing site user
- **WHEN** a CRM client is saved with a phone that exists in `users.phone`
- **THEN** `crm_client_profiles.user_id` is set to the matching user's id; no new user is created

#### Scenario: Phone has no site user — Shadow User created
- **WHEN** a CRM client is saved with a phone that does not exist in `users.phone`
- **THEN** a new `users` record is inserted with `phone`, `account_type = 'SHADOW'`, and `crm_client_profiles.user_id` is set to it

#### Scenario: Client saved without phone
- **WHEN** a CRM client profile is created without a phone number
- **THEN** no Shadow User lookup or creation occurs; `user_id` remains null

### Requirement: Client profile update
Staff with `clients:write` SHALL be able to update client profile fields (name, phone, email, notes). Updating the phone SHALL trigger the Shadow User lookup/creation logic again if `user_id` is currently null.

#### Scenario: Update phone on unlinked profile
- **WHEN** a staff user patches a client profile phone and `user_id` is null
- **THEN** Shadow User logic runs with the new phone number
