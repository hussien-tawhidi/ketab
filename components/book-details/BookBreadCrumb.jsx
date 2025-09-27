"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function BookBreadCrumb({ categories = [], title }) {
  return (
    <div className='border-b border-ketab-light'>
      <nav className='flex flex-wrap items-center md:gap-2 text-sm md:px-4 px-1.5 py-2'>
        {/* Home */}
        <Link
          href='/'
          className='px-2 py-1 rounded-lg hover:bg-ketab-white/5 transition text-ketab-gray hover:text-ketab-white'>
          صفحه اصلی
        </Link>

        {categories.map((cat, idx) => (
          <div key={idx} className='flex items-center flex-nowrap'>
            <FaChevronLeft className='md:mx-2 mx-1 text-xs opacity-40 ' />
            <Link
              href={`/category/${cat}`}
              className='md:px-2 py-1 rounded-lg hover:bg-ketab-white/5 transition text-ketab-gray hover:text-ketab-white'>
              {cat}
            </Link>
          </div>
        ))}

        {/* Active Page */}
        <div className='flex items-center'>
          <FaChevronLeft className='md:mx-2 mx-1 text-xs opacity-40' />
          <span className='md:px-2 px-1 py-1 rounded-lg bg-ketab-green/10 text-ketab-green font-semibold'>
            {title}
          </span>
        </div>
      </nav>
    </div>
  );
}
