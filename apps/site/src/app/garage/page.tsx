"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";
import { usePhoneAuth } from "../../context/PhoneAuthModal";

interface Vehicle {
  id: string;
  plate: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  color: string | null;
  lastServiceDate: string | null;
  activeBooking: { status: string; scheduledAt: string | null } | null;
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const label =
    [vehicle.make, vehicle.model, vehicle.year].filter(Boolean).join(" ") ||
    "Авто без деталей";

  return (
    <Link
      href={`/garage/${vehicle.id}`}
      className="block border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-600 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-zinc-100">{label}</p>
          {vehicle.plate ? (
            <p className="text-sm text-zinc-300 font-mono mt-0.5">{vehicle.plate}</p>
          ) : (
            <p className="text-xs text-amber-500 mt-0.5">Деталі уточнюються</p>
          )}
        </div>
        {vehicle.activeBooking && (
          <span className="text-xs border border-zinc-700 text-zinc-400 px-2 py-1 whitespace-nowrap font-body normal-case">
            {vehicle.activeBooking.scheduledAt
              ? `Запис ${new Date(vehicle.activeBooking.scheduledAt).toLocaleDateString("uk-UA")}`
              : "Очікує підтвердження"}
          </span>
        )}
      </div>
      {vehicle.lastServiceDate && (
        <p className="text-xs text-zinc-400 mt-3 font-body normal-case">
          Останній сервіс:{" "}
          {new Date(vehicle.lastServiceDate).toLocaleDateString("uk-UA")}
        </p>
      )}
    </Link>
  );
}

export default function GaragePage() {
  const { phone, openPhoneModal } = usePhoneAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!phone) {
      setLoading(false);
      openPhoneModal();
      return;
    }
    api.garage
      .getVehicles()
      .then((v) => setVehicles(v as Vehicle[]))
      .catch(() => setError("Не вдалося завантажити Гараж. Спробуйте пізніше."))
      .finally(() => setLoading(false));
  }, [phone, openPhoneModal]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="font-heading text-2xl text-zinc-100 mb-4">Мій Гараж</p>
        <p className="text-zinc-400 text-sm font-body normal-case mb-6">
          Для перегляду Гаражу введіть ваш номер телефону
        </p>
        <button
          onClick={openPhoneModal}
          className="border-2 border-accent text-accent font-heading text-sm uppercase tracking-widest px-8 py-3 hover:bg-accent hover:text-zinc-950 transition-all"
        >
          Увійти за номером
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl text-zinc-100">Мій Гараж</h1>
        <Link
          href="/garage/add"
          className="border border-zinc-700 text-zinc-300 text-xs font-heading uppercase tracking-wide px-4 py-2 hover:border-accent hover:text-accent transition-colors"
        >
          + Додати авто
        </Link>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {vehicles.length === 0 ? (
        <div className="text-center py-16 text-zinc-600">
          <p className="text-4xl mb-4">🚗</p>
          <p className="font-heading text-zinc-400 mb-1">Гараж порожній</p>
          <p className="text-sm font-body normal-case">
            Авто з'являться після запису на сервіс або можна{" "}
            <Link href="/garage/add" className="text-accent hover:underline">
              додати вручну
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
