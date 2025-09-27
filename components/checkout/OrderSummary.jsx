"use client";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function OrderSummary({
  items = [],
  total = 0,
  discountRate = 0.1, // configurable
  onSubmit,
  loading = false, // loading state for submit
  disabled=false
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='bg-ketab-light p-6 rounded-2xl shadow h-fit' />;
  }

  const discount = total * discountRate;
  const finalTotal = total - discount;

  return (
    <div className='bg-gradient-to-br from-ketab-light to-ketab-bg p-6 rounded-2xl h-fit'>
      {/* Header */}
      <h2 className='text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-ketab-white'>
        <FaShoppingCart className='text-ketab-green' /> خلاصه سفارش
      </h2>

      {/* Totals */}
      {items.length > 0 && (
        <div className='border-t border-ketab-white/20 mt-4 pt-4 space-y-2'>
          <div className='flex justify-between text-ketab-gray text-sm'>
            <span>جمع کل</span>
            <span>{total.toLocaleString()} تومان</span>
          </div>

          <div className='flex justify-between text-ketab-gray text-sm'>
            <span>تخفیف</span>
            <span className='text-ketab-red'>
              - {discount.toLocaleString()} تومان
            </span>
          </div>

          <div className='flex justify-between font-bold text-base md:text-lg text-ketab-white'>
            <span>مبلغ نهایی</span>
            <span className='text-ketab-green'>
              {finalTotal.toLocaleString()} تومان
            </span>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onSubmit}
        disabled={items.length === 0 || loading || disabled}
        className='w-full mt-6 py-3 rounded-xl font-semibold text-ketab-white bg-gradient-to-r from-ketab-green/90 to-ketab-green hover:from-ketab-green/80 hover:to-ketab-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2'>
        {loading ? (
          <span className='animate-spin rounded-full h-5 w-5 border-2 border-ketab-white border-t-transparent'></span>
        ) : (
          "ثبت سفارش"
        )}
      </button>
    </div>
  );
}
