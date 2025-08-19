"use client";

import { booksCategories } from "@/constant/header";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function NavItem({ href = "#", icon, label, hover }) {
  return (
    <li className='relative group font-semibold flex items-center justify-center gap-1.5 cursor-pointer py-5'>
      {/* Main link */}
      {icon && <span className='text-ketab-gray'>{icon}</span>}
      <Link href={href}>{label}</Link>

      {/* underline animation */}
      <span
        className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-ketab-green 
                   scale-x-0 group-hover:scale-x-100 
                   origin-center transition-transform duration-300'
      />

      {/* Mega Menu + Overlay */}
      {hover && (
        <div
          className='absolute top-full right-0 w-[1100px] bg-ketab-dark shadow-xl rounded-xl py-4 px-10 
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                       transition-all duration-300 z-50'>
          <div className='columns-4 gap-12 text-right'>
            {booksCategories.map((category, index) => (
              <div key={index} className='mb-3 break-inside-avoid'>
                {/* Category Title */}
                <Link
                  href='/'
                  className='font-extrabold flex items-center text-ketab-green hover:underline text-base'>
                  {category.title} <MdKeyboardArrowLeft className="text-xl" />
                </Link>

                {/* Subcategories */}
                <ul className='mt-2 flex flex-col gap-1'>
                  {category.subcategories.map((sub, i) => (
                    <li key={i}>
                      <Link
                        href='/'
                        className='text-sm text-gray-300 hover:text-ketab-green transition'>
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}
