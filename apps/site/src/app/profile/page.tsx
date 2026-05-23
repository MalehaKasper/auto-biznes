"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, getAccessToken } from "../../lib/api";

type Booking = {
  id: string;
  serviceType: string;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Очікує підтвердження",
  CONFIRMED: "Підтверджено",
  IN_PROGRESS: "В роботі",
  COMPLETED: "Виконано",
  CANCELLED: "Скасовано",
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const SERVICE_LABEL: Record<string, string> = {
  STO: "СТО",
  TIRE: "Шиномонтаж",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("uk-UA", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    phone: string;
    name: string | null;
    email: string | null;
    bookings: Booking[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login?redirect=/profile");
      return;
    }
    api.auth.getProfile()
      .then((data) => {
        setProfile(data);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
      })
      .catch(() => router.replace("/login?redirect=/profile"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError(null);
    setSaved(false);
    setSaving(true);
    try {
      await api.auth.updateProfile(name, email || undefined);
      setSaved(true);
      setProfile((prev) => prev ? { ...prev, name: name || null, email: email || null } : prev);
    } catch {
      setSaveError("Не вдалося зберегти. Можливо, цей email вже зайнятий.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-100 rounded w-1/3" />
          <div className="h-40 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Мій профіль</h1>

      {/* Profile form */}
      <div className="border border-slate-200 rounded-2xl p-6 mb-8">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
            <p className="text-slate-900 font-mono text-sm px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
              {profile.phone}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ім'я</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше ім'я"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
          {saved && <p className="text-green-600 text-sm">Збережено</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors text-sm"
          >
            {saving ? "Збереження..." : "Зберегти"}
          </button>
        </form>
      </div>

      {/* Bookings history */}
      <h2 className="text-lg font-semibold mb-4">Мої записи</h2>
      {profile.bookings.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl py-10 text-center text-slate-400 text-sm">
          <p>У вас ще немає записів</p>
          <Link href="/book" className="text-blue-700 font-medium mt-2 inline-block hover:underline">
            Записатись на сервіс →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.bookings.map((b) => (
            <Link
              key={b.id}
              href={`/book/${b.id}`}
              className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-800">{SERVICE_LABEL[b.serviceType] ?? b.serviceType}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {b.scheduledAt ? formatDate(b.scheduledAt) : `Заявка від ${formatDate(b.createdAt)}`}
                  </p>
                </div>
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[b.status] ?? "bg-slate-100 text-slate-600"}`}>
                  {STATUS_LABEL[b.status] ?? b.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
