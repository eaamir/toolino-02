"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DateObject from "react-date-object";

import { toGregorian, toJalaali, isValidJalaaliDate } from "jalaali-js";

type CalendarType = "jalali" | "gregorian";

const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const gregorianMonths = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

const toPersianDigits = (value: string | number) => {
  return String(value).replace(/\d/g, (digit) => {
    return "۰۱۲۳۴۵۶۷۸۹"[Number(digit)];
  });
};

const isValidGregorianDate = (year: number, month: number, day: number) => {
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const formatPersianDate = (year: number, month: number, day: number) => {
  return `${toPersianDigits(day)} ${
    jalaliMonths[month - 1]
  } ${toPersianDigits(year)}`;
};

const formatGregorianDate = (year: number, month: number, day: number) => {
  return `${toPersianDigits(day)} ${
    gregorianMonths[month - 1]
  } ${toPersianDigits(year)}`;
};

const formatInputDate = (year: number, month: number, day: number) => {
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
    2,
    "0",
  )}`;
};

export default function DateConverter() {
  const [type, setType] = useState<CalendarType>("jalali");

  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState<{
    jalali: string;
    gregorian: string;
  } | null>(null);

  const convertDate = () => {
    setError("");
    setResult(null);

    const parts = date.trim().replace(/-/g, "/").split("/").map(Number);

    if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) {
      setError(
        type === "jalali"
          ? "تاریخ را مثل 1378/08/02 وارد کنید."
          : "تاریخ را مثل 1999/10/24 وارد کنید.",
      );
      return;
    }

    const [year, month, day] = parts;

    if (type === "jalali") {
      if (!isValidJalaaliDate(year, month, day)) {
        setError("تاریخ شمسی وارد شده معتبر نیست.");
        return;
      }

      const { gy, gm, gd } = toGregorian(year, month, day);

      setResult({
        jalali: formatPersianDate(year, month, day),
        gregorian: formatGregorianDate(gy, gm, gd),
      });

      return;
    }

    if (!isValidGregorianDate(year, month, day)) {
      setError("تاریخ میلادی وارد شده معتبر نیست.");
      return;
    }

    const { jy, jm, jd } = toJalaali(year, month, day);

    setResult({
      jalali: formatPersianDate(jy, jm, jd),
      gregorian: formatGregorianDate(year, month, day),
    });
  };

  const handlePickerChange = (value: DateObject | null) => {
    if (!value) return;

    const year = Number(value.year);
    const month = Number(value.month.number);
    const day = Number(value.day);

    setDate(formatInputDate(year, month, day));

    setError("");
    setResult(null);
  };

  const changeType = (newType: CalendarType) => {
    setType(newType);
    setDate("");
    setResult(null);
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      {/* نوع تبدیل */}
      <div className="mx-auto mb-8 grid max-w-xl grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => changeType("jalali")}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            type === "jalali"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          شمسی → میلادی
        </button>

        <button
          type="button"
          onClick={() => changeType("gregorian")}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
            type === "gregorian"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          میلادی → شمسی
        </button>
      </div>

      {/* Date Picker */}
      <div className="flex flex-col items-center">
        <label className="mb-3 text-sm text-zinc-400">
          {type === "jalali" ? "تاریخ شمسی" : "تاریخ میلادی"}
        </label>

        <div className="flex w-full justify-center">
          {type === "jalali" ? (
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={date}
              onChange={handlePickerChange}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              className="tolino-calendar"
              inputClass="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
              placeholder="1378/08/02"
            />
          ) : (
            <DatePicker
              calendar={gregorian}
              locale={gregorian_en}
              value={date}
              onChange={handlePickerChange}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              className="tolino-calendar"
              inputClass="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
              placeholder="1999/10/24"
            />
          )}
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          تاریخ را دستی وارد کنید یا از تقویم انتخاب کنید.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Convert */}
      <button
        type="button"
        onClick={convertDate}
        className="mx-auto mt-6 block w-full max-w-sm rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
      >
        تبدیل تاریخ
      </button>

      {/* Result */}
      {result && (
        <div
          dir="rtl"
          className="mx-auto mt-8 grid max-w-xl gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl bg-zinc-950 p-6 text-center">
            <div className="text-sm text-zinc-500">تاریخ شمسی</div>

            <div className="mt-3 text-2xl font-bold">{result.jalali}</div>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-6 text-center">
            <div className="text-sm text-zinc-500">تاریخ میلادی</div>

            <div className="mt-3 text-2xl font-bold">{result.gregorian}</div>
          </div>
        </div>
      )}
    </div>
  );
}
