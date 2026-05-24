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
  PENDING: "border-accent text-accent",
  CONFIRMED: "border-blue-400 text-blue-400",
  IN_PROGRESS: "border-accent-alt text-accent-alt",
  COMPLETED: "border-emerald-400 text-emerald-400",
  CANCELLED: "border-red-400 text-red-400",
};

const SERVICE_LABEL: Record<string, string> = {
  STO: "СТО",
  TIRE: "Шиномонтаж",
  TIRE_STORAGE: "Зберігання шин",
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

const inputClass = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-zinc-400 mb-1 font-body normal-case";

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
          <div className="h-8 bg-zinc-800 w-1/3" />
          <div className="h-40 bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="font-heading text-2xl text-zinc-100 mb-8">Мій профіль</h1>

      <div className="border border-zinc-800 bg-zinc-900 p-6 mb-8">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={labelClass}>Телефон</label>
            <p className="text-zinc-100 font-mono text-sm px-4 py-2.5 bg-zinc-800 border border-zinc-700">
              {profile.phone}
            </p>
          </div>

          <div>
            <label className={labelClass}>Ім'я</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше ім'я" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" className={inputClass} />
          </div>

          {saveError && <p className="text-red-400 text-sm">{saveError}</p>}
          {saved && <p className="text-emerald-400 text-sm">Збережено</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-zinc-950 font-heading text-xs uppercase tracking-wider px-6 py-2.5 hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {saving ? "Збереження..." : "Зберегти"}
          </button>
        </form>
      </div>

      <h2 className="font-heading text-lg text-zinc-100 mb-4">Мої записи</h2>
      {profile.bookings.length === 0 ? (
        <div className="border border-dashed border-zinc-700 py-10 text-center text-zinc-500 text-sm font-body normal-case">
          <p>У вас ще немає записів</p>
          <Link href="/book" className="text-accent font-heading text-xs uppercase tracking-wider mt-2 inline-block hover:text-accent-hover transition-colors">
            Записатись на сервіс →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.bookings.map((b) => (
            <Link
              key={b.id}
              href={`/book/${b.id}`}
              className="block border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-zinc-100 text-sm">{SERVICE_LABEL[b.serviceType] ?? b.serviceType}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 font-body normal-case">
                    {b.scheduledAt ? formatDate(b.scheduledAt) : `Заявка від ${formatDate(b.createdAt)}`}
                  </p>
                </div>
                <span className={`shrink-0 text-xs border px-2.5 py-1 font-heading uppercase tracking-wide whitespace-nowrap ${STATUS_COLOR[b.status] ?? "border-zinc-600 text-zinc-400"}`}>
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
