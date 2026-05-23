import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="font-semibold text-slate-800 mb-2">Контакти</p>
            <p className="text-sm text-slate-500">
              <a href="tel:+380991234567" className="hover:text-slate-700 transition-colors">
                +38 (099) 123-45-67
              </a>
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-800 mb-2">Адреса</p>
            <p className="text-sm text-slate-500">
              вул. Автосервісна, 1<br />
              Київ, Україна
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-800 mb-2">Графік роботи</p>
            <p className="text-sm text-slate-500">
              Пн–Сб: 08:00–18:00<br />
              Нд: вихідний
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="/services/sto" className="hover:text-slate-700 transition-colors">СТО</Link>
            <Link href="/services/tire" className="hover:text-slate-700 transition-colors">Шиномонтаж</Link>
            <Link href="/catalog" className="hover:text-slate-700 transition-colors">Каталог</Link>
            <Link href="/book" className="hover:text-slate-700 transition-colors">Записатись</Link>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} AutoService</p>
        </div>
      </div>
    </footer>
  );
}
