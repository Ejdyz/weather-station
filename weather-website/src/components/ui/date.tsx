"use client";
import { formatDateToDisplayNumericFull } from "@/lib/utils";

import React, { Suspense } from 'react'

export default function DateComponent({ date }: { date: Date | string | undefined }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {formatDateToDisplayNumericFull(date)}
    </Suspense>
  );
}
