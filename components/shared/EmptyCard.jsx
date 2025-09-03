"use client";

import { MdOutlineFolderOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import AddBtn from "./AddBtn";

export default function EmptyCard({
  title = "هیچ داده‌ای یافت نشد",
  description = "برای شروع، داده جدیدی اضافه کنید",
  actionLabel = "➕ افزودن",
  actionRoute = null,
}) {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center p-10 rounded-3xl text-center transition hover:shadow-xl'>
      {/* Icon */}
      <div className='w-20 h-20 flex items-center justify-center rounded-full bg-ketab-gray/10 mb-6 shadow-inner animate-pulse'>
        <MdOutlineFolderOff className='text-5xl text-ketab-gray/50' />
      </div>

      {/* Title */}
      <h2 className='text-xl font-bold text-ketab-gray mb-2'>{title}</h2>

      {/* Description */}
      <p className='text-sm text-ketab-gray/60 max-w-sm mb-6 leading-relaxed'>
        {description}
      </p>

      {/* CTA Button */}
      {actionRoute && <AddBtn route={actionRoute} title={actionLabel} />}
    </div>
  );
}
