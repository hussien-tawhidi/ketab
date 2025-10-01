"use client";

import { useState } from "react";
import { FaTag, FaGift, FaPercent } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

export default function DiscountAndBonusPage() {
  const [discounts, setDiscounts] = useState([]);
  const [bonuses, setBonuses] = useState([]);

  return (
    <div className='max-w-6xl mx-auto p-6 h-full space-y-12'>
      {/* Header */}
      <h1 className='text-3xl font-bold mb-6 flex items-center gap-3'>
        <FaTag className='w-7 h-7 text-ketab-green' />
        تخفیف‌ها و پاداش‌ها
      </h1>

      {/* Discounts */}
      <section>
        <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
          <FaPercent className='w-5 h-5 text-ketab-green/90' />
          کدهای تخفیف فعال
        </h2>

        {discounts.length === 0 ? (
          <p className='text-ketab-gray text-center py-12'>
            کد تخفیفی برای شما موجود نیست
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {discounts.map((d) => (
              <div
                key={d.id}
                className='p-6 rounded-2xl bg-ketab-light shadow-sm hover:shadow-lg transition space-y-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-bold'>{d.title}</h3>
                  <span className='text-sm bg-ketab-green/10 text-ketab-green px-3 py-1 rounded-full'>
                    {d.percent}%
                  </span>
                </div>
                <p className='text-sm text-ketab-gray'>
                  کد: <span className='font-mono font-semibold'>{d.code}</span>
                </p>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <MdOutlineTimer className='w-4 h-4' />
                  <span>انقضا: {d.expires}</span>
                </div>
                <button className='mt-4 w-full py-2 bg-ketab-green text-ketab-white rounded-xl hover:bg-ketab-green/80 transition font-medium'>
                  استفاده از کد
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bonuses */}
      <section>
        <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
          <FaGift className='w-5 h-5 text-ketab-red' />
          امتیازها و پاداش‌ها
        </h2>

        {bonuses.length === 0 ? (
          <p className='text-ketab-gray text-center py-12'>
            هنوز پاداشی دریافت نکرده‌اید
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {bonuses.map((b) => (
              <div
                key={b.id}
                className='p-6 rounded-2xl bg-ketab-light shadow-sm hover:shadow-lg transition space-y-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-bold'>{b.title}</h3>
                  <span className='text-sm bg-ketab-geen/20 text-ketab-green px-3 py-1 rounded-full'>
                    {b.points} امتیاز
                  </span>
                </div>
                <p className='text-sm text-ketab-gray'>
                  امتیاز شما قابل استفاده برای تخفیف یا جوایز آینده است.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
