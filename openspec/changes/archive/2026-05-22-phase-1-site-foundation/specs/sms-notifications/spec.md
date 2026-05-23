## ADDED Requirements

### Requirement: BullMQ-черга для всіх SMS відправок
Система SHALL відправляти всі SMS виключно через BullMQ-чергу `sms`. Жодна SMS не відправляється синхронно в рамках HTTP-запиту.

#### Scenario: SMS-задача додається в чергу
- **WHEN** будь-який сервіс викликає `SmsQueue.add({ phone, message })`
- **THEN** задача з'являється в Redis-черзі `sms` і повертається негайно, не очікуючи результату відправки

#### Scenario: Успішна обробка задачі воркером
- **WHEN** BullMQ worker отримує SMS-задачу з черги
- **THEN** worker викликає SMS-шлюз API, при успіху задача помічається як `completed`

#### Scenario: Невдала відправка з retry
- **WHEN** SMS-шлюз повертає помилку (5xx або timeout)
- **THEN** BullMQ повторює задачу до 3 разів з exponential backoff (30s → 60s → 120s), після 3 невдач задача переходить в `failed` і логується

### Requirement: Обов'язкові типи SMS-повідомлень
Система SHALL підтримувати такі типи SMS: OTP-код для входу, підтвердження booking.

#### Scenario: OTP SMS
- **WHEN** користувач запитує OTP
- **THEN** в чергу додається задача з повідомленням у форматі: "Ваш код: [CODE]. Дійсний 5 хвилин. Auto Service."

#### Scenario: Підтвердження booking
- **WHEN** booking успішно створено
- **THEN** в чергу додається задача з повідомленням: "Ваш запис #[ID] прийнято. [ServiceType], [Date]. Auto Service."

### Requirement: Конфігурація SMS-шлюзу через змінні середовища
Система SHALL читати API-ключ та sender name SMS-шлюзу виключно з environment variables. Жодні credentials не хардкодяться.

#### Scenario: Відсутня конфігурація SMS-шлюзу
- **WHEN** `SMS_API_KEY` не встановлено і сервіс намагається запустити SMS-воркер
- **THEN** застосунок кидає помилку при старті з повідомленням про відсутню змінну середовища (fail-fast)
