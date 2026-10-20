import InvoiceGenerator from "@/components/tools/InvoiceGenerator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "ساخت فاکتور | تولینو",
  description:
    "ساخت فاکتور ساده و حرفه‌ای آنلاین با محاسبه خودکار مبلغ و تخفیف.",
};

export default function InvoiceGeneratorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">ساخت فاکتور</h1>

          <p className="mt-3 text-zinc-400">
            فاکتور ساده خود را بسازید و برای چاپ یا ذخیره به PDF آماده کنید.
          </p>
        </div>

        <InvoiceGenerator />
      </div>
    </main>
  );
}
