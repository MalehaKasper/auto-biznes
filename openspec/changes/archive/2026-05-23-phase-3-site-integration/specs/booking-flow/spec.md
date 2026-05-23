## MODIFIED Requirements

### Requirement: SMS-підтвердження після успішного запису
Після створення booking система SHALL відправити SMS-підтвердження клієнту через BullMQ-чергу. SMS SHALL містити посилання на сторінку відстеження статусу.

#### Scenario: SMS підтвердження відправлено
- **WHEN** booking успішно створено
- **THEN** в BullMQ-чергу `sms` додається задача з текстом підтвердження (дата, тип послуги, номер запису) та URL `{SITE_URL}/book/{bookingId}`

#### Scenario: SMS-шлюз недоступний
- **WHEN** SMS-шлюз повертає помилку при спробі відправки
- **THEN** BullMQ повторює спробу до 3 разів з exponential backoff (30s, 60s, 120s), booking залишається в статусі `PENDING`
