"use client";

import Image from "next/image";

export default function FreeBanner() {
  return (
    <div className='w-full bg-ketab-green rounded-xl mx-auto flex justify-between items-center md:px-5 p-2 my-10'>
      <div className='font-semibold'>
        <p>دانلود کتاب های</p>
        <p>الکترونیکی به صورت</p>
        <p>رایگان</p>
        <button className='bg-[#4c7623] py-0.5 p-3 text-sm mt-2 rounded-xl cursor-pointer'>
          مشاهده
        </button>
      </div>
      <Image
        src={"/main/free.png"}
        width={200}
        height={200}
        alt='weekenImage.png'
        className='object-cover w-44'
      />
    </div>
  );
}
