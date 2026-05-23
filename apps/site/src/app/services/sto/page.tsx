import Link from "next/link";

export const metadata = {
  title: "СТО — AutoService",
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
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">СТО — технічне обслуговування</h1>
        <p className="text-slate-500 text-lg">Якісний ремонт та обслуговування будь-яких авто. Без черг — за попереднім записом.</p>
      </div>

      {/* Services with prices */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Послуги та ціни</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800">{s.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-slate-400">
                  <span>{s.price}</span>
                  <span>{s.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">* Остаточна ціна визначається після огляду. Вартість запчастин — окремо.</p>
      </section>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div>
          <p className="font-semibold text-slate-800">Готові записатись?</p>
          <p className="text-sm text-slate-500">Онлайн-запис займає 1 хвилину. Без реєстрації.</p>
        </div>
        <Link
          href="/book?serviceType=STO"
          className="shrink-0 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
        >
          Записатись на СТО
        </Link>
      </div>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Часті питання</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="border border-slate-200 rounded-xl p-4">
              <p className="font-medium text-slate-800 mb-1">{item.q}</p>
              <p className="text-sm text-slate-500">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
