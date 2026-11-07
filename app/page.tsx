import ToolGrid from "@/components/tools/ToolGrid";
import OfferPremium from "@/components/offerPremium";
import Image from "next/image";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="relative min-h-dvh bg-[#09090b] text-white md:h-dvh md:overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-3 md:h-full md:min-h-0">
        {/* Header */}
        <header className="mb-4 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">تولینو</h1>
            <Image
              src="/logo.png"
              alt="تولینو"
              width={64}
              height={64}
              className="h-12 w-12 sm:h-16 sm:w-16"
            />
          </div>

          <p className="max-w-36 text-right text-xs leading-5 text-zinc-400 sm:max-w-none sm:text-sm">
            ابزارهای ساده و کاربردی فارسی
          </p>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-5">
          <OfferPremium />
          <div className="min-h-[24rem] flex-1 md:min-h-0">
            <ToolGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
