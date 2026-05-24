"use client";

import { useState } from "react";

const SERVICES = [
  {
    id: "STO",
    label: "СТО",
    description: "ТО, ремонт двигуна, ходової, гальм, електрики",
    icon: "🔧",
  },
  {
    id: "TIRE",
    label: "Шиномонтаж",
    description: "Сезонне перевзування, балансування, ремонт шин",
    icon: "🛞",
  },
  {
    id: "TIRE_STORAGE",
    label: "Зберігання шин",
    description: "Сезонне зберігання комплекту шин",
    icon: "📦",
  },
  {
    id: "OTHER",
    label: "Інше",
    description: "Консультація або інший вид роботи",
    icon: "📋",
  },
];

interface Props {
  onDone: (serviceType: string) => void;
}

export function Step3Service({ onDone }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onDone(id), 200);
  };

  return (
    <div>
      <h3 className="font-heading text-xl text-zinc-100 mb-2">Тип послуги</h3>
      <p className="text-zinc-400 text-sm font-body normal-case mb-6">
        Що потрібно зробити?
      </p>

      <div className="space-y-3">
        {SERVICES.map((svc) => (
          <button
            key={svc.id}
            type="button"
            onClick={() => handleSelect(svc.id)}
            className={`w-full text-left border p-5 transition-all duration-150 ${
              selected === svc.id
                ? "border-accent bg-zinc-800"
                : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{svc.icon}</span>
              <div>
                <p className="font-heading text-sm text-zinc-100 mb-1">{svc.label}</p>
                <p className="text-xs text-zinc-400 font-body normal-case tracking-normal">
                  {svc.description}
                </p>
              </div>
              {selected === svc.id && (
                <span className="ml-auto text-accent">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
