"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";

export default function EditActionBtn({ onEdit, text }) {
  return (
    <Link href={onEdit} target="_blank">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`ویرایش ${text}`}
        className='relative flex items-center justify-start w-[80px] h-[30px] px-[15px] text-[12px] font-medium text-light rounded-[10px] shadow-[5px_5px_0_rgb(0,0,0)] transition-all duration-300 active:translate-x-[3px] active:translate-y-[3px] active:shadow-darker group'>
        <span className='transition-all duration-300 group-hover:text-transparent'>
          {text}
        </span>
        <MdOutlineEdit className='absolute left-[10px] w-[12px] transition-all duration-300 group-hover:left-[43%]' />
      </motion.button>
    </Link>
  );
}
