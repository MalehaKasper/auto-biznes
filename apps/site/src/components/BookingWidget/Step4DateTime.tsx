"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { VehicleData } from "./index";

interface Props {
  phone: string;
  vehicle: VehicleData;
  serviceType: string;
  onDone: (bookingId: string) => void;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatSlot(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
}

export function Step4DateTime({ phone, vehicle, serviceType, onDone }: Props) {
  const [date, setDate] = useState(todayStr());
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    api.bookings
      .getSlots(serviceType, date)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [date, serviceType]);

  const handleConfirm = async () => {
    if (!selectedSlot) return;
    setError("");
    setSubmitting(true);
    try {
      const result = await api.bookings.create({
        phone,
        serviceType,
        scheduledAt: selectedSlot,
        ...(vehicle.vehicleId
          ? { vehicleId: vehicle.vehicleId }
          : {
              make: vehicle.make,
              model: vehicle.model,
              year: vehicle.year,
              plate: vehicle.plate,
            }),
      });
      onDone(result.bookingId);
    } catch {
      setError("Не вдалось записатись. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="font-heading text-xl text-zinc-100 mb-2">Дата та час</h3>
      <p className="text-zinc-400 text-sm font-body normal-case mb-6">
        Оберіть зручний час для послуги «{serviceType}»
      </p>

      <div className="mb-6">
        <label className="block text-xs text-zinc-500 font-heading uppercase tracking-wide mb-1">
          Дата
        </label>
        <input
          type="date"
          value={date}
          min={todayStr()}
          onChange={(e) => setDate(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-zinc-100 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors w-full"
        />
      </div>

      <div className="mb-6">
        <p className="text-xs text-zinc-500 font-heading uppercase tracking-wide mb-3">
          {formatDate(date + "T00:00:00")} — вільні слоти
        </p>

        {slotsLoading && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 bg-zinc-800 animate-pulse" />
            ))}
          </div>
        )}

        {!slotsLoading && slots.length === 0 && (
          <p className="text-zinc-500 text-sm font-body normal-case border border-zinc-800 p-4">
            Немає вільних слотів на цю дату. Оберіть іншу.
          </p>
        )}

        {!slotsLoading && slots.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`border py-2 text-sm font-heading transition-colors ${
                  selectedSlot === slot
                    ? "border-accent bg-accent text-zinc-950"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {formatSlot(slot)}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

      <button
        type="button"
        disabled={!selectedSlot || submitting}
        onClick={handleConfirm}
        className="w-full bg-accent text-zinc-950 font-heading text-sm py-3 hover:bg-accent-hover transition-colors disabled:opacity-40 uppercase tracking-wide"
      >
        {submitting ? "Записую..." : "Підтвердити запис"}
      </button>
    </div>
  );
}
