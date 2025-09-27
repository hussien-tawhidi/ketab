"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className='w-full h-screen flex items-center justify-center py-10'>
      <div className='relative w-20 h-12 flex items-end justify-center'>
        {/* Loader text */}
        <motion.span
          className='absolute top-0 text-[0.8rem] text-[#c8fb99] font-medium'
          animate={{
            letterSpacing: ["1px", "2px", "1px", "2px", "1px"],
            x: [0, 26, 32, 0, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          لطفا صبر کنید
        </motion.span>

        {/* Bar */}
        <motion.span
          className='absolute bottom-0 h-4 w-4 bg-[#5e942b] rounded-full'
          animate={{
            width: ["16px", "100%", "16px", "100%", "16px"],
            x: [0, 0, 64, 0, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          {/* inner bar */}
          <motion.span
            className='absolute inset-0 bg-[#2a4511] rounded-full'
            animate={{
              width: ["16px", "80%", "100%", "80%", "16px"],
              x: [0, 0, 0, 15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.span>
      </div>
    </div>
  );
}
