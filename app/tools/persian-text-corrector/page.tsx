import PersianTextCorrector from "@/components/tools/PersianTextCorrector";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "اصلاح نیم‌فاصله و متن فارسی | تولینو",
  description:
    "اصلاح نیم‌فاصله، فاصله‌ها، حروف عربی و علائم نگارشی در متن فارسی.",
};

export default function PersianTextCorrectorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        <div dir="rtl" className="mb-10 text-center">
          <h1 className="text-4xl font-bold">اصلاح نیم‌فاصله و متن فارسی</h1>

          <p className="mt-3 text-zinc-400">
            متن فارسی خود را مرتب و استاندارد کنید.
          </p>
        </div>

        <PersianTextCorrector />
      </div>
    </main>
  );
}
