"use client";

import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoCheckmark, IoClose } from "react-icons/io5";

export default function MultiSelect({ title, options, values, setValues }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleValue = (value) => {
    if (values.includes(value)) {
      setValues(values.filter((v) => v !== value));
    } else {
      setValues([...values, value]);
    }
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setValues([]);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className='border border-ketab-gray/30 rounded-xl p-4 space-y-2 relative'>
      <h2 className='font-semibold text-ketab-gray mb-2'>{title}</h2>

      {/* Dropdown button */}
      <div
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex flex-wrap gap-2 justify-between items-center px-3 py-2 border border-ketab-gray/40 rounded-md text-right hover:bg-ketab-light/40 focus:ring-2 focus:ring-ketab-green transition'>
        <div className='flex flex-wrap gap-1'>
          {values.length > 0 ? (
            values.map((val) => (
              <span
                key={val}
                className='bg-ketab-green/10 text-ketab-green text-sm px-2 py-0.5 rounded-full flex items-center gap-1'>
                {val}
                <IoClose
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(val);
                  }}
                />
              </span>
            ))
          ) : (
            <span className='text-ketab-gray/70'>انتخاب کنید</span>
          )}
        </div>

        <div className='flex items-center gap-2'>
          {values.length > 0 && (
            <button
              type='button'
              onClick={clearAll}
              className='text-xs text-red-500 hover:text-red-600 transition'>
              پاک کردن
            </button>
          )}
          <IoChevronDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Options dropdown */}
      {open && (
        <div className='absolute z-20 mt-1 w-full bg-ketab-light no-scrollbar border border-ketab-gray/30 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fadeIn'>
          {options.map((opt) => {
            const selected = values.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition ${
                  selected
                    ? "bg-ketab-green/10 text-ketab-green font-medium"
                    : "hover:bg-ketab-light/40"
                }`}
                onClick={() => toggleValue(opt.value)}>
                <span>{opt.label}</span>
                {selected && <IoCheckmark className='text-ketab-green' />}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
