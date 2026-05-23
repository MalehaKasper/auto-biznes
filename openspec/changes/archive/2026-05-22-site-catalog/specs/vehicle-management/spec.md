## ADDED Requirements

### Requirement: CatalogListing може посилатися на існуючий Vehicle (провенанс)
`CatalogListing` SHALL мати опціональне поле `vehicleId` (FK до `Vehicle`), яке дозволяє пов'язати каталоговий лістинг з авто, що вже існує в операційній системі (наприклад, авто прийняте від клієнта через сервіс).

#### Scenario: Лістинг без провенансу
- **WHEN** адмін створює новий CatalogListing не вказуючи vehicleId
- **THEN** система створює лістинг з `vehicleId = null`; лістинг функціонує незалежно від операційних Vehicle

#### Scenario: Лістинг з провенансом
- **WHEN** адмін створює CatalogListing з `vehicleId = <existing_vehicle_id>`
- **THEN** `CatalogListing.vehicleId` вказує на конкретний `Vehicle`; в майбутньому CRM може показати сервісну книгу цього авто прямо в каталоговому лістингу
