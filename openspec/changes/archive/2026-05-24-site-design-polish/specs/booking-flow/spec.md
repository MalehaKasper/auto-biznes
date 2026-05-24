## ADDED Requirements

### Requirement: BookingWidget step transitions are animated
The BookingWidget SHALL animate step transitions using `framer-motion` `AnimatePresence`. Advancing to the next step SHALL slide the current step out to the left and slide the new step in from the right. Going back SHALL reverse direction. Each transition SHALL complete in 250ms with `easeInOut` easing. No step content SHALL be visible mid-transition from both the exiting and entering step simultaneously in a jarring way.

#### Scenario: Advancing to next step animates forward
- **WHEN** the user completes Step 1 and moves to Step 2
- **THEN** Step 1 slides out to the left while Step 2 slides in from the right over 250ms

#### Scenario: Going back animates in reverse
- **WHEN** the user presses back from Step 3 to Step 2
- **THEN** Step 3 slides out to the right while Step 2 slides in from the left over 250ms

### Requirement: Зберігання шин is a bookable service type
The BookingWidget Step 3 (service selection) SHALL include "Зберігання шин" as a fourth selectable option with ID `TIRE_STORAGE`. When selected, the booking SHALL be submitted with `serviceType: "TIRE_STORAGE"`.

#### Scenario: Tire storage appears in service list
- **WHEN** the user reaches Step 3 of the BookingWidget
- **THEN** four service options are displayed: СТО, Шиномонтаж, Зберігання шин, Інше

#### Scenario: Tire storage booking is submitted correctly
- **WHEN** the user selects "Зберігання шин" and completes Step 4
- **THEN** the booking is created with `serviceType: "TIRE_STORAGE"`
