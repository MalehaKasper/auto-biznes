"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { CatalogListing } from "@/lib/api";

type InquiryType = "BUY" | "EXCHANGE" | "QUESTION" | "CALLBACK" | "EVALUATE";

interface FormState {
  phone: string;
  name: string;
  message: string;
  offeredPrice: string;
  tradeVehicleMake: string;
  tradeVehicleModel: string;
  tradeVehicleYear: string;
  tradeVehicleMileage: string;
  tradeVehiclePlate: string;
}

const EMPTY_FORM: FormState = {
  phone: "",
  name: "",
  message: "",
  offeredPrice: "",
  tradeVehicleMake: "",
  tradeVehicleModel: "",
  tradeVehicleYear: "",
  tradeVehicleMileage: "",
  tradeVehiclePlate: "",
};

const TYPE_LABELS: Record<InquiryType, string> = {
  BUY: "Купити",
  EXCHANGE: "Обмін",
  QUESTION: "Задати питання",
  CALLBACK: "Передзвоніть мені",
  EVALUATE: "Є таке авто",
};

const inputClass = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-zinc-400 mb-1 font-body normal-case";
const labelSmClass = "block text-xs text-zinc-400 mb-1 font-body normal-case";

function PhotoGallery({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(0);
  if (photos.length === 0) {
    return (
      <div className="h-72 bg-zinc-800 flex items-center justify-center text-zinc-500 font-body normal-case">
        Фото відсутнє
      </div>
    );
  }
  return (
    <div>
      <div className="h-72 overflow-hidden bg-zinc-800">
        <img
          src={photos[active]}
          alt="Фото авто"
          className="w-full h-full object-cover"
        />
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                i === active ? "border-accent" : "border-zinc-700"
              }`}
            >
              <img src={p} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InquiryForm({
  listing,
  type,
  onClose,
}: {
  listing: CatalogListing;
  type: InquiryType;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const needsTradeVehicle = type === "EXCHANGE" || type === "EVALUATE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        type,
        phone: form.phone,
        name: form.name,
        listingId: listing.id,
      };
      if (form.message) payload.message = form.message;
      if (type === "BUY" && form.offeredPrice)
        payload.offeredPrice = Number(form.offeredPrice);
      if (needsTradeVehicle) {
        payload.tradeVehicleMake = form.tradeVehicleMake;
        payload.tradeVehicleModel = form.tradeVehicleModel;
        if (form.tradeVehicleYear)
          payload.tradeVehicleYear = Number(form.tradeVehicleYear);
        if (form.tradeVehicleMileage)
          payload.tradeVehicleMileage = Number(form.tradeVehicleMileage);
        if (form.tradeVehiclePlate)
          payload.tradeVehiclePlate = form.tradeVehiclePlate;
      }
      await api.catalog.createInquiry(payload);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Помилка. Спробуйте ще раз.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-accent text-4xl mb-3">✓</div>
        <h3 className="font-heading text-lg text-zinc-100 mb-2">Заявку прийнято!</h3>
        <p className="text-zinc-400 text-sm mb-6 font-body normal-case">
          Ми зв'яжемось з вами найближчим часом.
        </p>
        <button
          onClick={onClose}
          className="bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider px-6 py-2.5 hover:bg-accent-hover transition-colors"
        >
          Закрити
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-heading text-lg text-zinc-100">{TYPE_LABELS[type]}</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Телефон *</label>
          <input type="tel" placeholder="+380XXXXXXXXX" value={form.phone} onChange={set("phone")} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ім'я *</label>
          <input type="text" placeholder="Ваше ім'я" value={form.name} onChange={set("name")} required className={inputClass} />
        </div>
      </div>

      {type === "BUY" && listing.bargainEnabled && (
        <div>
          <label className={labelClass}>Пропозиція ціни (грн)</label>
          <input
            type="number"
            placeholder={`Ціна продавця: ${Number(listing.price).toLocaleString("uk-UA")} грн`}
            value={form.offeredPrice}
            onChange={set("offeredPrice")}
            min={1}
            className={inputClass}
          />
        </div>
      )}

      {type === "QUESTION" && (
        <div>
          <label className={labelClass}>Питання *</label>
          <textarea
            placeholder="Ваше питання..."
            value={form.message}
            onChange={set("message")}
            required
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {needsTradeVehicle && (
        <div className="border border-zinc-700 bg-zinc-800 p-3 space-y-3">
          <p className="text-sm text-zinc-300 font-body normal-case">Ваше авто</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelSmClass}>Марка *</label>
              <input type="text" placeholder="Toyota" value={form.tradeVehicleMake} onChange={set("tradeVehicleMake")} required className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Модель *</label>
              <input type="text" placeholder="Camry" value={form.tradeVehicleModel} onChange={set("tradeVehicleModel")} required className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Рік</label>
              <input type="number" placeholder="2019" value={form.tradeVehicleYear} onChange={set("tradeVehicleYear")} min={1900} max={2100} className={inputClass} />
            </div>
            <div>
              <label className={labelSmClass}>Пробіг (км)</label>
              <input type="number" placeholder="85000" value={form.tradeVehicleMileage} onChange={set("tradeVehicleMileage")} min={0} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelSmClass}>Держномер</label>
            <input type="text" placeholder="AA1234BB" value={form.tradeVehiclePlate} onChange={set("tradeVehiclePlate")} className={inputClass} />
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-zinc-700 text-zinc-300 py-2.5 text-sm font-heading uppercase tracking-wide hover:border-zinc-500 transition-colors"
        >
          Скасувати
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-accent text-zinc-950 py-2.5 text-sm font-heading uppercase tracking-wide hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Надсилання..." : "Надіслати"}
        </button>
      </div>
    </form>
  );
}

export default function CatalogDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<CatalogListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeForm, setActiveForm] = useState<InquiryType | null>(null);

  useEffect(() => {
    api.catalog
      .getById(params.id)
      .then(setListing)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="h-72 bg-zinc-800 animate-pulse mb-6" />
        <div className="h-6 bg-zinc-800 w-1/2 animate-pulse mb-3" />
        <div className="h-4 bg-zinc-800 w-1/3 animate-pulse" />
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-zinc-400 mb-4 font-body normal-case">Лістинг не знайдено.</p>
        <button
          onClick={() => router.push("/catalog")}
          className="text-accent hover:text-accent-hover text-sm font-heading uppercase tracking-wide transition-colors"
        >
          ← Повернутись до каталогу
        </button>
      </div>
    );
  }

  const isUnavailable = listing.status === "SOLD" || listing.status === "CLOSED";
  const isReserved = listing.status === "RESERVED";

  const statusLabel: Record<string, string> = {
    RESERVED: "Зарезервовано",
    SOLD: "Продано",
    CLOSED: "Закрито",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => router.push("/catalog")}
        className="text-sm text-zinc-500 hover:text-zinc-200 mb-6 inline-block font-heading uppercase tracking-wide transition-colors"
      >
        ← Назад до каталогу
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PhotoGallery photos={listing.photos} />
        </div>

        <div>
          <div className="flex items-start justify-between mb-1">
            <h1 className="font-heading text-2xl text-zinc-100">
              {listing.make} {listing.model}
            </h1>
            {(isUnavailable || isReserved) && (
              <span className="ml-2 mt-1 text-xs border border-zinc-600 text-zinc-400 px-2.5 py-1 font-heading uppercase tracking-wide whitespace-nowrap">
                {statusLabel[listing.status]}
              </span>
            )}
          </div>

          <div className="text-zinc-400 text-sm mb-4 space-y-1 font-body normal-case">
            <p>
              Рік:{" "}
              {listing.type === "WANTED"
                ? `${listing.year}–${listing.yearMax ?? "..."}`
                : listing.year}
            </p>
            {listing.mileage != null && (
              <p>Пробіг: {listing.mileage.toLocaleString()} км</p>
            )}
            {listing.mileageMax != null && listing.type === "WANTED" && (
              <p>Пробіг: до {listing.mileageMax.toLocaleString()} км</p>
            )}
            {listing.price != null && (
              <p className="font-heading text-xl text-accent mt-2">
                {listing.type === "WANTED" ? "Бюджет до " : ""}
                {Number(listing.price).toLocaleString("uk-UA")} грн
              </p>
            )}
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-body normal-case">
            {listing.description}
          </p>

          {activeForm ? (
            <div className="border border-zinc-800 bg-zinc-900 p-5">
              <InquiryForm listing={listing} type={activeForm} onClose={() => setActiveForm(null)} />
            </div>
          ) : (
            <div className="space-y-2">
              {listing.type === "SALE" && (
                <>
                  <button
                    disabled={isUnavailable}
                    onClick={() => setActiveForm("BUY")}
                    className="w-full bg-accent text-zinc-950 py-3 font-heading text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Купити
                  </button>
                  {listing.bargainEnabled && !isUnavailable && (
                    <button
                      onClick={() => setActiveForm("BUY")}
                      className="w-full border border-accent text-accent py-2.5 font-heading text-sm uppercase tracking-wider hover:bg-accent/10 transition-colors"
                    >
                      Запропонувати ціну
                    </button>
                  )}
                  <button
                    disabled={isUnavailable}
                    onClick={() => setActiveForm("EXCHANGE")}
                    className="w-full border border-zinc-700 text-zinc-300 py-2.5 font-heading text-sm uppercase tracking-wider hover:border-zinc-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Обмін
                  </button>
                  <button
                    onClick={() => setActiveForm("QUESTION")}
                    className="w-full border border-zinc-700 text-zinc-300 py-2.5 font-heading text-sm uppercase tracking-wider hover:border-zinc-500 transition-colors"
                  >
                    Задати питання
                  </button>
                  <button
                    onClick={() => setActiveForm("CALLBACK")}
                    className="w-full border border-zinc-700 text-zinc-300 py-2.5 font-heading text-sm uppercase tracking-wider hover:border-zinc-500 transition-colors"
                  >
                    Передзвоніть мені
                  </button>
                </>
              )}

              {listing.type === "WANTED" && (
                <>
                  <button
                    onClick={() => setActiveForm("EVALUATE")}
                    className="w-full bg-accent text-zinc-950 py-3 font-heading text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors"
                  >
                    Є таке авто
                  </button>
                  <button
                    onClick={() => setActiveForm("CALLBACK")}
                    className="w-full border border-zinc-700 text-zinc-300 py-2.5 font-heading text-sm uppercase tracking-wider hover:border-zinc-500 transition-colors"
                  >
                    Передзвоніть мені
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
