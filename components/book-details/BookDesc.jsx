"use client";

import Image from "next/image";
import { MdOutlineTranslate, MdPublishedWithChanges } from "react-icons/md";
import { PiBookOpenUser } from "react-icons/pi";
import PriceInfo from "./PriceInfo";

export default function BookDesc({ book }) {
  return (
    <div className='flex md:flex-row flex-col justify-between items-start'>
      <div className='flex flex-col md:flex-4/6 md:flex-row gap-6 mt-6 w-full flex-1'>
        <Image
          src={book.coverImage || "/placeholder.jpg"}
          alt='Book Cover'
          width={300}
          height={300}
          className='object-cover md:w-44 rounded-lg shadow-md'
        />

        {/* Book Details */}
        <div className='md:flex-1 space-y-4'>
          {/* Authors */}
          {book.authors.length > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <PiBookOpenUser className='text-ketab-green text-2xl' />
              {/* <span className='font-semibold'>نویسنده:</span> */}
              <span>{book.authors[0]}</span>
            </div>
          )}

          {/* Translators */}
          {book.translators.length > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <MdOutlineTranslate className='text-ketab-green text-2xl' />
              {/* <span className='font-semibold'>مترجم:</span> */}
              <span>{book.translators[0]}</span>
            </div>
          )}

          {/* Publisher */}
          {book.publisher && (
            <div className='flex items-center gap-2 text-sm'>
              <MdPublishedWithChanges className='text-ketab-green text-2xl' />
              <span className='font-semibold'>ناشر:</span>
              <span>{book.publisher}</span>
            </div>
          )}
        </div>
      </div>
      <div className='md:flex-2/6 flex-1 w-full'>
        <PriceInfo book={book} />
      </div>
    </div>
  );
}
