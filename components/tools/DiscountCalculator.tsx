"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "discount" | "reverse";

export default function DiscountCalculator() {
  const [mode, setMode] = useState<Mode>("discount");

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
    originalPrice?: number;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("fa-IR").format(Math.round(value));
  };

  const handlePriceChange = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, "");

    if (!cleanValue) {
      setPrice("");
      return;
    }

    setPrice(Number(cleanValue).toLocaleString("en-US"));
  };

  const calculate = () => {
    const value = Number(price.replace(/,/g, ""));
    const rate = Number(discount);

    if (!value || value <= 0 || !rate || rate <= 0 || rate >= 100) {
      setResult(null);
      return;
    }

    if (mode === "discount") {
      const discountAmount = value * (rate / 100);
      const finalPrice = value - discountAmount;

      setResult({
        discountAmount,
        finalPrice,
      });

      return;
    }

    // محاسبه قیمت اصلی از روی قیمت نهایی
    const originalPrice = value / (1 - rate / 100);
    const discountAmount = originalPrice - value;

    setResult({
      discountAmount,
      finalPrice: value,
      originalPrice,
    });
  };

  useEffect(() => {
    if (!result) return;

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }, [result]);

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setPrice("");
    setDiscount("");
    setResult(null);
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-right shadow-xl"
    >
      {/* حالت محاسبه */}
      <div className="mx-auto mb-8 grid max-w-xl grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => changeMode("discount")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            mode === "discount"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          محاسبه قیمت تخفیف‌خورده
        </button>

        <button
          type="button"
          onClick={() => changeMode("reverse")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            mode === "reverse"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          محاسبه قیمت اصلی
        </button>
      </div>

      <div className="mx-auto max-w-xl">
        {/* قیمت */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            {mode === "discount" ? "قیمت اصلی" : "قیمت نهایی"}
          </label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder={
                mode === "discount" ? "مثلاً 1,500,000" : "مثلاً 1,200,000"
              }
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-20 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* درصد تخفیف */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">درصد تخفیف</label>

          <div className="relative">
            <input
              type="number"
              min="0"
              max="99.99"
              step="0.01"
              dir="ltr"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="مثلاً 20"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-16 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              درصد
            </span>
          </div>
        </div>

        {/* دکمه */}
        <button
          type="button"
          onClick={calculate}
          className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
        >
          محاسبه تخفیف
        </button>
      </div>

      {/* نتیجه */}
      {result && (
        <div ref={resultRef} className="mx-auto mt-8 max-w-xl scroll-mt-24">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* مبلغ تخفیف */}
            <div className="rounded-2xl bg-zinc-950 p-6 text-right">
              <div className="text-sm text-zinc-500">مبلغ تخفیف</div>

              <div className="mt-3 text-2xl font-bold">
                {formatNumber(result.discountAmount)}
              </div>

              <div className="mt-1 text-xs text-zinc-600">تومان</div>
            </div>

            {/* قیمت نهایی / اصلی */}
            <div className="rounded-2xl bg-zinc-950 p-6 text-right">
              <div className="text-sm text-zinc-500">
                {mode === "discount" ? "قیمت نهایی" : "قیمت اصلی"}
              </div>

              <div className="mt-3 text-2xl font-bold">
                {formatNumber(
                  mode === "discount"
                    ? result.finalPrice
                    : (result.originalPrice ?? 0),
                )}
              </div>

              <div className="mt-1 text-xs text-zinc-600">تومان</div>
            </div>
          </div>

          {/* خلاصه */}
          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-sm leading-7 text-zinc-500">
              {mode === "discount"
                ? `با اعمال ${formatNumber(
                    Number(discount),
                  )}٪ تخفیف، قیمت کالا از ${formatNumber(
                    Number(price.replace(/,/g, "")),
                  )} تومان به ${formatNumber(result.finalPrice)} تومان می‌رسد.`
                : `قیمت ${formatNumber(
                    Number(price.replace(/,/g, "")),
                  )} تومان پس از ${formatNumber(
                    Number(discount),
                  )}٪ تخفیف، مربوط به قیمت اصلی حدود ${formatNumber(
                    result.originalPrice ?? 0,
                  )} تومان است.`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
