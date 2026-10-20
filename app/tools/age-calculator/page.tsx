import AgeCalculator from "@/components/tools/AgeCalculator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "محاسبه سن | تولینو",
  description: "محاسبه دقیق سن بر اساس تاریخ تولد شمسی یا میلادی.",
};

export default function AgeCalculatorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">محاسبه سن</h1>

          <p className="mt-3 text-zinc-400">
            سن دقیق خود را بر اساس تاریخ تولد محاسبه کنید.
          </p>
        </div>

        <AgeCalculator />
      </div>
    </main>
  );
}
