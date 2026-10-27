export default function OfferPremium() {
  return (
    <section
      dir="rtl"
      className="relative mx-auto w-full  overflow-hidden rounded-2xl border border-orange-400/20 bg-white/[0.07] px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-6"
      aria-labelledby="premium-offer-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-orange-200/30" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-orange-300">پیشنهاد ویژه</p>
          <h2
            id="premium-offer-title"
            className="mt-1 text-lg font-semibold text-white"
          >
            سه ماه پریمیوم
          </h2>
          <p className="mt-1 text-sm text-orange-100/60">
            دسترسی کامل به تمامی ابزارها و امکانات
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
          <p className="text-lg font-semibold text-orange-300">
            <span className="text-xs font-normal text-orange-100/60">
              سه ماهه فقط
            </span>{" "}
            ۱۹۹.۰۰۰{" "}
            <span className="text-xs font-normal text-orange-100/60">
              تومان
            </span>
          </p>
          <a
            href="#"
            className="rounded-lg border border-orange-300/30 bg-orange-400/15 px-4 py-2 text-sm font-medium text-orange-200 transition hover:border-orange-300/50 hover:bg-orange-400/25"
          >
            تهیه پلن
          </a>
        </div>
      </div>
    </section>
  );
}
