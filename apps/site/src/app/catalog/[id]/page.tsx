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

function PhotoGallery({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(0);
  if (photos.length === 0) {
    return (
      <div className="h-72 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
        Фото відсутнє
      </div>
    );
  }
  return (
    <div>
      <div className="h-72 rounded-xl overflow-hidden bg-slate-100">
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
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                i === active ? "border-blue-700" : "border-transparent"
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
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Заявку прийнято!
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Ми зв'яжемось з вами найближчим часом.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800"
        >
          Закрити
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        {TYPE_LABELS[type]}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            placeholder="+380XXXXXXXXX"
            value={form.phone}
            onChange={set("phone")}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ім'я *
          </label>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={form.name}
            onChange={set("name")}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {type === "BUY" && listing.bargainEnabled && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Пропозиція ціни (грн)
          </label>
          <input
            type="number"
            placeholder={`Ціна продавця: ${Number(listing.price).toLocaleString("uk-UA")} грн`}
            value={form.offeredPrice}
            onChange={set("offeredPrice")}
            min={1}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {type === "QUESTION" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Питання *
          </label>
          <textarea
            placeholder="Ваше питання..."
            value={form.message}
            onChange={set("message")}
            required
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      )}

      {needsTradeVehicle && (
        <div className="border border-slate-200 rounded-lg p-3 space-y-3">
          <p className="text-sm font-medium text-slate-700">Ваше авто</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Марка *</label>
              <input
                type="text"
                placeholder="Toyota"
                value={form.tradeVehicleMake}
                onChange={set("tradeVehicleMake")}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Модель *</label>
              <input
                type="text"
                placeholder="Camry"
                value={form.tradeVehicleModel}
                onChange={set("tradeVehicleModel")}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Рік</label>
              <input
                type="number"
                placeholder="2019"
                value={form.tradeVehicleYear}
                onChange={set("tradeVehicleYear")}
                min={1900}
                max={2100}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Пробіг (км)</label>
              <input
                type="number"
                placeholder="85000"
                value={form.tradeVehicleMileage}
                onChange={set("tradeVehicleMileage")}
                min={0}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Держномер</label>
            <input
              type="text"
              placeholder="AA1234BB"
              value={form.tradeVehiclePlate}
              onChange={set("tradeVehiclePlate")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50"
        >
          Скасувати
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
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
        <div className="h-72 bg-slate-100 rounded-xl animate-pulse mb-6" />
        <div className="h-6 bg-slate-100 rounded w-1/2 animate-pulse mb-3" />
        <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse" />
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 mb-4">Лістинг не знайдено.</p>
        <button
          onClick={() => router.push("/catalog")}
          className="text-blue-700 hover:underline text-sm"
        >
          ← Повернутись до каталогу
        </button>
      </div>
    );
  }

  const isUnavailable =
    listing.status === "SOLD" || listing.status === "CLOSED";
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
        className="text-sm text-slate-500 hover:text-slate-800 mb-6 inline-block"
      >
        ← Назад до каталогу
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: photos */}
        <div>
          <PhotoGallery photos={listing.photos} />
        </div>

        {/* Right: details + actions */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {listing.make} {listing.model}
            </h1>
            {(isUnavailable || isReserved) && (
              <span className="ml-2 mt-1 text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                {statusLabel[listing.status]}
              </span>
            )}
          </div>

          <div className="text-slate-500 text-sm mb-4 space-y-1">
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
              <p className="text-xl font-bold text-blue-700 mt-2">
                {listing.type === "WANTED" ? "Бюджет до " : ""}
                {Number(listing.price).toLocaleString("uk-UA")} грн
              </p>
            )}
          </div>

          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            {listing.description}
          </p>

          {/* Action buttons */}
          {activeForm ? (
            <div className="border border-slate-200 rounded-xl p-5">
              <InquiryForm
                listing={listing}
                type={activeForm}
                onClose={() => setActiveForm(null)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              {listing.type === "SALE" && (
                <>
                  <button
                    disabled={isUnavailable}
                    onClick={() => setActiveForm("BUY")}
                    className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Купити
                  </button>
                  {listing.bargainEnabled && !isUnavailable && (
                    <button
                      onClick={() => setActiveForm("BUY")}
                      className="w-full border border-blue-700 text-blue-700 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                    >
                      Запропонувати ціну
                    </button>
                  )}
                  <button
                    disabled={isUnavailable}
                    onClick={() => setActiveForm("EXCHANGE")}
                    className="w-full border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Обмін
                  </button>
                  <button
                    onClick={() => setActiveForm("QUESTION")}
                    className="w-full border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Задати питання
                  </button>
                  <button
                    onClick={() => setActiveForm("CALLBACK")}
                    className="w-full border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Передзвоніть мені
                  </button>
                </>
              )}

              {listing.type === "WANTED" && (
                <>
                  <button
                    onClick={() => setActiveForm("EVALUATE")}
                    className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors"
                  >
                    Є таке авто
                  </button>
                  <button
                    onClick={() => setActiveForm("CALLBACK")}
                    className="w-full border border-slate-300 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors"
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
