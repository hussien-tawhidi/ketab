"use client";

import { formatPersianDate } from "@/hooks/fetchRoles";

export default function Specification({
  title,
  authors = [],
  translators = [],
  publisher,
  pages,
  publishedAt,
  categories = [],
  language,
  sepicId,
}) {
  const specs = [
    { label: "عنوان", value: title },
    { label: "نویسنده", value: authors.length ? authors.join("، ") : "" },
    {
      label: "مترجم",
      value: translators.length ? translators.join("، ") : "-",
    },
    { label: "ناشر", value: publisher || "-" },
    { label: "تعداد صفحات", value: pages || "-" },
    { label: "تاریخ انتشار", value: formatPersianDate(publishedAt) || "-" },
    {
      label: "دسته‌بندی",
      value: categories.length ? categories.join("، ") : "-",
    },
    { label: "زبان", value: language || "-" },
  ];

  return (
    <ul className='rounded-xl bg-ketab-dark/40' id={sepicId}>
      <p>مشخصات کتاب</p>
      {specs.map((spec, idx) => (
        <li
          key={idx}
          className='flex items-center border-b border-ketab-gray/20 py-3 px-4 hover:bg-ketab-dark/60 transition-colors'>
          <p className='text-sm text-ketab-gray flex-1/6 '>{spec.label}</p>
          <p className='text-sm font-medium text-ketab-green flex-5/6'>
            {spec.value}
          </p>
        </li>
      ))}
    </ul>
  );
}
