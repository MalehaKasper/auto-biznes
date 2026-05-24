"use client";

import { useState } from "react";
import { api } from "../../lib/api";
import { usePhoneAuth } from "../../context/PhoneAuthModal";

interface Props {
  onDone: (phone: string) => void;
}

function validatePhone(phone: string): boolean {
  return /^\+380\d{9}$/.test(phone);
}

export function Step1Phone({ onDone }: Props) {
  const { setAuth } = usePhoneAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePhone(phone)) {
      setError("Формат: +380XXXXXXXXX");
      return;
    }

    setLoading(true);
    try {
      const result = await api.identity.lookupOrCreate(phone);
      setAuth(phone, result.sessionToken);
      onDone(phone);
    } catch {
      setError("Помилка сервера. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-xl text-zinc-100 mb-2">Ваш номер телефону</h3>
      <p className="text-zinc-400 text-sm font-body normal-case mb-6">
        Введіть номер для запису. Реєстрація не потрібна.
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
          {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-zinc-950 font-heading text-sm py-3 hover:bg-accent-hover transition-colors disabled:opacity-50 uppercase tracking-wide"
        >
          {loading ? "Перевірка..." : "Далі →"}
        </button>
      </form>
    </div>
  );
}
