"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type CatalogListing } from "../../lib/api";

function formatPrice(price: string | null): string {
  if (!price) return "Ціна на запит";
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `$${num.toLocaleString("uk-UA")}`;
}

function VehicleCard({ listing }: { listing: CatalogListing }) {
  return (
    <Link
      href={`/catalog/${listing.id}`}
      className="flex-none w-64 sm:w-72 border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-colors group"
    >
      {listing.photos.length > 0 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={listing.photos[0]}
          alt={`${listing.make} ${listing.model}`}
          className="w-full h-40 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      ) : (
        <div className="w-full h-40 bg-zinc-800 flex items-center justify-center">
          <span className="text-zinc-600 text-4xl">🚗</span>
        </div>
      )}
      <div className="p-4">
        <p className="font-heading text-zinc-100 text-base">
          {listing.make} {listing.model}
        </p>
        <p className="text-zinc-400 text-xs mb-3 font-body normal-case tracking-normal">
          {listing.year} рік
          {listing.mileage ? ` · ${listing.mileage.toLocaleString()} км` : ""}
        </p>
        <p className="text-accent font-heading text-lg">{formatPrice(listing.price)}</p>
      </div>
    </Link>
  );
}

export function CatalogSlider() {
  const [listings, setListings] = useState<CatalogListing[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.catalog
      .list({ limit: 4 })
      .then(({ listings: data }) => {
        setListings(data.filter((l) => l.status === "AVAILABLE").slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && listings.length === 0) return null;

  return (
    <section className="py-16 px-4 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-zinc-100">
            Авто в продажу
          </h2>
          <Link
            href="/catalog"
            className="text-xs font-heading uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
          >
            Всі авто →
          </Link>
        </div>

        {!loaded ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-none w-64 sm:w-72 border border-zinc-800 bg-zinc-900 animate-pulse">
                <div className="w-full h-40 bg-zinc-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-zinc-800 w-3/4" />
                  <div className="h-3 bg-zinc-800 w-1/2" />
                  <div className="h-5 bg-zinc-800 w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {listings.map((l) => (
              <div key={l.id} style={{ scrollSnapAlign: "start" }}>
                <VehicleCard listing={l} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
