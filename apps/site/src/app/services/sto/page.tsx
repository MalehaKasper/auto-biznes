import Link from "next/link";

export const metadata = {
  title: "СТО — Автобізнесмени",
  description: "Технічне обслуговування та ремонт автомобілів",
};

const SERVICES = [
  { name: "Заміна масла та фільтрів", price: "від 400 грн", duration: "30–60 хв" },
  { name: "Діагностика двигуна", price: "від 300 грн", duration: "30–45 хв" },
  { name: "Ремонт ходової частини", price: "від 800 грн", duration: "1–3 год" },
  { name: "Гальмівна система", price: "від 600 грн", duration: "1–2 год" },
  { name: "Комп'ютерна діагностика", price: "від 250 грн", duration: "20–30 хв" },
  { name: "Ремонт двигуна", price: "від 2 000 грн", duration: "від 1 дня" },
  { name: "Заміна свічок запалювання", price: "від 200 грн", duration: "20–40 хв" },
  { name: "Ремонт електрики", price: "від 500 грн", duration: "від 1 год" },
];

const FAQ = [
  {
    q: "Чи потрібно попередньо записуватись?",
    a: "Рекомендуємо. Запис гарантує, що майстер вільний у вибраний вами час. Запишіться онлайн — безкоштовно і без реєстрації.",
  },
  {
    q: "Скільки часу займе обслуговування?",
    a: "Залежить від роботи. Заміна масла — 30–60 хвилин, діагностика — 30–45 хвилин. Складніший ремонт обговорюється індивідуально.",
  },
  {
    q: "Які гарантії на роботи?",
    a: "На всі виконані роботи надаємо гарантію 30 днів або до 2 000 км пробігу (що настане раніше).",
  },
  {
    q: "Чи можна залишити авто на день?",
    a: "Так. Приймаємо авто на весь день, якщо обсяг робіт великий. Повідомимо SMS, коли буде готово.",
  },
];

export default function StoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-heading text-3xl text-zinc-100 mb-2">СТО — технічне обслуговування</h1>
        <p className="text-zinc-400 text-lg font-body normal-case">Якісний ремонт та обслуговування будь-яких авто. Без черг — за попереднім записом.</p>
      </div>

      <section className="mb-12">
        <h2 className="font-heading text-xl text-zinc-100 mb-4">Послуги та ціни</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="border border-zinc-800 bg-zinc-900 p-4 flex items-start gap-3">
              <span className="text-accent font-heading mt-0.5">✓</span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-zinc-100 text-sm">{s.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-zinc-500 font-body normal-case">
                  <span>{s.price}</span>
                  <span>{s.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-3 font-body normal-case">* Остаточна ціна визначається після огляду. Вартість запчастин — окремо.</p>
      </section>

      <div className="border border-zinc-800 bg-zinc-900 p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div>
          <p className="font-heading text-zinc-100">Готові записатись?</p>
          <p className="text-sm text-zinc-400 font-body normal-case">Онлайн-запис займає 1 хвилину. Без реєстрації.</p>
        </div>
        <Link
          href="/book?serviceType=STO"
          className="shrink-0 bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent-hover transition-colors"
        >
          Записатись на СТО
        </Link>
      </div>

      <section>
        <h2 className="font-heading text-xl text-zinc-100 mb-4">Часті питання</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <div key={item.q} className="border border-zinc-800 bg-zinc-900 p-4">
              <p className="font-heading text-zinc-100 text-sm mb-1">{item.q}</p>
              <p className="text-sm text-zinc-400 font-body normal-case">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
