"use client";

import { useMemo, useState } from "react";

type Item = {
  id: number;
  title: string;
  quantity: string;
  price: string;
};

const toNumber = (value: string) => {
  return Number(value.replace(/,/g, "").replace(/[^\d]/g, "")) || 0;
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(Math.round(value));
};

const formatInputNumber = (value: string) => {
  const number = toNumber(value);

  if (!number) return "";

  return number.toLocaleString("en-US");
};

export default function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState("1001");
  const [date, setDate] = useState("");

  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      title: "",
      quantity: "1",
      price: "",
    },
  ]);

  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("0");
  const [description, setDescription] = useState("");

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + toNumber(item.quantity) * toNumber(item.price);
    }, 0);
  }, [items]);

  const discountAmount = subtotal * (toNumber(discount) / 100);

  const afterDiscount = subtotal - discountAmount;

  const taxAmount = afterDiscount * (toNumber(tax) / 100);

  const total = afterDiscount + taxAmount;

  const updateItem = (id: number, field: keyof Item, value: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        title: "",
        quantity: "1",
        price: "",
      },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length === 1) return;

    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div dir="rtl">
      {/* فرم */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        {/* اطلاعات فاکتور */}
        <SectionTitle title="اطلاعات فاکتور" />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="شماره فاکتور"
            value={invoiceNumber}
            onChange={setInvoiceNumber}
            placeholder="مثلاً 1001"
          />

          <Input
            label="تاریخ"
            type="text"
            value={date}
            onChange={setDate}
            placeholder="مثلاً ۱۴۰۵/۰۵/۲۵"
          />
        </div>

        {/* فروشنده */}
        <SectionTitle title="فروشنده" />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="نام فروشنده"
            value={sellerName}
            onChange={setSellerName}
            placeholder="نام شخص یا شرکت"
          />

          <Input
            label="شماره تماس"
            value={sellerPhone}
            onChange={setSellerPhone}
            placeholder="مثلاً 09120000000"
          />

          <div className="md:col-span-2">
            <Input
              label="آدرس"
              value={sellerAddress}
              onChange={setSellerAddress}
              placeholder="آدرس فروشنده"
            />
          </div>
        </div>

        {/* خریدار */}
        <SectionTitle title="خریدار" />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="نام خریدار"
            value={customerName}
            onChange={setCustomerName}
            placeholder="نام مشتری"
          />

          <Input
            label="شماره تماس"
            value={customerPhone}
            onChange={setCustomerPhone}
            placeholder="مثلاً 09120000000"
          />

          <div className="md:col-span-2">
            <Input
              label="آدرس"
              value={customerAddress}
              onChange={setCustomerAddress}
              placeholder="آدرس خریدار"
            />
          </div>
        </div>

        {/* کالاها */}
        <SectionTitle title="اقلام فاکتور" />

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  ردیف {formatNumber(index + 1)}
                </span>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm cursor-pointer text-red-400 hover:text-red-300"
                  >
                    حذف
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className="mb-2 block text-sm text-zinc-400">
                    کالا / خدمت
                  </label>

                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateItem(item.id, "title", e.target.value)
                    }
                    placeholder="مثلاً طراحی سایت"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-right outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    تعداد
                  </label>

                  <input
                    inputMode="numeric"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        e.target.value.replace(/[^\d]/g, ""),
                      )
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-center outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    قیمت واحد (تومان)
                  </label>

                  <input
                    inputMode="numeric"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        formatInputNumber(e.target.value),
                      )
                    }
                    placeholder="مثلاً 500,000"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-center outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <div className="mt-4 text-left text-sm text-zinc-500">
                مبلغ:{" "}
                <span className="font-semibold text-white">
                  {formatNumber(toNumber(item.quantity) * toNumber(item.price))}{" "}
                  تومان
                </span>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 px-5 py-4 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
          >
            + افزودن کالا / خدمت
          </button>
        </div>

        {/* تخفیف و مالیات */}
        <SectionTitle title="تخفیف و مالیات" />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              تخفیف (%)
            </label>

            <input
              inputMode="decimal"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value.replace(/[^\d.]/g, ""))
              }
              placeholder="مثلاً 10"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              مالیات (%)
            </label>

            <input
              inputMode="decimal"
              value={tax}
              onChange={(e) => setTax(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="مثلاً 10"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center outline-none focus:border-zinc-400"
            />
          </div>
        </div>

        {/* توضیحات */}
        <SectionTitle title="توضیحات" />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات فاکتور..."
          className="min-h-[120px] w-full resize-y rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-right leading-8 outline-none focus:border-zinc-400"
        />
      </div>

      {/* پیش نمایش */}
      <div
        id="invoice-preview"
        className="mt-8 rounded-3xl bg-white p-6 text-black shadow-xl"
      >
        <div className="border-b border-zinc-300 pb-5">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold">فاکتور فروش</h2>

              <div className="mt-2 text-sm text-zinc-500">
                شماره فاکتور: {invoiceNumber || "-"}
              </div>

              <div className="mt-1 text-sm text-zinc-500">
                تاریخ: {date || "-"}
              </div>
            </div>

            <div className="text-left">
              <div className="font-bold">{sellerName || "نام فروشنده"}</div>

              {sellerPhone && (
                <div className="mt-1 text-sm text-zinc-500">{sellerPhone}</div>
              )}

              {sellerAddress && (
                <div className="mt-1 max-w-xs text-sm text-zinc-500">
                  {sellerAddress}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* خریدار */}
        <div className="border-b border-zinc-300 py-5">
          <div className="text-sm font-semibold">خریدار</div>

          <div className="mt-2">{customerName || "-"}</div>

          {customerPhone && (
            <div className="mt-1 text-sm text-zinc-500">{customerPhone}</div>
          )}

          {customerAddress && (
            <div className="mt-1 text-sm text-zinc-500">{customerAddress}</div>
          )}
        </div>

        {/* جدول */}
        <div className="overflow-x-auto py-5">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-right">
                <th className="p-3">ردیف</th>
                <th className="p-3">شرح</th>
                <th className="p-3">تعداد</th>
                <th className="p-3">قیمت واحد</th>
                <th className="p-3">مبلغ</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => {
                const amount = toNumber(item.quantity) * toNumber(item.price);

                return (
                  <tr key={item.id} className="border-b border-zinc-200">
                    <td className="p-3">{formatNumber(index + 1)}</td>

                    <td className="p-3">{item.title || "-"}</td>

                    <td className="p-3">
                      {formatNumber(toNumber(item.quantity))}
                    </td>

                    <td className="p-3">
                      {formatNumber(toNumber(item.price))}
                    </td>

                    <td className="p-3 font-medium">{formatNumber(amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* جمع */}
        <div className="border-t border-zinc-300 pt-5">
          <div className="mr-auto max-w-sm space-y-3">
            <SummaryRow title="جمع کل" value={subtotal} />

            {discountAmount > 0 && (
              <SummaryRow
                title={`تخفیف (${formatNumber(toNumber(discount))}٪)`}
                value={-discountAmount}
              />
            )}

            {taxAmount > 0 && (
              <SummaryRow
                title={`مالیات (${formatNumber(toNumber(tax))}٪)`}
                value={taxAmount}
              />
            )}

            <div className="flex justify-between border-t border-zinc-300 pt-4 text-lg font-bold">
              <span>مبلغ نهایی</span>

              <span>{formatNumber(total)} تومان</span>
            </div>
          </div>
        </div>

        {/* توضیحات */}
        {description && (
          <div className="mt-8 border-t border-zinc-300 pt-5">
            <div className="text-sm font-semibold">توضیحات</div>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-zinc-600">
              {description}
            </p>
          </div>
        )}
      </div>

      {/* چاپ */}
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-6 w-full rounded-2xl cursor-pointer bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
      >
        چاپ / ذخیره به صورت PDF
      </button>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          #invoice-preview,
          #invoice-preview * {
            visibility: visible;
          }

          #invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 mt-8 border-b border-zinc-800 pb-3 text-lg font-semibold">
      {title}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-right outline-none transition focus:border-zinc-400"
      />
    </div>
  );
}

function SummaryRow({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-zinc-500">{title}</span>

      <span className="font-medium">{formatNumber(value)} تومان</span>
    </div>
  );
}
