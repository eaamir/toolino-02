import Link from "next/link";
import BankInterestCalculator from "@/components/tools/BankInterestCalculator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "محاسبه سود بانکی | تولینو",
  description:
    "محاسبه آنلاین سود ماهانه و سالانه سپرده بانکی و مبلغ نهایی سرمایه.",
};

export default function BankInterestPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">محاسبه سود بانکی</h1>

          <p className="mt-3 text-zinc-400">
            سود سپرده، سود ماهانه و مبلغ نهایی سرمایه خود را محاسبه کنید.
          </p>
        </div>

        <BankInterestCalculator />
      </div>
    </main>
  );
}
