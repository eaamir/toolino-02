import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

export default function ToolCard({
  title,
  description,
  icon,
  href,
}: ToolCardProps) {
  return (
    <Link
      dir="rtl"
      href={href}
      className="
        group relative block overflow-hidden rounded-2xl
        border border-white/10
        bg-white/[0.07]
        p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
        transition-all duration-300

        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/11
        hover:shadow-[0_16px_45px_rgba(0,0,0,0.35)]
      "
    >
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

      {/* Glow */}
      <div
        className="
          pointer-events-none absolute
          -right-12 -top-12
          h-32 w-32
          rounded-full
          bg-white/10
          blur-3xl
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Icon */}
      <div
        className="
          relative mb-5 flex h-14 w-14
          items-center justify-center
          rounded-2xl
          border border-white/10
          bg-white/8
          text-3xl
          shadow-inner shadow-white/5
          backdrop-blur-md
          transition-all duration-300
          group-hover:bg-white/[0.14]
        "
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>

        <div className="mt-6 text-sm text-zinc-400 transition-all duration-300 group-hover:text-white">
          استفاده از ابزار ←
        </div>
      </div>
    </Link>
  );
}
