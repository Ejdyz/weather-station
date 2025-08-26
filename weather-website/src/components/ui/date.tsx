"use client";
import { formatWeatherData } from "@/lib/utils";
import React, { Suspense } from 'react'
import { Skeleton } from "./skeleton";

export default function DateComponent({ date, type }: { date: Date | undefined, type: "date_full_numeric" | "date_short_numeric" | "date_short_written" | "time_short_numeric" }) {
  return (
    <Suspense fallback={<Skeleton />}>
      {formatWeatherData(type, date)}
    </Suspense>
  );
}
