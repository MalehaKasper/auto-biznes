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
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const SERVICE_LABEL: Record<string, string> = {
  STO: "СТО — технічне обслуговування",
  TIRE: "Шиномонтаж",
};

export default function BookingStatusPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BookingStatusData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.bookings.getStatus(id)
      .then(setData)
      .catch((err: { status?: number }) => {
        if (err.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-100 rounded w-1/2" />
          <div className="h-24 bg-slate-100 rounded-xl" />
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-xl font-bold mb-2">Запис не знайдено</h1>
        <p className="text-slate-500 text-sm mb-6">Перевірте посилання з SMS або зверніться до нас.</p>
        <Link href="/book" className="text-blue-700 text-sm font-medium hover:underline">
          ← Записатись знову
        </Link>
      </div>
    );
  }

  const statusLabel = STATUS_LABEL[data.status];
  const statusColor = STATUS_COLOR[data.status];

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <Link href="/book" className="text-slate-400 text-sm hover:text-slate-600 mb-8 inline-block">
        ← Нова заявка
      </Link>

      <h1 className="text-2xl font-bold mb-6">Статус запису</h1>

      <div className="border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Статус</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Послуга</span>
          <span className="text-sm font-medium text-slate-800">
            {SERVICE_LABEL[data.serviceType] ?? data.serviceType}
          </span>
        </div>

        {data.scheduledAt && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Дата та час</span>
            <span className="text-sm font-medium text-slate-800">
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
            <span className="text-sm text-slate-500">Номер авто</span>
            <span className="text-sm font-mono font-medium text-slate-800">{data.vehiclePlate}</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Номер запису: <span className="font-mono">{id.slice(0, 8)}</span>
          </p>
        </div>
      </div>

      {data.status === "COMPLETED" && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          Дякуємо! Ваш автомобіль обслуговано. Заходьте до Гаражу щоб переглянути сервісну книгу.
        </div>
      )}

      {data.status === "CANCELLED" && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
          Запис скасовано. Бажаєте{" "}
          <Link href="/book" className="underline font-medium">записатись знову</Link>?
        </div>
      )}
    </div>
  );
}
