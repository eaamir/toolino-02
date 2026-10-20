import Link from "next/link";
import DiscountCalculator from "@/components/tools/DiscountCalculator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "محاسبه تخفیف | تولینو",
  description: "محاسبه آنلاین مبلغ تخفیف، قیمت نهایی و قیمت اصلی کالا.",
};

export default function DiscountPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">محاسبه تخفیف</h1>

          <p className="mt-3 text-zinc-400">
            مبلغ تخفیف و قیمت نهایی کالا را محاسبه کنید.
          </p>
        </div>

        <DiscountCalculator />
      </div>
    </main>
  );
}
