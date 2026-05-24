import Link from "next/link";

export const metadata = {
  title: "Шиномонтаж — Автобізнесмени",
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
      <div className="mb-10">
        <h1 className="font-heading text-3xl text-zinc-100 mb-2">Шиномонтаж</h1>
        <p className="text-zinc-400 text-lg font-body normal-case">Сезонне перевзування, балансування та зберігання шин. Швидко і без черг.</p>
      </div>

      <section className="mb-10">
        <h2 className="font-heading text-xl text-zinc-100 mb-4">Послуги та ціни</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="border border-zinc-800 bg-zinc-900 p-4 flex items-start gap-3">
              <span className="text-accent font-heading mt-0.5">✓</span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-zinc-100 text-sm">{s.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-zinc-500 font-body normal-case">
                  <span>{s.price}</span>
                  {s.duration !== "—" && <span>{s.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-3 font-body normal-case">* Ціни вказані без урахування вартості запчастин (вентилів, латок тощо).</p>
      </section>

      <section className="border border-zinc-800 bg-zinc-900 p-6 mb-10">
        <h2 className="font-heading text-lg text-zinc-100 mb-3">Послуга зберігання шин</h2>
        <ul className="space-y-2">
          {STORAGE_INFO.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-zinc-300 font-body normal-case">
              <span className="text-accent font-heading">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="border border-zinc-800 bg-zinc-900 p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div>
          <p className="font-heading text-zinc-100">Записатись на шиномонтаж</p>
          <p className="text-sm text-zinc-400 font-body normal-case">Онлайн-запис займає 1 хвилину. Без реєстрації.</p>
        </div>
        <Link
          href="/book?serviceType=TIRE"
          className="shrink-0 bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent-hover transition-colors"
        >
          Записатись
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
