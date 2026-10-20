"use client";

import { useState } from "react";

type ConvertMode = "digits" | "words";

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const englishDigits = "0123456789";

const ones = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];

const teens = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const tens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const hundreds = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

const scales = [
  "",
  "هزار",
  "میلیون",
  "میلیارد",
  "تریلیون",
  "کوادریلیون",
  "کوینتیلیون",
];

function toEnglishDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => {
    return String(persianDigits.indexOf(digit));
  });
}

function toPersianDigits(value: string) {
  return value.replace(/[0-9]/g, (digit) => {
    return persianDigits[Number(digit)];
  });
}

function threeDigitToWords(num: number): string {
  if (num === 0) return "";

  const parts: string[] = [];

  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundred > 0) {
    parts.push(hundreds[hundred]);
  }

  if (remainder > 0) {
    if (remainder < 10) {
      parts.push(ones[remainder]);
    } else if (remainder < 20) {
      parts.push(teens[remainder - 10]);
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;

      parts.push(tens[ten]);

      if (one > 0) {
        parts.push(ones[one]);
      }
    }
  }

  return parts.join(" و ");
}

function numberToPersianWords(value: string): string {
  const english = toEnglishDigits(value).replace(/,/g, "").trim();

  if (!/^\d+$/.test(english)) {
    return "";
  }

  const normalized = english.replace(/^0+/, "") || "0";

  if (normalized === "0") {
    return "صفر";
  }

  const groups: number[] = [];

  for (let i = normalized.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    groups.unshift(Number(normalized.slice(start, i)));
  }

  const result: string[] = [];

  groups.forEach((group, index) => {
    if (group === 0) return;

    const scaleIndex = groups.length - index - 1;
    const words = threeDigitToWords(group);

    if (scaleIndex > 0) {
      result.push(`${words} ${scales[scaleIndex]}`);
    } else {
      result.push(words);
    }
  });

  return result.join(" و ");
}

function formatNumber(value: string) {
  const english = toEnglishDigits(value).replace(/[^\d]/g, "");

  if (!english) return "";

  return Number(english).toLocaleString("en-US");
}

export default function NumberConverter() {
  const [mode, setMode] = useState<ConvertMode>("digits");

  const [input, setInput] = useState("");

  const [direction, setDirection] = useState<
    "persian-to-english" | "english-to-persian"
  >("persian-to-english");

  const [result, setResult] = useState("");

  const handleConvertDigits = () => {
    if (!input.trim()) {
      setResult("");
      return;
    }

    if (direction === "persian-to-english") {
      setResult(toEnglishDigits(input));
    } else {
      setResult(toPersianDigits(input));
    }
  };

  const handleConvertWords = () => {
    if (!input.trim()) {
      setResult("");
      return;
    }

    setResult(numberToPersianWords(input));
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
    >
      <div className="mx-auto max-w-3xl">
        {/* نوع تبدیل */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setMode("digits");
              setResult("");
            }}
            className={`rounded-2xl cursor-pointer px-4 py-4 text-sm font-medium transition ${
              mode === "digits"
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            فارسی ↔ انگلیسی
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("words");
              setResult("");
            }}
            className={`rounded-2xl cursor-pointer px-4 py-4 text-sm font-medium transition ${
              mode === "words"
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            عدد به حروف
          </button>
        </div>

        {/* تبدیل رقم */}
        {mode === "digits" && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDirection("persian-to-english")}
                className={`rounded-xl cursor-pointer px-4 py-3 text-sm transition ${
                  direction === "persian-to-english"
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                فارسی → انگلیسی
              </button>

              <button
                type="button"
                onClick={() => setDirection("english-to-persian")}
                className={`rounded-xl cursor-pointer px-4 py-3 text-sm transition ${
                  direction === "english-to-persian"
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                انگلیسی → فارسی
              </button>
            </div>

            <label className="mb-2 block text-sm text-zinc-400">عدد</label>

            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                direction === "persian-to-english" ? "۱۲۳۴۵۶۷۸۹" : "123456789"
              }
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-xl outline-none transition focus:border-zinc-400"
            />

            <button
              type="button"
              onClick={handleConvertDigits}
              className="mt-5 w-full cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
            >
              تبدیل
            </button>
          </>
        )}

        {/* عدد به حروف */}
        {mode === "words" && (
          <>
            <label className="mb-2 block text-sm text-zinc-400">عدد</label>

            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              value={input}
              onChange={(e) => setInput(formatNumber(e.target.value))}
              placeholder="مثلاً 1,250,000"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-xl outline-none transition focus:border-zinc-400"
            />

            <button
              type="button"
              onClick={handleConvertWords}
              className="mt-5 w-full cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
            >
              تبدیل به حروف
            </button>
          </>
        )}

        {/* نتیجه */}
        {result && (
          <div className="mt-8">
            <div className="mb-2 text-sm text-zinc-400">نتیجه</div>

            <div className="rounded-2xl bg-zinc-950 p-6 text-center">
              <div
                dir="rtl"
                className="break-words text-2xl font-bold leading-10"
              >
                {result}
              </div>
            </div>

            <button
              type="button"
              onClick={clear}
              className="mt-4 w-full cursor-pointer rounded-2xl bg-zinc-800 px-5 py-3 text-sm text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              پاک کردن
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
