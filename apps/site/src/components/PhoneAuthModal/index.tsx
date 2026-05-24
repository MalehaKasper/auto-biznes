"use client";

import { useState } from "react";
import { usePhoneAuth } from "../../context/PhoneAuthModal";
import { api } from "../../lib/api";

function validatePhone(phone: string): boolean {
  return /^\+380\d{9}$/.test(phone);
}

export function PhoneAuthModal() {
  const { isOpen, closePhoneModal, setAuth } = usePhoneAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Невірний формат номеру. Введіть у форматі +380XXXXXXXXX");
      return;
    }

    setLoading(true);
    try {
      const result = await api.identity.lookupOrCreate(phone);
      setAuth(phone, result.sessionToken);
    } catch {
      setError("Помилка сервера. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closePhoneModal(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 p-6">
        <button
          onClick={closePhoneModal}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors text-xl leading-none"
        >
          ×
        </button>

        <h2 className="font-heading text-xl text-zinc-100 mb-1">Вхід за номером</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Введіть ваш номер телефону щоб увійти або зареєструватись
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(""); }}
              placeholder="+380XXXXXXXXX"
              autoFocus
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            {error && <p className="mt-2 text-red-400 text-xs">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-zinc-950 font-heading text-sm py-3 hover:bg-accent-hover transition-colors disabled:opacity-50 uppercase tracking-wide"
          >
            {loading ? "Завантаження..." : "Підтвердити"}
          </button>
        </form>
      </div>
    </div>
  );
}
