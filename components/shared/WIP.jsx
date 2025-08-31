"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const WIP = () => {
  return (
    <div
      className='relative w-full h-screen overflow-hidden text-ketab-gray'
      dir='rtl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
        <span className='text-6xl mb-4'>🚧</span>

        <div className='text-4xl font-bold mb-4'>در حال توسعه</div>

        <div className='text-lg mb-4 max-w-md'>
          این صفحه در حال حاضر در دست ساخت است. لطفاً بعداً دوباره سر بزنید!
        </div>

        <p className='text-sm mt-2'>زمان تقریبی آماده‌سازی: هفته آینده</p>

        <Link
          href='/'
          className='mt-6 px-4 py-2 bg-dark rounded-lg hover:bg-darker transition-colors'>
          بازگشت به صفحه اصلی
        </Link>

        <div className='w-16 h-16 mt-8 border-4 border-ketab-white border-t-transparent rounded-full animate-spin'></div>
      </motion.div>
    </div>
  );
};

export default WIP;
