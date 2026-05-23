"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, setAccessToken } from "../../lib/api";

type Step = "phone" | "otp" | "profile";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [retryAfter, setRetryAfter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await api.auth.requestOtp(phone);
      setRetryAfter(result.retryAfter);
      setStep("otp");
    } catch (err: unknown) {
      const e = err as { body?: { retryAfter?: number }; status?: number };
      if (e.status === 409 && e.body?.retryAfter) {
        setRetryAfter(e.body.retryAfter);
        setError(`Код вже надіслано. Спробуйте через ${e.body.retryAfter} сек.`);
      } else {
        setError("Помилка. Перевірте номер телефону.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await api.auth.verifyOtp(phone, otp);
      setAccessToken(result.accessToken);
      if (result.isFirstLogin) {
        setStep("profile");
      } else {
        router.push("/garage");
      }
    } catch {
      setError("Невірний або прострочений код.");
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.auth.updateProfile(name, email || undefined);
      router.push("/garage");
    } catch {
      setError("Помилка збереження профілю.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      {step === "phone" && (
        <>
          <h1 className="text-2xl font-bold mb-1">Увійти</h1>
          <p className="text-slate-500 text-sm mb-8">Введіть номер телефону — надішлемо код</p>
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380991234567"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Надсилаємо..." : "Отримати код"}
            </button>
          </form>
        </>
      )}

      {step === "otp" && (
        <>
          <h1 className="text-2xl font-bold mb-1">Введіть код</h1>
          <p className="text-slate-500 text-sm mb-8">
            Надіслали 6-значний код на <strong>{phone}</strong>
          </p>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Перевіряємо..." : "Підтвердити"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-slate-500 text-sm hover:text-slate-700"
            >
              Змінити номер
            </button>
          </form>
          {retryAfter > 0 && (
            <p className="text-slate-400 text-xs text-center mt-4">
              Повторний запит через {retryAfter} сек.
            </p>
          )}
        </>
      )}

      {step === "profile" && (
        <>
          <h1 className="text-2xl font-bold mb-1">Ваш профіль</h1>
          <p className="text-slate-500 text-sm mb-8">Заповніть один раз — збережемо назавжди</p>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Ім'я <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Іван"
                required
                minLength={2}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email (необов'язково)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ivan@example.com"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !name}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Зберігаємо..." : "Зберегти та продовжити"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
