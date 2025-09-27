"use client";

import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { clearCart } from "@/store/slice/cartSlice";
import { PiBatteryVerticalEmpty } from "react-icons/pi";
import EmptyCart from "./EmptyCart";
import { useRouter } from "next/navigation";

export default function CartDrawer({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  // prevent scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) {
    // Avoid mismatch — render skeleton/empty placeholder
    return null;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = cartItems.reduce(
    (sum, item) =>
      sum + (item.price - (item.discountPrice || item.price)) * item.quantity,
    0
  );

  const handleGotoCard = () => {
    router.push("/cart");
    onClose();
  };

  const total = subtotal - discount;

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible" : "invisible"
      }`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-[400px] bg-ketab-dark border-l border-ketab-white/10 shadow-xl transform transition-transform duration-300 overflow-y-auto no-scrollbar ${
          open ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b border-ketab-white/10'>
          <h2 className='text-lg font-semibold text-white'>سبد خرید</h2>
          <FiX
            className='text-gray-400 hover:text-red-500 cursor-pointer'
            size={22}
            onClick={onClose}
          />
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className='my-3 mr-2 text-sm bg-ketab-red/10 flex items-center gap-2 text-ketab-red rounded-xl px-4 py-2'>
            حذف همه
            <PiBatteryVerticalEmpty />
          </button>
        )}
        {/* Cart Items */}
        <div className='p-4 flex-1 overflow-y-auto'>
          {cartItems.length === 0 ? (
            <EmptyCart onclose={onClose} />
          ) : (
            cartItems.map((item) => <CartItem key={item._id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className='p-4 border-t border-ketab-white/10 bg-ketab-dark/80 backdrop-blur'>
            {/* Subtotal / Discount / Total */}
            <div className='space-y-2 mb-4'>
              <div className='flex justify-between text-gray-300 text-sm'>
                <span>قیمت کالاها:</span>
                <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
              </div>

              {discount > 0 && (
                <div className='flex justify-between text-sm text-ketab-red'>
                  <span>تخفیف:</span>
                  <span>- {discount.toLocaleString("fa-IR")} تومان</span>
                </div>
              )}

              <div className='flex justify-between text-white font-bold text-lg border-t border-ketab-white/10 pt-2'>
                <span>مبلغ قابل پرداخت:</span>
                <span>{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleGotoCard}
              className='w-full flex items-center justify-center gap-2 bg-ketab-green py-3 rounded-xl text-white font-semibold hover:bg-green-700 transition shadow-md'>
              <span>ادامه فرایند خرید</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>

            {/* Note */}
            <p className='text-xs text-gray-400 text-center mt-3'>
              هزینه ارسال در مرحله بعد محاسبه می‌شود
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
