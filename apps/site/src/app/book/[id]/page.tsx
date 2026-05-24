"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../lib/api";

type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

interface BookingStatusData {
  status: BookingStatus;
  serviceType: string;
  scheduledAt: string | null;
  vehiclePlate: string | null;
}

const STATUS_LABEL: Record<BookingStatus, string> = {
  PENDING: "Очікує підтвердження",
  CONFIRMED: "Підтверджено",
  IN_PROGRESS: "В роботі",
  COMPLETED: "Виконано",
  CANCELLED: "Скасовано",
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  PENDING: "border-accent text-accent",
  CONFIRMED: "border-blue-400 text-blue-400",
  IN_PROGRESS: "border-accent-alt text-accent-alt",
  COMPLETED: "border-emerald-400 text-emerald-400",
  CANCELLED: "border-red-400 text-red-400",
};

const SERVICE_LABEL: Record<string, string> = {
  STO: "СТО — технічне обслуговування",
  TIRE: "Шиномонтаж",
  TIRE_STORAGE: "Зберігання шин",
};

export default function BookingStatusPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BookingStatusData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.bookings.getStatus(id)
      .then((d) => setData(d as BookingStatusData))
      .catch((err: { status?: number }) => {
        if (err.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-zinc-800 w-1/2" />
          <div className="h-24 bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="font-heading text-xl text-zinc-100 mb-2">Запис не знайдено</h1>
        <p className="text-zinc-400 text-sm font-body normal-case mb-6">
          Перевірте посилання з SMS або зверніться до нас.
        </p>
        <Link href="/book" className="text-accent text-sm font-heading uppercase tracking-wider hover:text-accent-hover transition-colors">
          ← Записатись знову
        </Link>
      </div>
    );
  }

  const statusLabel = STATUS_LABEL[data.status];
  const statusColor = STATUS_COLOR[data.status];

  return (
    <div className="max-w-md mx-auto px-4 py-12 bg-zinc-950 min-h-screen">
      <Link href="/book" className="text-zinc-500 text-sm font-heading uppercase tracking-wide hover:text-zinc-300 transition-colors mb-8 inline-block">
        ← Нова заявка
      </Link>

      <h1 className="font-heading text-2xl text-zinc-100 mb-6">Статус запису</h1>

      <div className="border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400 font-body normal-case">Статус</span>
          <span className={`text-xs font-heading uppercase tracking-wider border px-3 py-1 ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400 font-body normal-case">Послуга</span>
          <span className="text-sm text-zinc-100 font-body normal-case">
            {SERVICE_LABEL[data.serviceType] ?? data.serviceType}
          </span>
        </div>

        {data.scheduledAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400 font-body normal-case">Дата та час</span>
            <span className="text-sm text-zinc-100 font-body normal-case">
              {new Date(data.scheduledAt).toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}

        {data.vehiclePlate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400 font-body normal-case">Номер авто</span>
            <span className="text-sm text-zinc-100 font-mono">{data.vehiclePlate}</span>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800">
          <p className="text-xs text-zinc-600 font-body normal-case">
            Номер запису: <span className="font-mono text-zinc-500">{id.slice(0, 8)}</span>
          </p>
        </div>
      </div>

      {data.status === "COMPLETED" && (
        <div className="mt-4 border border-emerald-800 bg-emerald-950/30 p-4 text-sm text-emerald-300 font-body normal-case">
          Дякуємо! Ваш автомобіль обслуговано. Заходьте до Гаражу щоб переглянути сервісну книгу.
        </div>
      )}

      {data.status === "CANCELLED" && (
        <div className="mt-4 border border-red-800 bg-red-950/30 p-4 text-sm text-red-300 font-body normal-case">
          Запис скасовано. Бажаєте{" "}
          <Link href="/book" className="text-accent hover:text-accent-hover underline">записатись знову</Link>?
        </div>
      )}
    </div>
  );
}
