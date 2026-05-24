"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, setAccessToken } from "../../lib/api";

type Step = "phone" | "otp" | "profile";

const inputClass = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-zinc-400 mb-1 font-body normal-case";

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
          <h1 className="font-heading text-2xl text-zinc-100 mb-1">Увійти</h1>
          <p className="text-zinc-400 text-sm mb-8 font-body normal-case">Введіть номер телефону — надішлемо код</p>
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380991234567"
              required
              className={inputClass}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Надсилаємо..." : "Отримати код"}
            </button>
          </form>
        </>
      )}

      {step === "otp" && (
        <>
          <h1 className="font-heading text-2xl text-zinc-100 mb-1">Введіть код</h1>
          <p className="text-zinc-400 text-sm mb-8 font-body normal-case">
            Надіслали 6-значний код на <strong className="text-zinc-200">{phone}</strong>
          </p>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:border-accent transition-colors"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Перевіряємо..." : "Підтвердити"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-zinc-500 text-sm hover:text-zinc-300 font-body normal-case transition-colors"
            >
              Змінити номер
            </button>
          </form>
          {retryAfter > 0 && (
            <p className="text-zinc-500 text-xs text-center mt-4 font-body normal-case">
              Повторний запит через {retryAfter} сек.
            </p>
          )}
        </>
      )}

      {step === "profile" && (
        <>
          <h1 className="font-heading text-2xl text-zinc-100 mb-1">Ваш профіль</h1>
          <p className="text-zinc-400 text-sm mb-8 font-body normal-case">Заповніть один раз — збережемо назавжди</p>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>
                Ім'я <span className="text-red-400">*</span>
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Іван" required minLength={2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email (необов'язково)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ivan@example.com" className={inputClass} />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !name}
              className="w-full bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Зберігаємо..." : "Зберегти та продовжити"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
