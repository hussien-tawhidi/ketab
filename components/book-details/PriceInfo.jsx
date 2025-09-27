"use client";

import { calculateDiscountPercent } from "@/hooks/books";
import { FaTag } from "react-icons/fa";
import AddToCart from "../shared/AddToCard";

export default function PriceInfo({ book }) {
  const discountPercent = calculateDiscountPercent(
    book.price,
    book.discountPrice
  );
  const hasDiscount = discountPercent > 0;

  return (
    <div className='bg-ketab-light p-5 rounded-2xl mt-10 shadow-lg w-full'>
      {/* Price Row */}
      <div className='flex items-center justify-between'>
        <p className='text-ketab-gray text-sm md:text-base'>قیمت</p>
        <div className='flex flex-wrap items-center gap-3'>
          {hasDiscount && (
            <span className='line-through text-ketab-red text-sm md:text-base'>
              {book.price.toLocaleString()} تومان
            </span>
          )}
          <span className='text-lg md:text-xl font-bold text-ketab-green'>
            {(book.discountPrice || book.price).toLocaleString()} تومان
          </span>
        </div>
      </div>

      {/* Discount Badge */}
      {hasDiscount && (
        <div className='flex items-center gap-2 mt-3 text-ketab-red text-sm font-medium'>
          <FaTag className='text-ketab-red' />
          <span>{discountPercent}% تخفیف ویژه</span>
        </div>
      )}
      <AddToCart book={book} />

      {/* Extra info */}
      {hasDiscount && (
        <p className='text-xs md:text-sm text-ketab-gray mt-3 text-center'>
          شما با خرید این کتاب{" "}
          <span className='font-bold text-ketab-red'>
            {(book.price - book.discountPrice).toLocaleString()} تومان
          </span>{" "}
          صرفه‌جویی می‌کنید
        </p>
      )}
    </div>
  );
}
