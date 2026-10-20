"use client";

import { useMemo, useState } from "react";

export default function TextCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    // کلمات فارسی
    const persianWords =
      trimmedText.match(/[\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF]+/g) ||
      [];

    // کلمات انگلیسی
    const englishWords =
      trimmedText.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || [];

    // کل کلمات
    const allWords = trimmedText.match(/\S+/g) || [];

    // اعداد
    const numbers = text.match(/[0-9۰-۹]+/g) || [];

    // جمله‌ها
    const sentences = trimmedText.match(/[^.!?؟۔]+[.!?؟۔]+|[^.!?؟۔]+$/g) || [];

    // پاراگراف‌ها
    const paragraphs = trimmedText
      ? trimmedText.split(/\n\s*\n/).filter(Boolean)
      : [];

    // خطوط
    const lines = text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;

    // زمان خواندن
    // میانگین حدود 200 کلمه در دقیقه
    const readingSeconds =
      allWords.length > 0 ? Math.ceil((allWords.length / 200) * 60) : 0;

    // زمان نوشتن
    // میانگین حدود 40 کلمه در دقیقه
    const writingSeconds =
      allWords.length > 0 ? Math.ceil((allWords.length / 40) * 60) : 0;

    return {
      persianWords: persianWords.length,
      englishWords: englishWords.length,
      totalWords: allWords.length,

      characters: text.length,

      charactersWithoutSpaces: text.replace(/\s/g, "").length,

      numbers: numbers.length,

      sentences: sentences.length,

      paragraphs: paragraphs.length,

      lines,

      readingSeconds,

      writingSeconds,
    };
  }, [text]);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "۰ ثانیه";

    if (seconds < 60) {
      return `${seconds.toLocaleString("fa-IR")} ثانیه`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes.toLocaleString("fa-IR")} دقیقه`;
    }

    return `${minutes.toLocaleString(
      "fa-IR",
    )} دقیقه و ${remainingSeconds.toLocaleString("fa-IR")} ثانیه`;
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-right shadow-xl"
    >
      <div className="mx-auto max-w-3xl">
        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا وارد کنید..."
            dir="auto"
            className="min-h-70 w-full resize-y rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-base leading-8 outline-none transition placeholder:text-zinc-600 focus:border-zinc-400"
          />

          {text && (
            <button
              type="button"
              onClick={clearText}
              className="absolute left-4 top-4 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              پاک کردن
            </button>
          )}
        </div>

        {/* آمار اصلی */}
        <div className="mt-6">
          <div className="mb-3 text-sm font-medium text-zinc-400">آمار متن</div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="کلمات فارسی" value={stats.persianWords} />

            <StatCard title="کلمات انگلیسی" value={stats.englishWords} />

            <StatCard title="کل کلمات" value={stats.totalWords} />

            <StatCard title="تعداد جمله" value={stats.sentences} />

            <StatCard title="تعداد پاراگراف" value={stats.paragraphs} />

            <StatCard title="تعداد خطوط" value={stats.lines} />
          </div>
        </div>

        {/* کاراکترها */}
        <div className="mt-6">
          <div className="mb-3 text-sm font-medium text-zinc-400">
            کاراکترها
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard title="کاراکتر با فاصله" value={stats.characters} />

            <StatCard
              title="کاراکتر بدون فاصله"
              value={stats.charactersWithoutSpaces}
            />
          </div>
        </div>

        {/* زمان */}
        <div className="mt-6">
          <div className="mb-3 text-sm font-medium text-zinc-400">
            زمان تقریبی
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <TimeCard
              title="میانگین زمان خواندن"
              value={formatTime(stats.readingSeconds)}
            />

            <TimeCard
              title="میانگین زمان نوشتن"
              value={formatTime(stats.writingSeconds)}
            />
          </div>
        </div>

        {/* اعداد */}
        <div className="mt-6">
          <div className="rounded-2xl bg-zinc-950 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">تعداد اعداد</span>

              <span className="text-xl font-bold">
                {stats.numbers.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-5">
      <div className="text-sm text-zinc-500">{title}</div>

      <div className="mt-2 text-2xl font-bold">
        {value.toLocaleString("fa-IR")}
      </div>
    </div>
  );
}

function TimeCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-5">
      <div className="text-sm text-zinc-500">{title}</div>

      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}
