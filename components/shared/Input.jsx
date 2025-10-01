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
  onBlur,
  mobile,
  success,
  onKeyDown,
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
        onKeyDown={onKeyDown}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className={`border border-ketab-white/10 bg-ketab-light
          focus:rounded-br-none focus:rounded-bl-none rounded-lg p-3 text-[12px]
          focus:outline-none focus:ring-0 focus:bg-ketab-light placeholder:text-[12px]
          ${success ? "border-ketab-green" : ""}
          ${error ? "border-red-500" : ""}
          ${icon ? "pr-10" : ""}
        `}
      />

      {error && <span className='text-xs text-ketab-orange'>{error}</span>}
      {success && <span className='text-xs text-ketab-green'>{success}</span>}

      {icon && (
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors
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
