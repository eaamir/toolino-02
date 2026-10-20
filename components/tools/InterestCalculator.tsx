"use client";

import { useState } from "react";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  const p = Number(principal) || 0;
  const r = Number(rate) || 0;
  const m = Number(months) || 0;

  const profit = p * (r / 100) * (m / 12);
  const total = p + profit;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("fa-IR").format(Math.round(value));
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-right shadow-xl"
    >
      <div className="grid gap-5">
        {/* اصل سرمایه */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            اصل سرمایه (تومان)
          </label>

          <input
            type="text"
            inputMode="numeric"
            dir="ltr"
            value={
              principal ? principal.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            onChange={(e) => setPrincipal(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="مثلاً 100,000,000"
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center outline-none transition focus:border-zinc-400"
          />

          <div className="mt-2 text-xs text-zinc-600">
            مبلغ را به تومان وارد کنید.
          </div>
        </div>

        {/* درصد سود */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            درصد سود سالانه
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              dir="ltr"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="مثلاً 20"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-16 text-center outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              درصد
            </span>
          </div>
        </div>

        {/* مدت */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">مدت</label>

          <div className="relative">
            <input
              type="number"
              min="1"
              dir="ltr"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="مثلاً 12"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-16 text-center outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              ماه
            </span>
          </div>
        </div>
      </div>

      {/* نتایج */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* سود */}
        <div className="rounded-2xl bg-zinc-950 p-5 text-right">
          <div className="text-sm text-zinc-500">سود</div>

          <div className="mt-2 text-2xl font-bold">{formatNumber(profit)}</div>

          <div className="mt-1 text-xs text-zinc-600">تومان</div>
        </div>

        {/* مبلغ نهایی */}
        <div className="rounded-2xl bg-zinc-950 p-5 text-right">
          <div className="text-sm text-zinc-500">مبلغ نهایی</div>

          <div className="mt-2 text-2xl font-bold">{formatNumber(total)}</div>

          <div className="mt-1 text-xs text-zinc-600">تومان</div>
        </div>
      </div>
    </div>
  );
}
