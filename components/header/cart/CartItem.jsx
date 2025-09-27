"use client";

import Image from "next/image";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/store/slice/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div key={item._id} className='mb-4 border-b border-ketab-white/5 pb-3'>
      {/* Book cover */}
     
      <div className='flex justify-between w-full'>
        <Image
          src={item.coverImage}
          alt={item.title}
          width={60}
          height={80}
          className='rounded-md object-cover'
        />

        {/* Title + author + quantity controls */}
        <div className=''>
          <h3 className='text-sm font-medium text-ketab-gray'>{item.title}</h3>

          {/* Quantity controls */}
          <div className='flex items-center justify-end gap-2 mt-2'>
            {item.quantity > 1 ? (
              <button
                onClick={() => dispatch(decreaseQty(item._id))}
                disabled={item.quantity === 1}
                className='w-7 h-7 flex items-center justify-center rounded-full bg-ketab-gray/20 text-ketab-gray hover:bg-ketab-gray/40 disabled:opacity-50 disabled:hover:bg-ketab-gray/20'>
                <BiMinus size={18} />
              </button>
            ) : (
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className='w-7 h-7 flex items-center justify-center rounded-full bg-ketab-red/20 text-ketab-red hover:bg-ketab-red/40 disabled:opacity-50 disabled:hover:bg-ketab-red/20'>
                <BiTrash size={18} />
              </button>
            )}

            <span className='text-ketab-gray text-sm'>{item.quantity}</span>

            <button
              onClick={() => dispatch(increaseQty(item._id))}
              className='w-7 h-7 flex items-center justify-center rounded-full bg-ketab-gray/20 text-ketab-gray hover:bg-ketab-gray/40'>
              <BiPlus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className='text-right flex flex-col items-end gap-2'>
        <span className='text-sm text-ketab-gray font-medium'>
          {item.price.toLocaleString()} تومان
        </span>
      </div>
    </div>
  );
}
