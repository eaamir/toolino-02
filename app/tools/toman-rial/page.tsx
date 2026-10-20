import TomanRialConverter from "@/components/tools/TomanRialConverter";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "تبدیل تومان به ریال و ریال به تومان | تولینو",
  description:
    "تبدیل سریع تومان به ریال و ریال به تومان با ابزار آنلاین تولینو.",
};

export default function TomanRialPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <BackButton />
          <div dir="rtl" className="text-center">
            <h1 className="text-4xl font-bold">تبدیل تومان و ریال</h1>

            <p className="mt-3 text-zinc-400">
              مبلغ خود را وارد کنید تا معادل آن را ببینید.
            </p>
          </div>

          <TomanRialConverter />
        </div>
      </div>
    </main>
  );
}
