"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";

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
      className="block border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">{label}</p>
          {vehicle.plate ? (
            <p className="text-sm text-slate-500 font-mono mt-0.5">{vehicle.plate}</p>
          ) : (
            <p className="text-xs text-amber-500 mt-0.5">Деталі уточнюються</p>
          )}
        </div>
        {vehicle.activeBooking && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
            {vehicle.activeBooking.scheduledAt
              ? `Запис ${new Date(vehicle.activeBooking.scheduledAt).toLocaleDateString("uk-UA")}`
              : "Очікує підтвердження"}
          </span>
        )}
      </div>
      {vehicle.lastServiceDate && (
        <p className="text-xs text-slate-400 mt-3">
          Останній сервіс:{" "}
          {new Date(vehicle.lastServiceDate).toLocaleDateString("uk-UA")}
        </p>
      )}
    </Link>
  );
}

export default function GaragePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.garage
      .getVehicles()
      .then((v) => setVehicles(v as Vehicle[]))
      .catch(() => setError("Не вдалося завантажити Гараж. Спробуйте пізніше."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Мій Гараж</h1>
        <Link
          href="/garage/add"
          className="border border-blue-600 text-blue-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
        >
          + Додати авто
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {vehicles.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-4">🚗</p>
          <p className="font-medium text-slate-600 mb-1">Гараж порожній</p>
          <p className="text-sm">
            Авто з'являться після запису на сервіс або можна{" "}
            <Link href="/garage/add" className="text-blue-600 hover:underline">
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
