"use client";
import { useState, useRef, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function CustomSelect({
  options,
  value = null, // controlled value
  defaultLabel = "انتخاب کنید",
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value) || null;

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target )) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-fit text-ketab-gray h-full">
      {/* Selected */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-2 min-w-[160px] px-3 py-3 rounded-lg 
          text-sm bg-ketab-light border border-ketab-gray/20  
          hover:border-ketab-green hover:shadow-md transition`}
      >
        <span>{selected ? selected.label : defaultLabel}</span>
        <RiArrowDownSLine
          className={`w-5 h-5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-full rounded-lg bg-ketab-light shadow-lg border border-ketab-gray/30 
          overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
        >
          {options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-left text-sm transition 
                ${
                  value === option.value
                    ? "bg-ketab-green text-ketab-white"
                    : "hover:bg-ketab-white/10"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
