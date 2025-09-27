"use client";

import { PiShoppingCartSimple } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function EmptyCart({ onclose }) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
    onclose();
  };
  return (
    <div className='flex flex-col items-center justify-center text-center py-20'>
      {/* Icon */}
      <div className='w-20 h-20 flex items-center justify-center rounded-full bg-ketab-gray/10 mb-6'>
        <PiShoppingCartSimple className='text-ketab-gray text-5xl' />
      </div>

      {/* Message */}
      <h2 className='text-lg font-semibold text-ketab-white mb-2'>
        سبد خرید شما خالی است
      </h2>
      <p className='text-sm text-ketab-gray mb-6'>
        برای افزودن کتاب، به فروشگاه ما سر بزنید 📚
      </p>

      {/* CTA button */}
      <button
        onClick={handleClick}
        className='bg-ketab-green text-ketab-white px-6 py-2 rounded-lg font-medium 
                   hover:bg-ketab-green transition'>
        شروع خرید
      </button>
    </div>
  );
}
