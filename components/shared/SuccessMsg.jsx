"use client";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function SuccessMsg({ text }) {
  return (
    <div className=' bg-ketab-bg bg-opacity-50 flex items-center justify-center'>
      <div className='border border-ketab-green rounded-md text-ketab-green p-3 max-w-md w-full shadow-xl'>
        <div className='flex gap-3 items-center text-center'>
          <IoMdCheckmarkCircleOutline className='text-2xl' />
          <p className='md:text-sm text-[12px]'>{text}</p>
        </div>
      </div>
    </div>
  );
}
