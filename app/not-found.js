"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className='text-ketab-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden'>
      {/* 3D Cube Container */}
      <div className='perspective-[1000px]'>
        <div className='relative w-64 h-64 md:w-80 md:h-80 animate-float [transform-style:preserve-3d]'>
          {/* Front Face */}
          <div className='absolute w-full h-full bg-gradient-to-br from-ketab-gray via-ketab-light to-ketab-dark  border-blue-500/40 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl [transform:translateZ(20px)]'>
            <div className='text-8xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ketab-white to-ketab-gray drop-shadow-lg mb-4'>
              ۴۰۴
            </div>
            <div className='text-2xl md:text-3xl font-bold text-ketab-white mb-2'>
              صفحه پیدا نشد
            </div>
            <p className='text-ketab-gray text-sm text-center leading-relaxed max-w-sm'>
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است
              جابه‌جا شده باشد.
            </p>
            <Link
              href='/'
              className='mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-ketab-gray to-ketab-white text-ketab-dark font-medium shadow-lg hover:shadow-ketab-gray/30 transition-transform duration-300 hover:scale-110'>
              بازگشت به صفحه اصلی
            </Link>
          </div>

          <div className='absolute w-10 h-full bg-ketab-gray/50 left-full origin-left rounded-r-lg [transform:rotateY(90deg)_translateZ(20px)]'></div>
          <div className='absolute w-10 h-full bg-ketab-gray/50 right-full origin-right rounded-l-lg [transform:rotateY(-90deg)_translateZ(20px)]'></div>
          <div className='absolute w-full h-10 bg-ketab-gray/30 bottom-full origin-bottom rounded-t-lg [transform:rotateX(90deg)_translateZ(20px)]'></div>
          <div className='absolute w-full h-10 bg-ketab-gray/30 top-full origin-top rounded-b-lg [transform:rotateX(-90deg)_translateZ(20px)]'></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        <span className='absolute w-2 h-2 bg-ketab-gray/80 rounded-full opacity-30 top-[20%] left-[15%] animate-particle'></span>
        <span className='absolute w-3 h-3 bg-ketab-gray rounded-full opacity-20 top-[60%] left-[25%] animate-particle [animation-delay:2s]'></span>
        <span className='absolute w-2 h-2 bg-ketab-gray/90 rounded-full opacity-25 top-[30%] left-[80%] animate-particle [animation-delay:1s]'></span>
        <span className='absolute w-4 h-4 bg-ketab-gray/80 rounded-full opacity-15 top-[80%] left-[70%] animate-particle [animation-delay:3s]'></span>
      </div>
    </div>
  );
}
