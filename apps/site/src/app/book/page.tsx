"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { api } from "../../lib/api";

const schema = z.object({
  phone: z.string().regex(/^\+380\d{9}$/, "Формат: +380XXXXXXXXX"),
  name: z.string().min(2, "Мінімум 2 символи"),
  serviceType: z.enum(["STO", "TIRE"]),
  plate: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatSlot(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

function BookForm() {
  const searchParams = useSearchParams();
  const paramServiceType = searchParams.get("serviceType") as "STO" | "TIRE" | null;
  const paramVehicleId = searchParams.get("vehicleId");

  const [submitted, setSubmitted] = useState<{ bookingId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [vehiclePrefilled, setVehiclePrefilled] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceType: paramServiceType ?? "STO" },
  });

  const serviceType = watch("serviceType");

  const fetchSlots = useCallback(async (type: string, date: string) => {
    setSlotsLoading(true);
    setSelectedSlot(null);
    try {
      const result = await api.bookings.getSlots(type, date);
      setSlots(result);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots(serviceType, selectedDate);
  }, [serviceType, selectedDate, fetchSlots]);

  useEffect(() => {
    if (!paramVehicleId) return;
    api.garage.getVehicle(paramVehicleId).then((v) => {
      const vehicle = v as { plate?: string; make?: string; model?: string; year?: number };
      if (vehicle.plate) setValue("plate", vehicle.plate);
      if (vehicle.make) setValue("make", vehicle.make);
      if (vehicle.model) setValue("model", vehicle.model);
      if (vehicle.year) setValue("year", vehicle.year);
      setVehiclePrefilled(true);
    }).catch(() => {});
  }, [paramVehicleId, setValue]);

  async function onSubmit(data: FormData) {
    if (!selectedSlot) return;
    setError(null);
    try {
      const result = await api.bookings.create({ ...data, scheduledAt: selectedSlot });
      setSubmitted(result);
    } catch {
      setError("Сталася помилка. Спробуйте ще раз.");
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Запис прийнято!</h1>
        <p className="text-slate-500 mb-4">
          Ми надішлемо SMS-підтвердження на ваш телефон із посиланням для відстеження.
        </p>
        <p className="text-sm text-slate-400 font-mono mb-6">#{submitted.bookingId.slice(0, 8)}</p>
        <Link
          href={`/book/${submitted.bookingId}`}
          className="inline-block text-blue-700 text-sm font-medium hover:underline"
        >
          Перевірити статус запису →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1">Запис на сервіс</h1>
      <p className="text-slate-500 mb-8 text-sm">Без реєстрації. Тільки телефон та ім'я.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+380991234567"
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ваше ім'я <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Іван"
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Service type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Послуга <span className="text-red-500">*</span>
          </label>
          <select
            {...register("serviceType")}
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="STO">СТО — технічне обслуговування</option>
            <option value="TIRE">Шиномонтаж</option>
          </select>
        </div>

        {/* Date + Time slots */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Дата та час <span className="text-red-500">*</span>
          </p>
          <input
            type="date"
            value={selectedDate}
            min={todayStr()}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
          {slotsLoading ? (
            <p className="text-slate-400 text-xs">Завантаження слотів...</p>
          ) : slots.length === 0 ? (
            <p className="text-amber-600 text-xs">На цю дату вільних місць нема. Оберіть іншу дату.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    selectedSlot === slot
                      ? "bg-blue-700 text-white border-blue-700"
                      : "border-slate-200 text-slate-700 hover:border-blue-400"
                  }`}
                >
                  {formatSlot(slot)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle info */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Авто (необов'язково)
            {vehiclePrefilled && (
              <span className="ml-2 normal-case text-blue-600 font-normal">
                Дані авто підставлено з Гаражу
              </span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("plate")}
              type="text"
              placeholder="Номер (AA1234BB)"
              className="col-span-2 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              {...register("make")}
              type="text"
              placeholder="Марка (Toyota)"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              {...register("model")}
              type="text"
              placeholder="Модель (Camry)"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Коментар</label>
          <textarea
            {...register("notes")}
            rows={3}
            placeholder="Опишіть проблему або побажання..."
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || !selectedSlot}
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Відправляємо..." : !selectedSlot ? "Оберіть час запису" : "Записатись"}
        </button>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense>
      <BookForm />
    </Suspense>
  );
}
