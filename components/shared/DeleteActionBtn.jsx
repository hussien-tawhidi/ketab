"use client";

import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

export default function DeleteActionBtn({
  onDelete,
  text = "حذف",
  deletingText = "در حال حذف...",
  isLoading = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onDelete}
      disabled={isLoading}
      type='button'
      aria-label={text}
      className='relative flex items-center justify-start w-[80px] h-[30px] px-[15px] text-[12px] font-medium rounded-[10px] shadow-[5px_5px_0_rgb(209,73,0)] text-ketab-orange transition-all duration-300 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_rgb(149,2,2)] group disabled:opacity-50 disabled:cursor-not-allowed'>
      <span className='transition-all duration-300 group-hover:text-transparent whitespace-nowrap'>
        {isLoading ? deletingText : text}
      </span>
      <FaTrash className='absolute w-[12px] left-[10px] transition-all duration-300 group-hover:left-[43%] text-pink' />
    </motion.button>
  );
}
