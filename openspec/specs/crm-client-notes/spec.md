### Requirement: Create client note
Staff with `notes:write` SHALL be able to attach a note to a client profile, optionally linked to a specific work order.

#### Scenario: Create note on client profile
- **WHEN** a staff user with `notes:write` calls `POST /clients/{id}/notes` with `{ content }` (content non-empty)
- **THEN** a `crm_client_notes` row is created with `client_profile_id`, `created_by = current staff`, `created_at = now()`, `deleted_at = null`

#### Scenario: Create note linked to work order
- **WHEN** a staff user with `notes:write` calls `POST /clients/{id}/notes` with `{ content, work_order_id }`
- **THEN** the note is created with `work_order_id` set; the work order must belong to this client profile

#### Scenario: Work order belongs to different client
- **WHEN** a staff user creates a note with a `work_order_id` that is linked to a different client profile
- **THEN** the system returns `422 Unprocessable Entity`

#### Scenario: Empty content rejected
- **WHEN** a staff user submits a note with blank or empty `content`
- **THEN** the system returns `422 Unprocessable Entity`

### Requirement: Edit client note with history
Staff with `notes:write` SHALL be able to edit their own notes. Staff with `notes:manage` SHALL be able to edit any note. Every edit SHALL produce an immutable history entry recording the previous content.

#### Scenario: Edit own note
- **WHEN** a staff user with `notes:write` calls `PATCH /clients/{client_id}/notes/{note_id}` with `{ content }` on a note they created
- **THEN** the current note content is saved to `crm_client_note_history` (with `changed_by`, `changed_at`), and `crm_client_notes.content` is updated along with `updated_by` and `updated_at`

#### Scenario: Edit another staff member's note without manage permission
- **WHEN** a staff user with `notes:write` (but not `notes:manage`) attempts to patch a note created by a different staff member
- **THEN** the system returns `403 Forbidden`

#### Scenario: Edit any note with manage permission
- **WHEN** a staff user with `notes:manage` patches any note regardless of original author
- **THEN** the note is updated and a history entry is recorded

#### Scenario: View note history
- **WHEN** a staff user with `notes:read` calls `GET /clients/{client_id}/notes/{note_id}/history`
- **THEN** the system returns all `crm_client_note_history` rows for this note, ordered by `changed_at` descending, each showing `content` (before snapshot), `changed_by`, and `changed_at`

### Requirement: Soft delete client note
Staff with `notes:write` SHALL be able to delete their own notes. Staff with `notes:manage` SHALL be able to delete any note. Deleted notes SHALL be preserved with their history.

#### Scenario: Soft delete own note
- **WHEN** a staff user with `notes:write` calls `DELETE /clients/{client_id}/notes/{note_id}` on their own note
- **THEN** `crm_client_notes.deleted_at` is set to the current timestamp; the note no longer appears in the standard list

#### Scenario: Deleted notes hidden from standard list
- **WHEN** a staff user calls `GET /clients/{id}/notes`
- **THEN** only notes with `deleted_at IS NULL` are returned

#### Scenario: View deleted notes with manage permission
- **WHEN** a staff user with `notes:manage` calls `GET /clients/{id}/notes?include_deleted=true`
- **THEN** all notes including soft-deleted are returned, with `deleted_at` populated for deleted entries

#### Scenario: Delete note without permission
- **WHEN** a staff user with `notes:write` attempts to delete a note created by another staff member
- **THEN** the system returns `403 Forbidden`

### Requirement: List client notes
Staff with `notes:read` SHALL be able to retrieve all active notes for a client profile.

#### Scenario: List notes for client
- **WHEN** a staff user with `notes:read` calls `GET /clients/{id}/notes`
- **THEN** the system returns all non-deleted notes for this client ordered by `created_at` descending, including `created_by` name, `updated_by` name (if edited), and `work_order_id` (if set)
