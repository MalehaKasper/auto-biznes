import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { PhoneAuthModalProvider } from "../context/PhoneAuthModal";
import { PhoneAuthModal } from "../components/PhoneAuthModal";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Автобізнесмени — СТО та Шиномонтаж",
  description: "Запис на СТО, шиномонтаж та каталог авто. Швидко, зручно, без реєстрації.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`h-full ${oswald.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        <PhoneAuthModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PhoneAuthModal />
        </PhoneAuthModalProvider>
      </body>
    </html>
  );
}
