"use client";

import { useState } from "react";

const ZWNJ = "\u200C";

function convertArabicChars(text: string) {
  return text
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه");
}

function convertNumbersToPersian(text: string) {
  const numbers: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };

  return text.replace(/[0-9]/g, (char) => numbers[char]);
}

function fixSpaces(text: string) {
  return (
    text
      // فاصله‌های پشت سر هم
      .replace(/[ \t]+/g, " ")

      // فاصله قبل از علائم
      .replace(/\s+([،؛؟!:.])/g, "$1")

      // فاصله بعد از علائم
      .replace(/([،؛؟!:.])([^\s\n])/g, "$1 $2")

      // فاصله‌های قبل و بعد از پرانتز
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")")

      // حذف فاصله انتهای خطوط
      .replace(/[ \t]+$/gm, "")

      // بیشتر از یک خط خالی
      .replace(/\n{3,}/g, "\n\n")

      .trim()
  );
}

function fixHalfSpaces(text: string) {
  let result = text;

  // می روم / می‌روم
  result = result.replace(/\bمی\s+([^\s،؛؟!.]+)/g, `می${ZWNJ}$1`);

  // نمی روم / نمی‌روم
  result = result.replace(/\bنمی\s+([^\s،؛؟!.]+)/g, `نمی${ZWNJ}$1`);

  // می شود / می‌شود
  result = result.replace(/\bمی\s+شود\b/g, `می${ZWNJ}شود`);

  result = result.replace(/\bنمی\s+شود\b/g, `نمی${ZWNJ}شود`);

  // ها
  result = result.replace(/(\S+)\s+ها\b/g, `$1${ZWNJ}ها`);

  // های
  result = result.replace(/(\S+)\s+های\b/g, `$1${ZWNJ}های`);

  // تر
  result = result.replace(/(\S+)\s+تر\b/g, `$1${ZWNJ}تر`);

  // ترین
  result = result.replace(/(\S+)\s+ترین\b/g, `$1${ZWNJ}ترین`);

  // جمع‌های رایج
  result = result.replace(/(\S+)\s+ها\s+ی/g, `$1${ZWNJ}های`);

  return result;
}

function correctPersianText(text: string) {
  let result = text;

  result = convertArabicChars(result);

  result = fixHalfSpaces(result);

  result = fixSpaces(result);

  result = convertNumbersToPersian(result);

  return result;
}

export default function PersianTextCorrector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleCorrect = () => {
    if (!text.trim()) {
      setResult("");
      return;
    }

    setResult(correctPersianText(text));
  };

  const clearAll = () => {
    setText("");
    setResult("");
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
    >
      <div className="mx-auto max-w-4xl">
        {/* توضیح */}
        <div className="mb-6 text-right">
          <p className="text-sm leading-7 text-zinc-500">
            متن فارسی خود را وارد کنید تا فاصله‌ها، نیم‌فاصله‌ها و برخی حروف و
            علائم رایج به‌صورت خودکار اصلاح شوند.
          </p>
        </div>

        {/* ورودی */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">متن اولیه</label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="مثلاً: من می روم و کتاب های جدید را می خوانم..."
            className="min-h-60 w-full resize-y rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-right text-lg leading-9 outline-none transition focus:border-zinc-400"
          />
        </div>

        {/* دکمه‌ها */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleCorrect}
            className="flex-1 cursor-pointer rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
          >
            اصلاح متن
          </button>

          <button
            type="button"
            onClick={clearAll}
            className="rounded-2xl cursor-pointer bg-zinc-800 px-6 py-4 text-zinc-300 transition hover:bg-zinc-700"
          >
            پاک کردن
          </button>
        </div>

        {/* نتیجه */}
        {result && (
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-zinc-400">متن اصلاح‌شده</label>

              <button
                type="button"
                onClick={copyResult}
                className="text-sm text-zinc-500 transition hover:text-white"
              >
                کپی متن
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="whitespace-pre-wrap text-lg leading-9 text-zinc-100">
                {result}
              </p>
            </div>
          </div>
        )}

        {/* نمونه اصلاحات */}
        <div className="mt-8 rounded-2xl bg-zinc-950 p-5">
          <div className="mb-4 text-sm font-medium text-zinc-400">
            نمونه اصلاحات
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Example before="می رود" after="می‌رود" />

            <Example before="نمی شود" after="نمی‌شود" />

            <Example before="کتاب ها" after="کتاب‌ها" />

            <Example before="بهترین ترین" after="بهترین‌ترین" />

            <Example before="كاربرد" after="کاربرد" />

            <Example before="سلام ، خوبی ؟" after="سلام، خوبی؟" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Example({ before, after }: { before: string; after: string }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-4">
      <div className="text-sm text-zinc-500">قبل</div>

      <div className="mt-1 text-zinc-400">{before}</div>

      <div className="my-2 text-zinc-700">↓</div>

      <div className="text-sm text-zinc-500">بعد</div>

      <div className="mt-1 text-white">{after}</div>
    </div>
  );
}
