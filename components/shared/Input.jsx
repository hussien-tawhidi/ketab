"use client";

import { useState } from "react";

export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  icon,
  onFocus,
  onBlur,mobile
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='flex flex-col gap-1 w-full text-right relative group'>
      {label && (
        <label className='text-sm font-medium text-ketab-gray'>{label}</label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={mobile}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className={`border border-ketab-white/10 bg-ketab-light focus:border-none 
          focus:rounded-br-none focus:rounded-bl-none rounded-lg p-3 md:placeholder:text-sm text-[12px]
          focus:outline-none focus:ring-0 focus:bg-ketab-light
          ${icon ? "pr-10" : ""}
          ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-none"}`}
      />

      {error && <span className='text-xs text-red-500'>{error}</span>}

      {icon && (
        <span
          className={`absolute right-3 top-1/2 group-hover:text-ketab-green -translate-y-1/2 text-2xl transition-colors
            ${
              isFocused || value?.length > 0
                ? "text-ketab-green"
                : "text-ketab-gray"
            }`}>
          {icon}
        </span>
      )}
    </div>
  );
}
