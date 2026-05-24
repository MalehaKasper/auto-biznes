"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, getAccessToken } from "../../../lib/api";

const inputClass = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-zinc-400 mb-1 font-body normal-case";

export default function AddVehiclePage() {
  const router = useRouter();
  const [plate, setPlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login?redirect=/garage/add");
    }
  }, [router]);

  function validate(): string | null {
    if (!plate.trim()) return "Будь ласка, вкажіть номерний знак";
    if (vin && vin.length !== 17) return "VIN повинен містити рівно 17 символів";
    const y = Number(year);
    if (year && (isNaN(y) || y < 1900 || y > 2100)) return "Рік має бути від 1900 до 2100";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setError(null);
    setLoading(true);
    try {
      await api.garage.addVehicle({
        plate: plate.trim(),
        make: make.trim() || undefined,
        model: model.trim() || undefined,
        year: year ? Number(year) : undefined,
        color: color.trim() || undefined,
        vin: vin.trim() || undefined,
      });
      router.push("/garage");
    } catch {
      setError("Не вдалося додати авто. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <Link href="/garage" className="text-zinc-500 text-sm hover:text-zinc-200 mb-8 inline-block font-heading uppercase tracking-wide transition-colors">
        ← До Гаражу
      </Link>

      <h1 className="font-heading text-2xl text-zinc-100 mb-1">Додати авто</h1>
      <p className="text-zinc-400 text-sm mb-8 font-body normal-case">Введіть дані вашого автомобіля</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>
            Держ. номер <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="AA1234BB"
            className={`${inputClass} font-mono`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Марка</label>
            <input type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Toyota" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Модель</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Camry" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Рік</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2018" min={1900} max={2100} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Колір</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Чорний" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>VIN (необов'язково)</label>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="17 символів"
            maxLength={17}
            className={`${inputClass} font-mono tracking-widest`}
          />
          {vin && vin.length !== 17 && (
            <p className="text-zinc-500 text-xs mt-1">{vin.length}/17 символів</p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Додаємо..." : "Додати авто"}
        </button>
      </form>
    </div>
  );
}
