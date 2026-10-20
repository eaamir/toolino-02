import TextCounter from "@/components/tools/TextCounter";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "شمارش کلمات و کاراکتر | تولینو",
  description: "شمارش کلمات فارسی و انگلیسی، کاراکترها، اعداد و خطوط متن.",
};

export default function TextCounterPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">شمارش کلمات و کاراکتر</h1>

          <p className="mt-3 text-zinc-400">
            تعداد کلمات فارسی و انگلیسی، کاراکترها و خطوط متن را محاسبه کنید.
          </p>
        </div>

        <TextCounter />
      </div>
    </main>
  );
}
