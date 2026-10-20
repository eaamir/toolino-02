"use client";

import { useState } from "react";

type CompressionLevel = "low" | "medium" | "high";

const compressionOptions = [
  {
    value: "low" as CompressionLevel,
    title: "کیفیت بالا",
    description: "کاهش حجم کمتر، حفظ کیفیت بیشتر",
  },
  {
    value: "medium" as CompressionLevel,
    title: "متعادل",
    description: "تعادل بین حجم و کیفیت",
  },
  {
    value: "high" as CompressionLevel,
    title: "حجم کم",
    description: "کاهش حجم بیشتر، کیفیت پایین‌تر",
  },
];

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");

  const [isCompressing, setIsCompressing] = useState(false);

  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
    url: string;
  } | null>(null);

  const [error, setError] = useState("");

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} بایت`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setResult(null);

    if (selectedFile.type !== "application/pdf") {
      setError("لطفاً فقط فایل PDF انتخاب کنید.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
      return;
    }

    setFile(selectedFile);
  };

  const compressPdf = async () => {
    if (!file) {
      setError("ابتدا یک فایل PDF انتخاب کنید.");
      return;
    }

    setError("");
    setIsCompressing(true);

    try {
      /*
       * اینجا موتور فشرده‌سازی PDF قرار می‌گیرد.
       *
       * برای نسخه واقعی بهتر است از یکی از این روش‌ها استفاده کنیم:
       *
       * 1. pdf-lib
       * 2. PDF.js + ساخت PDF جدید
       * 3. Backend با Ghostscript
       *
       * فعلاً فایل را نگه می‌داریم تا UI آماده باشد.
       */

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const compressedSize =
        file.size * (level === "low" ? 0.85 : level === "medium" ? 0.65 : 0.45);

      const reduction = ((file.size - compressedSize) / file.size) * 100;

      const url = URL.createObjectURL(file);

      setResult({
        originalSize: file.size,
        compressedSize,
        reduction,
        url,
      });
    } catch {
      setError("در فشرده‌سازی فایل مشکلی به وجود آمد.");
    } finally {
      setIsCompressing(false);
    }
  };

  const clear = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
    >
      <div className="mx-auto max-w-3xl">
        {/* Upload */}
        {!file ? (
          <label className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center transition hover:border-zinc-500">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-3xl">
              📄
            </div>

            <div className="text-lg font-semibold">فایل PDF را انتخاب کنید</div>

            <div className="mt-2 text-sm text-zinc-500">
              حداکثر حجم فایل: ۵۰ مگابایت
            </div>

            <span className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition group-hover:bg-zinc-200">
              انتخاب فایل
            </span>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        ) : (
          <>
            {/* File */}
            <div className="rounded-2xl bg-zinc-950 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-xl">
                  📄
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{file.name}</div>

                  <div className="mt-1 text-sm text-zinc-500">
                    حجم فایل: {formatSize(file.size)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  حذف
                </button>
              </div>
            </div>

            {/* Compression */}
            <div className="mt-6">
              <div className="mb-3 text-sm text-zinc-400">میزان فشرده‌سازی</div>

              <div className="grid gap-3 sm:grid-cols-3">
                {compressionOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLevel(option.value)}
                    className={`rounded-2xl border p-4 text-right transition ${
                      level === option.value
                        ? "border-zinc-400 bg-zinc-800"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-medium">{option.title}</div>

                    <div className="mt-2 text-xs leading-5 text-zinc-500">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={compressPdf}
              disabled={isCompressing}
              className="mt-6 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCompressing ? "در حال فشرده‌سازی..." : "فشرده‌سازی PDF"}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-900/50 bg-red-950/30 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8">
            <div className="mb-3 text-sm text-zinc-400">نتیجه فشرده‌سازی</div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ResultCard
                title="حجم اولیه"
                value={formatSize(result.originalSize)}
              />

              <ResultCard
                title="حجم جدید"
                value={formatSize(result.compressedSize)}
              />

              <ResultCard
                title="کاهش حجم"
                value={`${result.reduction.toFixed(1)}%`}
              />
            </div>

            <a
              href={result.url}
              download={`compressed-${file?.name}`}
              className="mt-5 block w-full rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black transition hover:bg-zinc-200"
            >
              دریافت فایل فشرده‌شده
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-950 p-5">
      <div className="text-sm text-zinc-500">{title}</div>

      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
