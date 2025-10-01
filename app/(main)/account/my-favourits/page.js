"use client";

import { removeFromFavorites } from "@/store/slice/favoritesSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsHeart, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function MyFavouritesPage() {
  const [mounted, setMounted] = useState(false);

  const favourites = useSelector((item) => item.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true); // ensures client-only rendering
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by rendering nothing until client mounts
    return null;
  }
  return (
    <div className='max-w-5xl mx-auto p-6 h-full'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <BsHeart className='w-6 h-6 text-ketab-red' />
        لیست علاقمندی ها
      </h1>

      {favourites.length === 0 ? (
        <p className='text-ketab-gray'>هنوز کتابی در این لیست وجود نداره</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {favourites.map((item) => (
            <div
              key={item._id}
              className='group relative rounded-2xl shadow-2xl shadow-ketab-gray/30 hover:shadow-lg transition  overflow-hidden'>
              {/* Book Cover */}
              <Image
                src={item.coverImage}
                alt={item.title}
                width={200}
                height={200}
                className='object-cover mx-auto'
              />

              {/* Card Content */}
              <div className='p-4 space-y-2'>
                <h2 className='text-lg font-semibold line-clamp-1'>
                  {item.title}
                </h2>
                <p className='text-sm text-gray-500 line-clamp-2'>
                  {item.description}
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <span className='font-bold'>
                    {item.price} تومان
                  </span>

                  {/* Actions */}
                  <div className='flex gap-2'>
               
                    <button
                      onClick={() => dispatch(removeFromFavorites(item._id))}
                      className='p-2 rounded-full  transition'>
                      <BsTrash className='w-5 h-5 text-gray-500 hover:text-red-500' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
