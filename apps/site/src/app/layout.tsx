import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "AutoService — СТО та Шиномонтаж",
  description: "Запис на СТО, шиномонтаж та каталог авто. Швидко, зручно, без реєстрації.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
