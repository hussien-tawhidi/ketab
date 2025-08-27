"use client";

import { motion } from "framer-motion";

export default function TextArea({
  value = "",
  onChange = () => {},
  placeholder = " ",
  label,
  className = "",
  rows = 4,
  disabled = false,
  required = false,
  name = "",
  id = "",
}) {
  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className='relative w-full'>
        {/* Floating label */}
        <textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          placeholder=' '
          className={`peer w-full resize-none rounded-xl border border-ketab-gray/30 bg-ketab-light px-3 pt-5 pb-2 text-sm text-ketab-gray outline-none transition-all 
            focus:border-ketab-green focus:ring-2 focus:ring-ketab-green/30 
            disabled:bg-ketab-gray/20 disabled:text-ketab-gray/50`}
        />
        <label
          htmlFor={id || name}
          className='absolute right-3 top-2 text-ketab-gray/70 text-sm transition-all duration-200 
            peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs 
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-ketab-green'>
          {label}
        </label>
      </div>
    </motion.div>
  );
}
