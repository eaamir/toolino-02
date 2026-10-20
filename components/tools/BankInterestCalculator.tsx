"use client";

import { useEffect, useRef, useState } from "react";
const formatMoney = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(Math.round(value));
};

export default function BankInterestCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("12");

  const [result, setResult] = useState<{
    monthlyProfit: number;
    yearlyProfit: number;
    totalProfit: number;
    finalAmount: number;
  } | null>(null);

  const calculate = () => {
    const principal = Number(amount.replace(/,/g, ""));

    const annualRate = Number(rate);
    const duration = Number(months);

    if (
      !principal ||
      principal <= 0 ||
      !annualRate ||
      annualRate <= 0 ||
      !duration ||
      duration <= 0
    ) {
      setResult(null);
      return;
    }

    // سود سالانه
    const yearlyProfit = principal * (annualRate / 100);

    // سود ماهانه
    const monthlyProfit = yearlyProfit / 12;

    // سود کل بر اساس مدت
    const totalProfit = monthlyProfit * duration;

    // اصل سرمایه + سود
    const finalAmount = principal + totalProfit;

    setResult({
      monthlyProfit,
      yearlyProfit,
      totalProfit,
      finalAmount,
    });
  };

  const handleAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, "");

    if (!cleanValue) {
      setAmount("");
      return;
    }

    setAmount(Number(cleanValue).toLocaleString("en-US"));
  };

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [result]);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      {/* فرم */}
      <div dir="rtl" className="grid gap-5">
        {/* مبلغ سپرده */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">مبلغ سپرده</label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="مثلاً 500,000,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-20 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* نرخ سود */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            نرخ سود سالانه
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
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-16 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              درصد
            </span>
          </div>
        </div>

        {/* مدت */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">مدت سپرده</label>

          <div className="relative">
            <input
              type="number"
              min="1"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              dir="ltr"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 pl-16 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              ماه
            </span>
          </div>
        </div>
      </div>

      {/* دکمه */}
      <button
        type="button"
        onClick={calculate}
        className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
      >
        محاسبه سود
      </button>

      {/* نتایج */}
      {result && (
        <div ref={resultRef} className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* سود ماهانه */}
            <div className="rounded-2xl bg-zinc-950 p-6 text-center">
              <div className="text-sm text-zinc-500">سود ماهانه</div>

              <div className="mt-3 text-2xl font-bold">
                {formatMoney(result.monthlyProfit)}
              </div>

              <div className="mt-1 text-xs text-zinc-600">تومان</div>
            </div>

            {/* سود سالانه */}
            <div className="rounded-2xl bg-zinc-950 p-6 text-center">
              <div className="text-sm text-zinc-500">سود سالانه</div>

              <div className="mt-3 text-2xl font-bold">
                {formatMoney(result.yearlyProfit)}
              </div>

              <div className="mt-1 text-xs text-zinc-600">تومان</div>
            </div>
          </div>

          {/* خلاصه */}
          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="text-zinc-400">مجموع سود</span>

              <span className="font-bold">
                {formatMoney(result.totalProfit)} تومان
              </span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-zinc-400">مبلغ نهایی</span>

              <span className="text-xl font-bold">
                {formatMoney(result.finalAmount)} تومان
              </span>
            </div>
          </div>

          {/* توضیح */}
          <div className="mt-5 rounded-2xl bg-zinc-950 p-5 text-sm leading-7 text-zinc-500">
            محاسبه بر اساس نرخ سود سالانه و سود ساده انجام شده است. در این
            محاسبه، سود ماهانه برابر با سود سالانه تقسیم بر ۱۲ در نظر گرفته شده
            است.
          </div>
        </div>
      )}
    </div>
  );
}
