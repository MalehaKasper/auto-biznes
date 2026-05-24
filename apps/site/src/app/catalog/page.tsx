"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import type { CatalogListing } from "@/lib/api";

type TabType = "sale" | "wanted";

function ListingCard({ listing }: { listing: CatalogListing }) {
  const photo = listing.photos[0];
  const isUnavailable =
    listing.status === "SOLD" ||
    listing.status === "CLOSED" ||
    listing.status === "RESERVED";

  const statusLabel: Record<string, string> = {
    RESERVED: "Зарезервовано",
    SOLD: "Продано",
    CLOSED: "Закрито",
  };

  return (
    <Link
      href={`/catalog/${listing.id}`}
      className="block bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-colors"
    >
      <div className="relative h-48 bg-zinc-800">
        {photo ? (
          <img
            src={photo}
            alt={`${listing.make} ${listing.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-body normal-case">
            Фото відсутнє
          </div>
        )}
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="border border-zinc-700 text-zinc-300 px-3 py-1 text-xs font-heading uppercase tracking-wide">
              {statusLabel[listing.status] ?? listing.status}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-zinc-100">
          {listing.make} {listing.model}
        </h3>
        <p className="text-sm text-zinc-400 mt-1 font-body normal-case">
          {listing.type === "WANTED"
            ? `${listing.year}–${listing.yearMax ?? "..."} р.`
            : `${listing.year} р.`}
          {listing.mileage != null && ` · ${listing.mileage.toLocaleString()} км`}
          {listing.mileageMax != null &&
            listing.type === "WANTED" &&
            ` · до ${listing.mileageMax.toLocaleString()} км`}
        </p>
        {listing.price != null && (
          <p className="mt-2 font-heading text-accent text-lg">
            {listing.type === "WANTED" ? "до " : ""}
            {Number(listing.price).toLocaleString("uk-UA")} грн
          </p>
        )}
        <span className="mt-3 inline-block text-xs text-zinc-400 font-heading uppercase tracking-wider hover:text-accent transition-colors">
          Детальніше →
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ tab }: { tab: TabType }) {
  return (
    <div className="col-span-full text-center py-16 text-zinc-500 font-body normal-case">
      {tab === "sale"
        ? "Авто за вашими фільтрами не знайдено."
        : "Наразі немає активних запитів на викуп. Скористайтесь формою нижче."}
    </div>
  );
}

interface Filters {
  make: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
}

const inputClass = "w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors";
const labelClass = "block text-xs text-zinc-400 mb-1 font-body normal-case";

function CatalogPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = (searchParams.get("type") as TabType) ?? "sale";
  const [tab, setTab] = useState<TabType>(tabParam);

  const [filters, setFilters] = useState<Filters>({
    make: searchParams.get("make") ?? "",
    priceMin: searchParams.get("priceMin") ?? "",
    priceMax: searchParams.get("priceMax") ?? "",
    yearMin: searchParams.get("yearMin") ?? "",
    yearMax: searchParams.get("yearMax") ?? "",
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>(filters);

  const [listings, setListings] = useState<CatalogListing[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushParams = useCallback(
    (newTab: TabType, newFilters: Filters) => {
      const qs = new URLSearchParams();
      qs.set("type", newTab);
      if (newFilters.make) qs.set("make", newFilters.make);
      if (newFilters.priceMin) qs.set("priceMin", newFilters.priceMin);
      if (newFilters.priceMax) qs.set("priceMax", newFilters.priceMax);
      if (newFilters.yearMin) qs.set("yearMin", newFilters.yearMin);
      if (newFilters.yearMax) qs.set("yearMax", newFilters.yearMax);
      router.push(`/catalog?${qs.toString()}`, { scroll: false });
    },
    [router]
  );

  const load = useCallback(
    async (activeTab: TabType, activeFilters: Filters, cursor?: string) => {
      try {
        const res = await api.catalog.list({
          type: activeTab,
          cursor,
          make: activeFilters.make || undefined,
          priceMin: activeFilters.priceMin ? Number(activeFilters.priceMin) : undefined,
          priceMax: activeFilters.priceMax ? Number(activeFilters.priceMax) : undefined,
          yearMin: activeFilters.yearMin ? Number(activeFilters.yearMin) : undefined,
          yearMax: activeFilters.yearMax ? Number(activeFilters.yearMax) : undefined,
        });
        if (cursor) {
          setListings((prev) => [...prev, ...res.listings]);
        } else {
          setListings(res.listings);
        }
        setNextCursor(res.nextCursor);
      } catch {
        // ignore
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    setListings([]);
    setNextCursor(null);
    load(tab, appliedFilters);
  }, [tab, appliedFilters, load]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (key === "make") {
      debounceRef.current = setTimeout(() => {
        setAppliedFilters(newFilters);
        pushParams(tab, newFilters);
      }, 300);
    }
  };

  const handleNumericBlur = () => {
    setAppliedFilters(filters);
    pushParams(tab, filters);
  };

  const handleTabChange = (newTab: TabType) => {
    setTab(newTab);
    pushParams(newTab, filters);
  };

  const clearFilters = () => {
    const empty: Filters = { make: "", priceMin: "", priceMax: "", yearMin: "", yearMax: "" };
    setFilters(empty);
    setAppliedFilters(empty);
    pushParams(tab, empty);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const loadMore = () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    load(tab, appliedFilters, nextCursor);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-zinc-100 mb-2">Каталог авто</h1>
      <p className="text-zinc-400 mb-8 font-body normal-case">
        Авто на продаж та автомобілі, які ми шукаємо для викупу
      </p>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-zinc-800">
        <button
          onClick={() => handleTabChange("sale")}
          className={`px-5 py-2.5 text-xs font-heading uppercase tracking-wider border-b-2 -mb-px transition-colors ${
            tab === "sale"
              ? "border-accent text-accent"
              : "border-transparent text-zinc-500 hover:text-zinc-100"
          }`}
        >
          Продаж
        </button>
        <button
          onClick={() => handleTabChange("wanted")}
          className={`px-5 py-2.5 text-xs font-heading uppercase tracking-wider border-b-2 -mb-px transition-colors ${
            tab === "wanted"
              ? "border-accent text-accent"
              : "border-transparent text-zinc-500 hover:text-zinc-100"
          }`}
        >
          Викуп
        </button>
      </div>

      {/* Filter panel */}
      {tab === "sale" && (
        <div className="bg-zinc-800 border border-zinc-700 p-4 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Марка</label>
              <input
                type="text"
                value={filters.make}
                onChange={(e) => handleFilterChange("make", e.target.value)}
                placeholder="Toyota..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Ціна від</label>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                onBlur={handleNumericBlur}
                placeholder="0"
                min={0}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Ціна до</label>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                onBlur={handleNumericBlur}
                placeholder="∞"
                min={0}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Рік від</label>
              <input
                type="number"
                value={filters.yearMin}
                onChange={(e) => handleFilterChange("yearMin", e.target.value)}
                onBlur={handleNumericBlur}
                placeholder="1990"
                min={1900}
                max={2100}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Рік до</label>
              <input
                type="number"
                value={filters.yearMax}
                onChange={(e) => handleFilterChange("yearMax", e.target.value)}
                onBlur={handleNumericBlur}
                placeholder="2025"
                min={1900}
                max={2100}
                className={inputClass}
              />
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs text-zinc-500 hover:text-zinc-300 underline font-body normal-case"
            >
              Скинути фільтри
            </button>
          )}
        </div>
      )}

      {/* Wanted tab description */}
      {tab === "wanted" && !loading && listings.length > 0 && (
        <div className="border border-zinc-700 bg-zinc-800 p-4 mb-6 text-sm text-zinc-300 font-body normal-case">
          Нижче — авто, які ми активно шукаємо для купівлі. Якщо у вас є
          подібний автомобіль — натисніть "Є таке авто" і ми зв'яжемось з вами.
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-800 h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              listings.map((l) => <ListingCard key={l.id} listing={l} />)
            )}
          </div>

          {nextCursor && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="border border-zinc-700 text-zinc-300 font-heading text-xs uppercase tracking-wider px-8 py-3 hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
              >
                {loadingMore ? "Завантаження..." : "Завантажити ще"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Buyout evaluation form link */}
      {tab === "wanted" && !loading && (
        <div className="mt-12 border border-zinc-800 bg-zinc-900 p-6 text-center">
          <h2 className="font-heading text-lg text-zinc-100 mb-2">
            Хочете продати своє авто?
          </h2>
          <p className="text-zinc-400 text-sm mb-4 font-body normal-case">
            Залиште заявку — ми зв'яжемось і зробимо безкоштовну оцінку
          </p>
          <Link
            href="/catalog/evaluate"
            className="inline-block bg-accent text-zinc-950 font-heading text-sm uppercase tracking-wider px-6 py-2.5 hover:bg-accent-hover transition-colors"
          >
            Оцінити своє авто
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogPageInner />
    </Suspense>
  );
}
