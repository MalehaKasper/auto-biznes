"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

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
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Заявку отримано!
        </h2>
        <p className="text-slate-500 mb-8">
          Ми зв'яжемось з вами для уточнення деталей та призначення безкоштовної оцінки.
        </p>
        <button
          onClick={() => router.push("/catalog")}
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800"
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
        className="text-sm text-slate-500 hover:text-slate-800 mb-6 inline-block"
      >
        ← Назад
      </button>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Оцінити своє авто
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        Залиште заявку — ми зв'яжемось і зробимо безкоштовну оцінку вашого автомобіля.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Телефон *
            </label>
            <input
              type="tel"
              placeholder="+380XXXXXXXXX"
              value={form.phone}
              onChange={set("phone")}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ім'я *
            </label>
            <input
              type="text"
              placeholder="Ваше ім'я"
              value={form.name}
              onChange={set("name")}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium text-slate-700">Ваше авто</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Марка *</label>
              <input
                type="text"
                placeholder="Toyota"
                value={form.tradeVehicleMake}
                onChange={set("tradeVehicleMake")}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Модель *</label>
              <input
                type="text"
                placeholder="Camry"
                value={form.tradeVehicleModel}
                onChange={set("tradeVehicleModel")}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Рік випуску</label>
              <input
                type="number"
                placeholder="2019"
                value={form.tradeVehicleYear}
                onChange={set("tradeVehicleYear")}
                min={1900}
                max={2100}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Пробіг (км)</label>
              <input
                type="number"
                placeholder="85000"
                value={form.tradeVehicleMileage}
                onChange={set("tradeVehicleMileage")}
                min={0}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Держномер</label>
            <input
              type="text"
              placeholder="AA1234BB"
              value={form.tradeVehiclePlate}
              onChange={set("tradeVehiclePlate")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Додатковий коментар
          </label>
          <textarea
            placeholder="Стан авто, особливості, побажання..."
            value={form.message}
            onChange={set("message")}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Надсилання..." : "Надіслати заявку"}
        </button>
      </form>
    </div>
  );
}
