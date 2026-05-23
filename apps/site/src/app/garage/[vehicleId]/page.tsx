"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../lib/api";

interface ServiceRecord {
  id: string;
  serviceType: string;
  description: string;
  mileage: number | null;
  cost: number | null;
  performedAt: string;
}

interface VehicleDetail {
  id: string;
  plate: string | null;
  vin: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  color: string | null;
  serviceRecords: ServiceRecord[];
}

export default function VehicleDetailPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.garage
      .getVehicle(vehicleId)
      .then((v) => setVehicle(v as VehicleDetail))
      .catch(() => setError("Не вдалося завантажити дані авто."))
      .finally(() => setLoading(false));
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-100 rounded w-1/3" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">{error ?? "Авто не знайдено"}</p>
        <Link href="/garage" className="text-blue-600 text-sm mt-4 inline-block">
          ← До Гаражу
        </Link>
      </div>
    );
  }

  const vehicleLabel =
    [vehicle.make, vehicle.model, vehicle.year].filter(Boolean).join(" ") ||
    "Авто без деталей";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/garage" className="text-slate-400 text-sm hover:text-slate-600 mb-6 inline-block">
        ← Гараж
      </Link>

      <div className="border border-slate-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">{vehicleLabel}</h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm text-slate-600">
              {vehicle.plate && <p><span className="text-slate-400">Номер:</span> {vehicle.plate}</p>}
              {vehicle.color && <p><span className="text-slate-400">Колір:</span> {vehicle.color}</p>}
              {vehicle.vin && (
                <p className="col-span-2">
                  <span className="text-slate-400">VIN:</span>{" "}
                  <span className="font-mono text-xs">{vehicle.vin}</span>
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/book?vehicleId=${vehicle.id}`}
            className="shrink-0 bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Записати на сервіс
          </Link>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Сервісна книга</h2>

      {vehicle.serviceRecords.length === 0 ? (
        <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm">Сервісна книга порожня</p>
          <p className="text-xs mt-1">Записи з'являться після першого обслуговування</p>
        </div>
      ) : (
        <div className="space-y-3">
          {vehicle.serviceRecords.map((rec) => (
            <div key={rec.id} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-800">{rec.serviceType}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{rec.description}</p>
                </div>
                <p className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(rec.performedAt).toLocaleDateString("uk-UA")}
                </p>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-slate-400">
                {rec.mileage && <span>Пробіг: {rec.mileage.toLocaleString()} км</span>}
                {rec.cost && <span>Вартість: {Number(rec.cost).toLocaleString()} грн</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
