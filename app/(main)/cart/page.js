"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CartItem from "@/components/header/cart/CartItem";
import { clearCart } from "@/store/slice/cartSlice";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.discountPrice > 0 ? item.discountPrice : item.price) *
        item.quantity,
    0
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder same for both SSR & client
    return (
      <div className='min-h-[70vh] flex items-center justify-center text-ketab-gray'>
        ...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4'>
        <div className='text-6xl'>🛒</div>
        <p className='text-ketab-gray text-lg'>سبد خرید شما خالی است</p>
        <button
          onClick={() => router.push("/")}
          className='bg-ketab-green text-ketab-white px-6 py-3 rounded-xl font-medium shadow-md hover:scale-105 hover:bg-ketab-green/90 transition'>
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className='px-[6%] py-12 text-ketab-white'>
      <h1 className='text-3xl font-extrabold mb-10'>🛍️ سبد خرید شما</h1>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-6'>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className='bg-ketab-dark backdrop-blur-sm p-6 rounded-2xl shadow-lg h-fit'>
          <h2 className='text-lg font-semibold mb-4'>خلاصه سفارش</h2>

          <div className='flex justify-between text-sm text-ketab-gray mb-2'>
            <span>تعداد اقلام</span>
            <span>{cartItems.length}</span>
          </div>

          <div className='flex justify-between text-sm text-ketab-gray mb-2'>
            <span>هزینه ارسال</span>
            <span>رایگان</span>
          </div>

          <div className='flex justify-between text-lg font-bold border-t border-ketab-white/10 pt-4 mt-4'>
            <span>مجموع:</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>

          {/* Buttons */}
          <div className='mt-6 space-y-3'>
            <button
              onClick={() => router.push("/checkout")}
              className='w-full bg-ketab-green py-3 rounded-xl text-ketab-white font-semibold shadow-md hover:scale-105 hover:bg-green-700 transition'>
              ادامه فرایند خرید
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className='w-full border border-ketab-red text-ketab-red py-2 rounded-xl hover:bg-ketab-orange hover:text-ketab-white transition'>
              پاک کردن سبد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
