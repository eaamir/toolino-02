"use client";

import { useEffect, useRef, useState } from "react";
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

const formatJalali = (year: number, month: number, day: number) => {
  return `${toPersianDigits(day)} ${
    jalaliMonths[month - 1]
  } ${toPersianDigits(year)}`;
};

const formatGregorian = (year: number, month: number, day: number) => {
  return `${toPersianDigits(day)} ${
    gregorianMonths[month - 1]
  } ${toPersianDigits(year)}`;
};

const isValidGregorianDate = (year: number, month: number, day: number) => {
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const dateDifference = (birth: Date, today: Date) => {
  let years = today.getUTCFullYear() - birth.getUTCFullYear();

  let months = today.getUTCMonth() - birth.getUTCMonth();

  let days = today.getUTCDate() - birth.getUTCDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0),
    );

    days += previousMonth.getUTCDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const milliseconds = today.getTime() - birth.getTime();

  const totalDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
  };
};

export default function AgeCalculator() {
  const [type, setType] = useState<CalendarType>("jalali");

  const [birthDate, setBirthDate] = useState("");

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthday: string;
    daysUntilBirthday: number;
    birthJalali: string;
    birthGregorian: string;
  } | null>(null);

  const [error, setError] = useState("");

  const resultRef = useRef<HTMLDivElement>(null);

  const changeType = (newType: CalendarType) => {
    setType(newType);
    setBirthDate("");
    setResult(null);
    setError("");
  };

  const handlePickerChange = (value: DateObject | null) => {
    if (!value) return;

    const year = Number(value.year);
    const month = Number(value.month.number);
    const day = Number(value.day);

    setBirthDate(
      `${year}/${String(month).padStart(
        2,
        "0",
      )}/${String(day).padStart(2, "0")}`,
    );

    setResult(null);
    setError("");
  };

  const calculateAge = () => {
    setError("");
    setResult(null);

    const parts = birthDate.trim().replace(/-/g, "/").split("/").map(Number);

    if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) {
      setError("تاریخ تولد را به شکل صحیح وارد کنید.");
      return;
    }

    const [year, month, day] = parts;

    let gy: number;
    let gm: number;
    let gd: number;

    if (type === "jalali") {
      if (!isValidJalaaliDate(year, month, day)) {
        setError("تاریخ تولد شمسی معتبر نیست.");
        return;
      }

      const converted = toGregorian(year, month, day);

      gy = converted.gy;
      gm = converted.gm;
      gd = converted.gd;
    } else {
      if (!isValidGregorianDate(year, month, day)) {
        setError("تاریخ تولد میلادی معتبر نیست.");
        return;
      }

      gy = year;
      gm = month;
      gd = day;
    }

    const birth = new Date(Date.UTC(gy, gm - 1, gd));

    const today = new Date();

    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );

    if (birth > todayUTC) {
      setError("تاریخ تولد نمی‌تواند در آینده باشد.");
      return;
    }

    const age = dateDifference(birth, todayUTC);

    const birthJalali =
      type === "jalali"
        ? formatJalali(year, month, day)
        : (() => {
            const j = toJalaali(year, month, day);

            return formatJalali(j.jy, j.jm, j.jd);
          })();

    const birthGregorian = formatGregorian(gy, gm, gd);

    // تاریخ تولد بعدی
    const currentYear = today.getUTCFullYear();

    let birthday = new Date(Date.UTC(currentYear, gm - 1, gd));

    if (birthday < todayUTC) {
      birthday = new Date(Date.UTC(currentYear + 1, gm - 1, gd));
    }

    const daysUntilBirthday = Math.ceil(
      (birthday.getTime() - todayUTC.getTime()) / (1000 * 60 * 60 * 24),
    );

    const nextBirthdayJalali = toJalaali(
      birthday.getUTCFullYear(),
      birthday.getUTCMonth() + 1,
      birthday.getUTCDate(),
    );

    const nextBirthday = formatJalali(
      nextBirthdayJalali.jy,
      nextBirthdayJalali.jm,
      nextBirthdayJalali.jd,
    );

    setResult({
      years: age.years,
      months: age.months,
      days: age.days,
      totalDays: age.totalDays,
      nextBirthday,
      daysUntilBirthday,
      birthJalali,
      birthGregorian,
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
      {/* تقویم */}
      <div className="mx-auto mb-8 grid max-w-xl grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => changeType("jalali")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            type === "jalali"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          تاریخ شمسی
        </button>

        <button
          type="button"
          onClick={() => changeType("gregorian")}
          className={`rounded-xl cursor-pointer px-4 py-3 text-sm font-medium transition ${
            type === "gregorian"
              ? "bg-white text-black"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          تاریخ میلادی
        </button>
      </div>

      {/* تاریخ تولد */}
      <div className="mx-auto max-w-xl">
        <label className="mb-3 block text-sm text-zinc-400">تاریخ تولد</label>

        <div className="flex justify-center">
          {type === "jalali" ? (
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={birthDate}
              onChange={handlePickerChange}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              className="tolino-calendar"
              inputClass="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
              placeholder="مثلاً 1378/08/02"
            />
          ) : (
            <DatePicker
              calendar={gregorian}
              locale={gregorian_en}
              value={birthDate}
              onChange={handlePickerChange}
              format="YYYY/MM/DD"
              calendarPosition="bottom-center"
              className="tolino-calendar"
              inputClass="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-lg outline-none transition focus:border-zinc-400"
              placeholder="مثلاً 1999/10/24"
            />
          )}
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          تاریخ تولد را دستی وارد کنید یا از تقویم انتخاب کنید.
        </p>
      </div>

      {/* خطا */}
      {error && (
        <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* دکمه */}
      <button
        type="button"
        onClick={calculateAge}
        className="mx-auto cursor-pointer mt-6 block w-full max-w-xl rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
      >
        محاسبه سن
      </button>

      {/* نتیجه */}
      {result && (
        <div ref={resultRef} className="mx-auto mt-8 max-w-xl scroll-mt-24">
          {/* سن دقیق */}
          <div className="rounded-2xl bg-zinc-950 p-6 text-center">
            <div className="text-sm text-zinc-500">سن شما</div>

            <div className="mt-3 text-3xl font-bold">
              {toPersianDigits(result.years)} سال
              {" و "}
              {toPersianDigits(result.months)} ماه
              {" و "}
              {toPersianDigits(result.days)} روز
            </div>
          </div>

          {/* اطلاعات */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-950 p-5 text-right">
              <div className="text-sm text-zinc-500">تاریخ تولد شمسی</div>

              <div className="mt-2 text-lg font-bold">{result.birthJalali}</div>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-5 text-right">
              <div className="text-sm text-zinc-500">تاریخ تولد میلادی</div>

              <div className="mt-2 text-lg font-bold">
                {result.birthGregorian}
              </div>
            </div>
          </div>

          {/* روزهای زندگی */}
          <div className="mt-4 rounded-2xl bg-zinc-950 p-5 text-right">
            <div className="text-sm text-zinc-500">تعداد روزهای سپری‌شده</div>

            <div className="mt-2 text-2xl font-bold">
              {toPersianDigits(result.totalDays.toLocaleString("en-US"))} روز
            </div>
          </div>

          {/* تولد بعدی */}
          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-right">
            <div className="text-sm text-zinc-500">تولد بعدی</div>

            <div className="mt-2 text-xl font-bold">{result.nextBirthday}</div>

            <div className="mt-2 text-sm text-zinc-500">
              {result.daysUntilBirthday === 0
                ? "امروز تولد شماست 🎂"
                : `${toPersianDigits(
                    result.daysUntilBirthday,
                  )} روز تا تولد بعدی`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
