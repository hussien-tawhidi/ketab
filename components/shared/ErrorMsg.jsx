"use client"
import { MdErrorOutline } from "react-icons/md";

export default function ErrorMsg({ text }) {
  return (
    <div className=' bg-ketab-bg bg-opacity-50 flex items-center justify-center'>
      <div className='border border-ketab-orange rounded-md text-ketab-orange p-3 max-w-md w-full shadow-xl'>
        <div className='flex gap-3 items-center text-center'>
          <MdErrorOutline className='text-2xl' />
          <p className='md:text-sm text-[12px]'>{text}</p>
        </div>
      </div>
    </div>
  );
}
