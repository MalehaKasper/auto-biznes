## ADDED Requirements

### Requirement: Phone auth modal available globally
The site SHALL provide a phone-auth modal that any component can open via a shared context. The modal SHALL render above all page content and allow a visitor to enter their phone number to initiate shadow account lookup or creation.

#### Scenario: Modal opens from Header profile icon (guest)
- **WHEN** a guest clicks the profile icon in the Header
- **THEN** the phone auth modal opens without page navigation

#### Scenario: Modal opens from hero garage CTA
- **WHEN** a guest interacts with a "Мій Гараж" / garage-related trigger
- **THEN** the phone auth modal opens

#### Scenario: Modal closes on success
- **WHEN** the user submits a valid phone number and the API responds successfully
- **THEN** the modal closes and the page state updates (phone stored in context/localStorage)

#### Scenario: Already authenticated — modal does not open
- **WHEN** a user who has already authenticated (phone in context) clicks the profile icon
- **THEN** the modal does NOT open; instead the user is navigated to `/garage`

### Requirement: Phone number submission triggers shadow account lookup
When the phone modal is submitted, the site SHALL call the identity endpoint to look up or create a shadow account. On success the phone number and any returned token SHALL be stored in client context for use by the booking widget.

#### Scenario: New phone number
- **WHEN** a user submits a phone number that has no existing account
- **THEN** a shadow account is created, the response token is stored in context, modal closes

#### Scenario: Existing shadow account
- **WHEN** a user submits a phone number that matches an existing shadow account
- **THEN** the existing account is returned, token stored in context, modal closes

#### Scenario: Invalid phone format
- **WHEN** a user submits a phone number that fails validation
- **THEN** the modal shows an inline error "Невірний формат номеру" and remains open
