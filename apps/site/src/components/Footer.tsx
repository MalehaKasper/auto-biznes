import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="font-heading text-zinc-300 mb-2">Контакти</p>
            <p className="text-sm text-zinc-500 font-body normal-case">
              <a href="tel:+380991234567" className="hover:text-zinc-300 transition-colors">
                +38 (099) 123-45-67
              </a>
            </p>
          </div>

          <div>
            <p className="font-heading text-zinc-300 mb-2">Адреса</p>
            <p className="text-sm text-zinc-500 font-body normal-case">
              вул. Автосервісна, 1<br />
              Київ, Україна
            </p>
          </div>

          <div>
            <p className="font-heading text-zinc-300 mb-2">Графік роботи</p>
            <p className="text-sm text-zinc-500 font-body normal-case">
              Пн–Сб: 08:00–18:00<br />
              Нд: вихідний
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <div className="flex gap-4 text-xs text-zinc-600">
            <Link href="/services/sto" className="hover:text-zinc-400 transition-colors uppercase tracking-wide font-heading">СТО</Link>
            <Link href="/services/tire" className="hover:text-zinc-400 transition-colors uppercase tracking-wide font-heading">Шиномонтаж</Link>
            <Link href="/catalog" className="hover:text-zinc-400 transition-colors uppercase tracking-wide font-heading">Каталог</Link>
            <Link href="/book" className="hover:text-zinc-400 transition-colors uppercase tracking-wide font-heading">Записатись</Link>
          </div>
          <p className="text-xs text-zinc-700 font-body normal-case">© {new Date().getFullYear()} Автобізнесмені</p>
        </div>
      </div>
    </footer>
  );
}
