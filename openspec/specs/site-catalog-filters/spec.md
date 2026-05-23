## ADDED Requirements

### Requirement: Catalog server-side filtering
The catalog listing endpoint SHALL accept filter query parameters and the site catalog page SHALL expose filter UI controls.

#### Scenario: Filter by make
- **WHEN** a user selects a make (e.g., "Toyota") in the catalog filter panel
- **THEN** the system returns only listings matching that make (case-insensitive)

#### Scenario: Filter by price range
- **WHEN** a user enters a min and/or max price in the filter panel
- **THEN** the system returns only listings with `price` within the specified range

#### Scenario: Filter by year range
- **WHEN** a user selects a min and/or max year
- **THEN** the system returns only listings where `year` (or `yearMax` for WANTED) falls within the range

#### Scenario: Multiple filters combined
- **WHEN** a user applies make + price + year filters simultaneously
- **THEN** all filters are applied with AND logic

#### Scenario: Clear all filters
- **WHEN** a user clicks "Скинути фільтри"
- **THEN** all filter values are cleared and the full unfiltered listing list is shown

#### Scenario: Filters persist in URL
- **WHEN** a user applies filters and shares the URL
- **THEN** the recipient sees the same filtered results (filters are encoded as query params)
