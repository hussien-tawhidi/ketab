"use client";

import Input from "@/components/shared/Input";
import { searchSuggestion } from "@/constant/header";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

export default function Search({ mobile, handleClose }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  // Disable body scroll when search is open
  useEffect(() => {
    if (isFocused || mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFocused, mobile]);

  // Filter suggestions
  const filtered = searchSuggestion.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full relative bg-ketab-light' ref={containerRef}>
      <form
        className='relative z-50'
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) {
            console.log("Search:", search);
            setIsFocused(false);
          }
        }}>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            aria-label='بستن'
            className='p-2 rounded-full absolute top-1 left-1 md:hidden flex z-50 text-xl '
            onClick={handleClose}>
            <IoMdClose />
          </button>
          <Input
            placeholder='جستجوی کتاب، نویسنده، ناشر'
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            value={search}
            icon={<IoMdSearch />}
            onFocus={() => setIsFocused(true)}
            aria-expanded={isFocused}
            aria-controls='search-suggestions'
            role='combobox'
          />
        </div>

        {/* Suggestions */}
        {(isFocused || mobile) && (
          <div
            id='search-suggestions'
            className='absolute top-full left-0 w-full bg-ketab-light border-t border-ketab-white/10 rounded-b-xl py-8 px-5 shadow-lg z-50'>
            <div className='flex items-center w-full gap-2'>
              <p className='whitespace-nowrap text-ketab-gray'>
                موضوعات پرطرفدار
              </p>
              <span className='h-[0.5px] w-full bg-ketab-gray/30' />
            </div>
            <div
              className={`flex gap-2.5 flex-wrap mt-6 transition-all duration-300 ${
                isFocused || mobile
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <Link
                    key={item.id}
                    href={item.title}
                    className='border border-ketab-white/10 whitespace-nowrap py-1 px-4 rounded-xl md:text-sm text-xs hover:bg-ketab-green/10 transition'
                    onClick={() => setIsFocused(false)}>
                    {item.title}
                  </Link>
                ))
              ) : (
                <p className='text-ketab-gray text-sm'>نتیجه‌ای یافت نشد</p>
              )}
            </div>
          </div>
        )}
      </form>

      {/* Overlay */}
      {(isFocused || mobile) && (
        <div
          className='fixed inset-0 bg-black/20 z-40'
          onClick={() => {
          
            setIsFocused(false);
          }}
        />
      )}
    </div>
  );
}
