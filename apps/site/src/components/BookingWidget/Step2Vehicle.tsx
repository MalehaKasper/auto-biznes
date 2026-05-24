"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { VehicleData } from "./index";

interface GarageVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
}

interface Props {
  phone: string;
  onDone: (vehicle: VehicleData) => void;
}

export function Step2Vehicle({ phone, onDone }: Props) {
  const [garageVehicles, setGarageVehicles] = useState<GarageVehicle[]>([]);
  const [showManual, setShowManual] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ make: "", model: "", year: "", plate: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (phone) {
      api.garage
        .getVehicles()
        .then((data) => setGarageVehicles(data as GarageVehicle[]))
        .catch(() => {});
    }
  }, [phone]);

  const handleSelectGarage = (v: GarageVehicle) => {
    setSelected(v.id);
    setShowManual(false);
  };

  const handleSubmitGarage = () => {
    const v = garageVehicles.find((g) => g.id === selected);
    if (v) {
      onDone({ vehicleId: v.id, make: v.make, model: v.model, year: v.year, plate: v.plate });
    }
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!form.make.trim()) errors.make = "Обов'язкове поле";
    if (!form.model.trim()) errors.model = "Обов'язкове поле";
    if (form.year && (isNaN(+form.year) || +form.year < 1950 || +form.year > 2030)) {
      errors.year = "Введіть рік від 1950 до 2030";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onDone({
      make: form.make.trim(),
      model: form.model.trim(),
      year: form.year ? +form.year : undefined,
      plate: form.plate.trim() || undefined,
    });
  };

  const hasGarage = garageVehicles.length > 0;

  return (
    <div>
      <h3 className="font-heading text-xl text-zinc-100 mb-2">Ваш автомобіль</h3>
      <p className="text-zinc-400 text-sm font-body normal-case mb-6">
        Оберіть авто з Гаражу або введіть вручну
      </p>

      {hasGarage && !showManual && (
        <div className="space-y-3 mb-4">
          {garageVehicles.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelectGarage(v)}
              className={`w-full text-left border p-4 transition-colors ${
                selected === v.id
                  ? "border-accent text-zinc-100"
                  : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
              }`}
            >
              <span className="font-heading text-sm block">
                {v.make} {v.model} {v.year}
              </span>
              {v.plate && (
                <span className="text-xs text-zinc-500 font-body normal-case">{v.plate}</span>
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { setSelected(null); setShowManual(true); }}
            className="w-full border border-dashed border-zinc-700 text-zinc-500 p-4 text-sm font-heading uppercase tracking-wide hover:border-zinc-500 hover:text-zinc-300 transition-colors"
          >
            + Додати нове авто
          </button>
        </div>
      )}

      {(!hasGarage || showManual) && (
        <form onSubmit={handleSubmitManual} className="space-y-3 mb-4">
          {[
            { key: "make", label: "Марка", placeholder: "Toyota" },
            { key: "model", label: "Модель", placeholder: "Camry" },
            { key: "year", label: "Рік", placeholder: "2020" },
            { key: "plate", label: "Держ. номер (опційно)", placeholder: "AA1234BB" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-zinc-500 font-heading uppercase tracking-wide mb-1">
                {label}
              </label>
              <input
                type={key === "year" ? "number" : "text"}
                value={form[key as keyof typeof form]}
                onChange={(e) => {
                  setForm((p) => ({ ...p, [key]: e.target.value }));
                  setFormErrors((p) => ({ ...p, [key]: "" }));
                }}
                placeholder={placeholder}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              {formErrors[key] && (
                <p className="mt-1 text-red-400 text-xs">{formErrors[key]}</p>
              )}
            </div>
          ))}
          {hasGarage && (
            <button
              type="button"
              onClick={() => setShowManual(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-body normal-case"
            >
              ← Назад до Гаражу
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-accent text-zinc-950 font-heading text-sm py-3 hover:bg-accent-hover transition-colors uppercase tracking-wide"
          >
            Далі →
          </button>
        </form>
      )}

      {hasGarage && !showManual && selected && (
        <button
          type="button"
          onClick={handleSubmitGarage}
          className="w-full bg-accent text-zinc-950 font-heading text-sm py-3 hover:bg-accent-hover transition-colors uppercase tracking-wide"
        >
          Далі →
        </button>
      )}
    </div>
  );
}
