export type ToolCategory =
  | "financial"
  | "date"
  | "text"
  | "conversion"
  | "business"
  | "file";

export type Tool = {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: ToolCategory;
};

export const tools: Tool[] = [
  {
    title: "تبدیل تومان و ریال",
    description: "تبدیل سریع تومان به ریال و ریال به تومان",
    icon: "💰",
    href: "/tools/toman-rial",
    category: "financial",
  },
  {
    title: "محاسبه درصد سود و بهره",
    description: "محاسبه سود و مبلغ نهایی بر اساس سرمایه، درصد سود و مدت",
    icon: "📈",
    href: "/tools/interest",
    category: "financial",
  },
  {
    title: "محاسبه سود بانکی",
    description: "محاسبه سود ماهانه، سالانه و مبلغ نهایی سپرده",
    icon: "🏦",
    href: "/tools/bank-interest",
    category: "financial",
  },
  {
    title: "محاسبه تخفیف",
    description: "محاسبه مبلغ تخفیف و قیمت نهایی کالا",
    icon: "🏷️",
    href: "/tools/discount",
    category: "financial",
  },
  {
    title: "محاسبه سن",
    description: "محاسبه سن دقیق بر اساس تاریخ تولد",
    icon: "🎂",
    href: "/tools/age-calculator",
    category: "date",
  },
  {
    title: "محاسبه حقوق و دستمزد",
    description: "محاسبه حقوق خالص، بیمه، مالیات و کسورات",
    icon: "💵",
    href: "/tools/salary-calculator",
    category: "financial",
  },
  {
    title: "تبدیل تاریخ شمسی و میلادی",
    description: "تبدیل تاریخ شمسی به میلادی و میلادی به شمسی",
    icon: "📅",
    href: "/tools/date-converter",
    category: "date",
  },
  {
    title: "شمارش کلمات و کاراکتر",
    description: "شمارش کلمات فارسی، انگلیسی، کاراکترها و خطوط",
    icon: "📝",
    href: "/tools/text-counter",
    category: "text",
  },
  {
    title: "اصلاح متن فارسی",
    description: "اصلاح نیم‌فاصله، فاصله‌ها و حروف فارسی",
    icon: "✍️",
    href: "/tools/persian-text-corrector",
    category: "text",
  },
  {
    title: "تبدیل اعداد",
    description: "تبدیل عدد فارسی و انگلیسی و تبدیل عدد به حروف فارسی",
    icon: "🔢",
    href: "/tools/number-converter",
    category: "conversion",
  },
  {
    title: "ساخت فاکتور",
    description: "ساخت فاکتور ساده با محاسبه خودکار مبلغ و تخفیف",
    icon: "🧾",
    href: "/tools/invoice-generator",
    category: "business",
  },
  {
    title: "فشرده‌سازی PDF",
    description: "کاهش حجم فایل PDF با حفظ کیفیت مناسب",
    icon: "📄",
    href: "/tools/pdf-compressor",
    category: "file",
  },
];
