import SalaryCalculator from "@/components/tools/SalaryCalculator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "محاسبه حقوق و دستمزد | تولینو",
  description: "محاسبه حقوق ناخالص، بیمه، مالیات، کسورات و حقوق خالص دریافتی.",
};

export default function SalaryCalculatorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">محاسبه حقوق و دستمزد</h1>

          <p className="mt-3 text-zinc-400">
            حقوق ناخالص، بیمه، مالیات و حقوق خالص دریافتی را محاسبه کنید.
          </p>
        </div>

        <SalaryCalculator />
      </div>
    </main>
  );
}
