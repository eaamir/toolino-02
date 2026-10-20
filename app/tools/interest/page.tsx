import InterestCalculator from "@/components/tools/InterestCalculator";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "محاسبه سود و بهره | تولینو",
  description: "محاسبه آنلاین سود، بهره و مبلغ نهایی سرمایه",
};

export default function InterestPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">محاسبه سود و بهره</h1>

          <p className="mt-3 text-zinc-400">
            سرمایه، درصد سود و مدت را وارد کنید.
          </p>
        </div>

        <InterestCalculator />
      </div>
    </main>
  );
}
