import Link from "next/link";
import DateConverter from "@/components/tools/DateConverter";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "تبدیل تاریخ شمسی به میلادی و میلادی به شمسی | تولینو",
  description:
    "تبدیل آنلاین تاریخ شمسی به میلادی و میلادی به شمسی با ابزار رایگان تولینو.",
};

export default function DateConverterPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">تبدیل تاریخ شمسی و میلادی</h1>

          <p className="mt-3 text-zinc-400">
            تاریخ شمسی یا میلادی خود را وارد کنید.
          </p>
        </div>

        <DateConverter />
      </div>
    </main>
  );
}
