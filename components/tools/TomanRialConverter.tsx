"use client";

import { useState } from "react";

export default function TomanRialConverter() {
  const [value, setValue] = useState("");
  const [type, setType] = useState<"toman" | "rial">("toman");

  const numericValue = Number(value.replace(/,/g, "")) || 0;

  const toman = type === "toman" ? numericValue : numericValue / 10;

  const rial = type === "rial" ? numericValue : numericValue * 10;

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("fa-IR").format(number);
  };

  return (
    <div className="rounded-3xl border mt-10 border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setType("toman")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            type === "toman"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          تومان
        </button>

        <button
          onClick={() => setType("rial")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            type === "rial"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ریال
        </button>
      </div>

      <label dir="rtl" className="mb-2 block text-sm text-zinc-400">
        مبلغ
      </label>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ""))}
        placeholder="مثلاً 1000000"
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-zinc-950 p-5">
          <div className="text-sm text-zinc-500">تومان</div>

          <div className="mt-2 text-2xl font-bold">{formatNumber(toman)}</div>
        </div>

        <div className="rounded-2xl bg-zinc-950 p-5">
          <div className="text-sm text-zinc-500">ریال</div>

          <div className="mt-2 text-2xl font-bold">{formatNumber(rial)}</div>
        </div>
      </div>
    </div>
  );
}
