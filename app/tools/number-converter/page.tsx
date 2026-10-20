import NumberConverter from "@/components/tools/NumberConverter";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "تبدیل اعداد فارسی و انگلیسی | تولینو",
  description:
    "تبدیل عدد فارسی به انگلیسی، عدد انگلیسی به فارسی و تبدیل اعداد به حروف فارسی.",
};

export default function NumberConverterPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">تبدیل اعداد فارسی و انگلیسی</h1>

          <p className="mt-3 text-zinc-400">
            اعداد فارسی و انگلیسی را تبدیل کنید یا عدد را به حروف فارسی بنویسید.
          </p>
        </div>

        <NumberConverter />
      </div>
    </main>
  );
}
