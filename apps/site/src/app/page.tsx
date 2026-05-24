import Link from "next/link";
import { CatalogSlider } from "../components/CatalogSlider";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="noise relative min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{
          background: "linear-gradient(160deg, #09090b 0%, #18181b 50%, #1c1917 100%)",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-accent text-xs font-heading tracking-[0.3em] uppercase mb-4">
            Автобізнесмени
          </p>
          <h1 className="text-5xl md:text-7xl font-heading text-zinc-100 mb-6 leading-none">
            Твоя тачка<br />
            <span className="text-accent">в надійних</span><br />
            руках
          </h1>
          <p className="text-zinc-400 text-base md:text-lg mb-12 max-w-xl mx-auto normal-case tracking-normal font-body">
            Запис на сервіс без реєстрації. Вся сервісна книга у вашому Гаражі.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book?service=sto"
              className="group relative border-2 border-accent bg-accent text-zinc-950 font-heading text-sm uppercase tracking-widest px-8 py-4 hover:bg-transparent hover:text-accent transition-all duration-200"
            >
              Заїхати на СТО
            </Link>
            <Link
              href="/book?service=tire"
              className="border-2 border-zinc-600 text-zinc-300 font-heading text-sm uppercase tracking-widest px-8 py-4 hover:border-accent hover:text-accent transition-all duration-200"
            >
              Шиномонтаж
            </Link>
            <Link
              href="/catalog"
              className="border-2 border-zinc-600 text-zinc-300 font-heading text-sm uppercase tracking-widest px-8 py-4 hover:border-accent-alt hover:text-accent-alt transition-all duration-200"
            >
              Купити / Продати авто
            </Link>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #09090b)" }}
        />
      </section>

      {/* Catalog Slider */}
      <CatalogSlider />

      {/* Garage section */}
      <section className="py-20 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-zinc-100 mb-4">
            Особистий Гараж
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto normal-case tracking-normal font-body">
            Всі ваші авто та сервісна книга — в одному місці. Доступно після входу за номером телефону.
          </p>
          <Link
            href="/garage"
            className="inline-block border-2 border-zinc-600 text-zinc-300 font-heading text-sm uppercase tracking-widest px-8 py-4 hover:border-accent hover:text-accent transition-all duration-200"
          >
            Відкрити Гараж
          </Link>
        </div>
      </section>
    </>
  );
}
