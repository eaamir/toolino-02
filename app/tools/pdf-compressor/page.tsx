import PdfCompressor from "@/components/tools/PdfCompressor";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "فشرده‌سازی PDF | تولینو",
  description: "کاهش حجم فایل PDF با حفظ کیفیت مناسب.",
};

export default function PdfCompressorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">فشرده‌سازی PDF</h1>

          <p className="mt-3 text-zinc-400">
            حجم فایل PDF خود را کاهش دهید و فایل بهینه‌تری دریافت کنید.
          </p>
        </div>

        <PdfCompressor />
      </div>
    </main>
  );
}
