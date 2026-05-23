import Link from "next/link";

export const metadata = {
  title: "Шиномонтаж — AutoService",
  description: "Сезонне перевзування, балансування, зберігання та ремонт шин",
};

const SERVICES = [
  { name: "Сезонне перевзування (без балансування)", price: "від 400 грн", duration: "30–45 хв" },
  { name: "Сезонне перевзування + балансування", price: "від 700 грн", duration: "45–60 хв" },
  { name: "Балансування коліс (4 шт.)", price: "від 300 грн", duration: "20–30 хв" },
  { name: "Ремонт проколу (джгут)", price: "від 100 грн", duration: "15–20 хв" },
  { name: "Ремонт проколу (латка)", price: "від 150 грн", duration: "20–30 хв" },
  { name: "Зберігання шин (сезон)", price: "від 600 грн", duration: "—" },
  { name: "Накачування азотом (4 шт.)", price: "від 150 грн", duration: "15 хв" },
  { name: "Заміна вентиля", price: "від 50 грн / шт.", duration: "5 хв" },
];

const STORAGE_INFO = [
  "Безпечне зберігання у закритому приміщенні",
  "Шини промаркуються — не переплутаємо",
  "Можна залишити до наступного сезону",
  "Повідомимо нагадування про перевзування",
];

const FAQ = [
  {
    q: "Коли варто міняти шини?",
    a: "Рекомендуємо: зимові — при стійких температурах нижче +5°C (жовтень–листопад), літні — при підвищенні вище +5°C (березень–квітень).",
  },
  {
    q: "Чи обов'язково балансування?",
    a: "Так, після кожного перевзування. Дисбаланс прискорює знос шин та підшипників, а також погіршує керованість.",
  },
  {
    q: "Чи можна приїхати без запису?",
    a: "Можна, але запис пріоритетний. У пік сезону (жовтень–листопад, березень–квітень) без запису можливе очікування 1–2 год.",
  },
  {
    q: "Що таке зберігання шин і як це працює?",
    a: "Ми зберігаємо ваш комплект шин у закритому приміщенні цілий сезон. Восени — привозите літні, отримуєте зимові. Навесні — навпаки.",
  },
];

export default function TirePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Шиномонтаж</h1>
        <p className="text-slate-500 text-lg">Сезонне перевзування, балансування та зберігання шин. Швидко і без черг.</p>
      </div>

      {/* Services */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Послуги та ціни</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800">{s.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-slate-400">
                  <span>{s.price}</span>
                  {s.duration !== "—" && <span>{s.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">* Ціни вказані без урахування вартості запчастин (вентилів, латок тощо).</p>
      </section>

      {/* Storage info */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold mb-3">Послуга зберігання шин</h2>
        <ul className="space-y-2">
          {STORAGE_INFO.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="text-blue-500 font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div>
          <p className="font-semibold text-slate-800">Записатись на шиномонтаж</p>
          <p className="text-sm text-slate-500">Онлайн-запис займає 1 хвилину. Без реєстрації.</p>
        </div>
        <Link
          href="/book?serviceType=TIRE"
          className="shrink-0 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
        >
          Записатись
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
