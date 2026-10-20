"use client";

import { useEffect, useRef, useState } from "react";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(Math.round(value));

const parseNumber = (value: string) =>
  Number(value.replace(/,/g, "").replace(/[^\d]/g, "")) || 0;

const formatInput = (value: string) => {
  const number = parseNumber(value);
  return number ? number.toLocaleString("en-US") : "";
};

export default function SalaryCalculator() {
  const [baseSalary, setBaseSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [overtime, setOvertime] = useState("");
  const [deductions, setDeductions] = useState("");

  const [insuranceRate, setInsuranceRate] = useState("7");
  const [taxRate, setTaxRate] = useState("10");

  const [result, setResult] = useState<{
    gross: number;
    insurance: number;
    tax: number;
    deductions: number;
    net: number;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const salary = parseNumber(baseSalary);
    const benefitsAmount = parseNumber(benefits);
    const overtimeAmount = parseNumber(overtime);
    const otherDeductions = parseNumber(deductions);

    const insurancePercent = Number(insuranceRate) || 0;
    const taxPercent = Number(taxRate) || 0;

    const gross = salary + benefitsAmount + overtimeAmount;

    const insurance = gross * (insurancePercent / 100);

    const taxableIncome = Math.max(0, gross - insurance);

    const tax = taxableIncome * (taxPercent / 100);

    const totalDeductions = insurance + tax + otherDeductions;

    const net = gross - totalDeductions;

    setResult({
      gross,
      insurance,
      tax,
      deductions: totalDeductions,
      net,
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

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-right shadow-xl"
    >
      <div className="mx-auto max-w-xl">
        {/* حقوق پایه */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">حقوق پایه</label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={baseSalary}
              onChange={(e) => setBaseSalary(formatInput(e.target.value))}
              placeholder="30,000,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-20 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* مزایا */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">
            مزایا و پرداختی‌ها
          </label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={benefits}
              onChange={(e) => setBenefits(formatInput(e.target.value))}
              placeholder="5,000,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-20 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* اضافه کاری */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">اضافه‌کاری</label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={overtime}
              onChange={(e) => setOvertime(formatInput(e.target.value))}
              placeholder="3,000,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-20 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* بیمه */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">
            درصد بیمه سهم کارمند
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              dir="ltr"
              value={insuranceRate}
              onChange={(e) => setInsuranceRate(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-16 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              ٪
            </span>
          </div>
        </div>

        {/* مالیات */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">نرخ مالیات</label>

          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              dir="ltr"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-16 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              ٪
            </span>
          </div>
        </div>

        {/* سایر کسورات */}
        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">
            سایر کسورات
          </label>

          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={deductions}
              onChange={(e) => setDeductions(formatInput(e.target.value))}
              placeholder="500,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-20 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
            />

            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              تومان
            </span>
          </div>
        </div>

        {/* دکمه */}
        <button
          type="button"
          onClick={calculate}
          className="mt-6 w-full cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
        >
          محاسبه حقوق
        </button>
      </div>

      {/* نتیجه */}
      {result && (
        <div ref={resultRef} className="mx-auto mt-8 max-w-xl scroll-mt-24">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard title="حقوق ناخالص" value={result.gross} />

            <ResultCard title="بیمه" value={result.insurance} />

            <ResultCard title="مالیات" value={result.tax} />

            <ResultCard title="جمع کسورات" value={result.deductions} />
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-center">
            <div className="text-sm text-zinc-500">حقوق خالص دریافتی</div>

            <div className="mt-3 text-3xl font-bold">
              {formatNumber(result.net)}
            </div>

            <div className="mt-1 text-xs text-zinc-600">تومان</div>
          </div>

          <div className="mt-4 rounded-2xl bg-zinc-950 p-5 text-sm leading-7 text-zinc-500">
            این محاسبه بر اساس مقادیر واردشده انجام شده و برای برآورد تقریبی
            حقوق است. قوانین بیمه، مالیات، معافیت‌ها و مزایا ممکن است بر اساس
            سال و شرایط استخدام متفاوت باشند.
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-5 text-right">
      <div className="text-sm text-zinc-500">{title}</div>

      <div className="mt-2 text-2xl font-bold">{formatNumber(value)}</div>

      <div className="mt-1 text-xs text-zinc-600">تومان</div>
    </div>
  );
}
