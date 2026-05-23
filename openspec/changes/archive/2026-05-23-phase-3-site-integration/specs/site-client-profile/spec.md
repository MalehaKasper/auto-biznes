## ADDED Requirements

### Requirement: Client profile page
The site SHALL provide a profile page at `/profile` for authenticated users to view and edit their personal information and see all their bookings.

#### Scenario: View profile
- **WHEN** an authenticated user navigates to `/profile`
- **THEN** the page displays: phone number (read-only), name, email (editable), and a list of all bookings with their statuses ordered by `createdAt` descending

#### Scenario: Update profile name or email
- **WHEN** the user updates their name or email and saves
- **THEN** the system calls `PATCH /auth/profile` and the updated values are reflected immediately

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user navigates to `/profile`
- **THEN** the system redirects to `/login?redirect=/profile`

#### Scenario: Profile link in header navigation
- **WHEN** a user is authenticated
- **THEN** the header navigation shows a "Профіль" link pointing to `/profile`
