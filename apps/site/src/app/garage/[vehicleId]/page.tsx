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
          <div className="h-8 bg-zinc-800 w-1/3" />
          <div className="h-32 bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-red-400">{error ?? "Авто не знайдено"}</p>
        <Link href="/garage" className="text-accent text-sm mt-4 inline-block font-heading uppercase tracking-wide hover:text-accent-hover transition-colors">
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
      <Link href="/garage" className="text-zinc-500 text-sm hover:text-zinc-200 mb-6 inline-block font-heading uppercase tracking-wide transition-colors">
        ← Гараж
      </Link>

      <div className="border border-zinc-800 bg-zinc-900 p-6 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl text-zinc-100 mb-1">{vehicleLabel}</h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm text-zinc-400 font-body normal-case">
              {vehicle.plate && <p><span className="text-zinc-500">Номер:</span> {vehicle.plate}</p>}
              {vehicle.color && <p><span className="text-zinc-500">Колір:</span> {vehicle.color}</p>}
              {vehicle.vin && (
                <p className="col-span-2">
                  <span className="text-zinc-500">VIN:</span>{" "}
                  <span className="font-mono text-xs text-zinc-300">{vehicle.vin}</span>
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/book?vehicleId=${vehicle.id}`}
            className="shrink-0 bg-accent text-zinc-950 text-xs font-heading uppercase tracking-wider px-4 py-2 hover:bg-accent-hover transition-colors"
          >
            Записати на сервіс
          </Link>
        </div>
      </div>

      <h2 className="font-heading text-lg text-zinc-100 mb-4">Сервісна книга</h2>

      {vehicle.serviceRecords.length === 0 ? (
        <div className="text-center py-10 text-zinc-500 border border-dashed border-zinc-700">
          <p className="text-sm font-body normal-case">Сервісна книга порожня</p>
          <p className="text-xs mt-1 font-body normal-case">Записи з'являться після першого обслуговування</p>
        </div>
      ) : (
        <div className="space-y-3">
          {vehicle.serviceRecords.map((rec) => (
            <div key={rec.id} className="border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-zinc-100 text-sm">{rec.serviceType}</p>
                  <p className="text-sm text-zinc-400 mt-0.5 font-body normal-case">{rec.description}</p>
                </div>
                <p className="text-xs text-zinc-500 whitespace-nowrap font-body normal-case">
                  {new Date(rec.performedAt).toLocaleDateString("uk-UA")}
                </p>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-zinc-500 font-body normal-case">
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
