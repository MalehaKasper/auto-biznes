"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingWidget } from "../../components/BookingWidget";

function BookPageInner() {
  const params = useSearchParams();
  const service = params.get("service")?.toUpperCase() ?? undefined;
  return <BookingWidget initialService={service} />;
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <BookPageInner />
    </Suspense>
  );
}
