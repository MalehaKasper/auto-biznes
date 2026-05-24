"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const inputClass = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-zinc-400 mb-1 font-body normal-case";
const labelSmClass = "block text-xs text-zinc-400 mb-1 font-body normal-case";

export default function EvaluatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    phone: "",
    name: "",
    tradeVehicleMake: "",
    tradeVehicleModel: "",
    tradeVehicleYear: "",
    tradeVehicleMileage: "",
    tradeVehiclePlate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        type: "EVALUATE",
        phone: form.phone,
        name: form.name,
        tradeVehicleMake: form.tradeVehicleMake,
        tradeVehicleModel: form.tradeVehicleModel,
      };
      if (form.tradeVehicleYear)
        payload.tradeVehicleYear = Number(form.tradeVehicleYear);
      if (form.tradeVehicleMileage)
        payload.tradeVehicleMileage = Number(form.tradeVehicleMileage);
      if (form.tradeVehiclePlate)
        payload.tradeVehiclePlate = form.tradeVehiclePlate;
      if (form.message) payload.message = form.message;

      await api.catalog.createInquiry(payload);
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Помилка. Спробуйте ще раз."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-accent text-5xl mb-4">✓</div>
        <h2 className="font-heading text-2xl text-zinc-100 mb-2">Заявку отримано!</h2>
        <p className="text-zinc-400 mb-8 font-body normal-case">
          Ми зв'яжемось з вами для уточнення деталей та призначення безкоштовної оцінки.
        </p>
        <button
          onClick={() => router.push("/catalog")}
          className="bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent-hover transition-colors"
        >
          Повернутись до каталогу
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <button
        onClick={() => router.push("/catalog?tab=wanted")}
        className="text-sm text-zinc-500 hover:text-zinc-200 mb-6 inline-block font-heading uppercase tracking-wide transition-colors"
      >
        ← Назад
      </button>
      <h1 className="font-heading text-2xl text-zinc-100 mb-2">Оцінити своє авто</h1>
      <p className="text-zinc-400 text-sm mb-8 font-body normal-case">
        Залиште заявку — ми зв'яжемось і зробимо безкоштовну оцінку вашого автомобіля.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Телефон *</label>
            <input type="tel" placeholder="+380XXXXXXXXX" value={form.phone} onChange={set("phone")} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ім'я *</label>
            <input type="text" placeholder="Ваше ім'я" value={form.name} onChange={set("name")} required className={inputClass} />
          </div>
        </div>

        <div className="border border-zinc-700 bg-zinc-800 p-4 space-y-3">
          <p className="text-sm text-zinc-300 font-body normal-case">Ваше авто</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelSmClass}>Марка *</label>
              <input type="text" placeholder="Toyota" value={form.tradeVehicleMake} onChange={set("tradeVehicleMake")} required className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Модель *</label>
              <input type="text" placeholder="Camry" value={form.tradeVehicleModel} onChange={set("tradeVehicleModel")} required className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Рік випуску</label>
              <input type="number" placeholder="2019" value={form.tradeVehicleYear} onChange={set("tradeVehicleYear")} min={1900} max={2100} className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Пробіг (км)</label>
              <input type="number" placeholder="85000" value={form.tradeVehicleMileage} onChange={set("tradeVehicleMileage")} min={0} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelSmClass}>Держномер</label>
            <input type="text" placeholder="AA1234BB" value={form.tradeVehiclePlate} onChange={set("tradeVehiclePlate")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Додатковий коментар</label>
          <textarea
            placeholder="Стан авто, особливості, побажання..."
            value={form.message}
            onChange={set("message")}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Надсилання..." : "Надіслати заявку"}
        </button>
      </form>
    </div>
  );
}
