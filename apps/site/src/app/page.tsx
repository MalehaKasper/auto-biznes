import Link from "next/link";

const services = [
  {
    href: "/services/sto",
    title: "СТО",
    description: "Технічне обслуговування, ремонт двигуна, ходової, гальм та електрики",
    icon: "🔧",
  },
  {
    href: "/services/tire",
    title: "Шиномонтаж",
    description: "Сезонне перевзування, балансування, ремонт та зберігання шин",
    icon: "🛞",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Ваш автомобіль в надійних руках
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Запис на СТО та шиномонтаж без реєстрації. Вся сервісна книга зберігається у вашому Гаражі.
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-3 rounded-xl text-lg hover:bg-blue-50 transition-colors"
          >
            Записатись онлайн
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-slate-800">
          Наші послуги
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="border border-slate-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Особистий Гараж
          </h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            Всі ваші авто та їх сервісна книга — в одному місці. Доступно після входу за номером телефону.
          </p>
          <Link
            href="/garage"
            className="inline-block border-2 border-blue-700 text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 hover:text-white transition-colors"
          >
            Відкрити Гараж
          </Link>
        </div>
      </section>
    </>
  );
}
