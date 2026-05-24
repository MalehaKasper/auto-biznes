"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { usePhoneAuth } from "../context/PhoneAuthModal";

const NAV_LINKS = [
  { href: "/", label: "Головна", exact: true },
  { href: "/services/sto", label: "СТО", exact: false },
  { href: "/services/tire", label: "Шиномонтаж", exact: false },
  { href: "/catalog", label: "Каталог", exact: false },
];

export function Header() {
  const { phone, openPhoneModal } = usePhoneAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleProfileClick = () => {
    if (phone) {
      router.push("/garage");
    } else {
      openPhoneModal();
    }
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-xl text-accent tracking-widest uppercase"
        >
          Автобізнесмени
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`uppercase tracking-wide text-xs transition-colors ${
                isActive(href, exact)
                  ? "text-accent"
                  : "text-zinc-400 hover:text-accent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="bg-accent text-zinc-950 px-4 py-2 text-xs font-heading uppercase tracking-wider hover:bg-accent-hover transition-colors"
          >
            Записатись
          </Link>
          <button
            onClick={handleProfileClick}
            className="border border-zinc-700 text-zinc-300 px-4 py-2 text-xs font-heading uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            {phone ? "🚗 Мій гараж" : "Увійти"}
          </button>
        </div>
      </div>
    </header>
  );
}
