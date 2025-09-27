"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "@/store/slice/cartSlice";
import { BiMinus, BiPlus, BiCartAlt } from "react-icons/bi";

export default function AddToCart({ book }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item._id === book?._id);
  const quantity = cartItem?.quantity || 1;

  if (!book) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...book, quantity: 1 }));
  };

  return (
    <div className='p-5 border-b border-ketab-green flex flex-col gap-4 w-full max-w-sm mx-auto'>
      {/* Quantity Controls */}
      {cartItem && (
        <div className='flex items-center justify-center gap-4'>
          <button
            onClick={() => dispatch(decreaseQty(book._id))}
            disabled={quantity === 1}
            className='flex items-center justify-center w-10 h-10 rounded-full 
             bg-ketab-gray/10 text-ketab-gray 
             hover:bg-ketab-light transition 
             disabled:cursor-not-allowed 
             disabled:hover:bg-ketab-gray/10'>
            <BiMinus size={20} />
          </button>

          <span className='px-4 text-ketab-gray text-lg font-semibold'>
            {quantity}
          </span>

          <button
            onClick={() => dispatch(increaseQty(book._id))}
            className='flex items-center justify-center w-10 h-10 rounded-full bg-ketab-gray/10 text-ketab-gray hover:bg-ketab-light transition'>
            <BiPlus size={20} />
          </button>
        </div>
      )}

      {/* Add to cart button */}
      {!cartItem && (
        <button
          onClick={handleAddToCart}
          className='flex items-center justify-center gap-2 bg-ketab-green hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300'>
          <BiCartAlt size={22} /> افزودن به سبد خرید
        </button>
      )}
    </div>
  );
}
