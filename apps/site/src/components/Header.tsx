"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/api";

export function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!getAccessToken());
    // Re-check on storage events (login/logout in another tab)
    const handler = () => setIsAuth(!!getAccessToken());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-700 tracking-tight">
          AutoService
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/services/sto" className="hover:text-blue-700 transition-colors">
            СТО
          </Link>
          <Link href="/services/tire" className="hover:text-blue-700 transition-colors">
            Шиномонтаж
          </Link>
          <Link href="/catalog" className="hover:text-blue-700 transition-colors">
            Каталог
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            Записатись
          </Link>
          <Link
            href="/garage"
            className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-blue-700 hover:text-blue-700 transition-colors"
          >
            Гараж
          </Link>
          {isAuth && (
            <Link
              href="/profile"
              className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-blue-700 hover:text-blue-700 transition-colors"
            >
              Профіль
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
