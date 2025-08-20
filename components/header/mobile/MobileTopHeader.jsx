"use client";

import { useState } from "react";
import { FaFacebookF, FaRegCircleUser } from "react-icons/fa6";
import Search from "../search/Search";
import Input from "@/components/shared/Input";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { mobileToMenuHeader } from "@/constant/header";
import Link from "next/link";

export default function MobileTopHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <div className='md:hidden block fixed top-0 left-0 right-0  bg-ketab-dark'>
      <header className='relative w-full bg-ketab-dark'>
        <div className='flex gap-5 py-3 justify-between items-center px-2'>
          {/* Burger Menu - Mobile */}
          <button
            className='md:hidden relative w-6 h-6 flex flex-col justify-center items-center z-50'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'>
            <span
              className={`block absolute h-0.5 w-6 bg-ketab-gray transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45" : "-translate-y-2"
              } origin-center`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-ketab-gray transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-ketab-gray transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45" : "translate-y-2"
              } origin-center`}
            />
          </button>

          <div className='w-full' onClick={() => setSearch(!search)}>
            <Input
              placeholder='جستجوی کتاب، نویسنده، ناشر'
              type='text'
              icon={<IoMdSearch />}
            />
          </div>
          {search && (
            <div className='fixed top-0 left-0 right-0 w-full bg-ketab-light py-2 z-50'>
              <Search mobile handleClose={() => setSearch(!search)} />
            </div>
          )}
          {/* <Search /> */}
          <FaRegCircleUser className='text-ketab-gray text-3xl' />
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-ketab-light overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "h-screen" : "h-0"
          }`}>
          <ul className='flex flex-col px-2 space-y-2 py-6 text-ketab-white'>
            {mobileToMenuHeader.map((item, index) => (
              <li key={index} className='mb-3'>
                <Link
                  href={"/"}
                  className='text-base flex items-center justify-between border-b text-ketab-gray border-ketab-white/20 py-1.5 transition-all duration-300'>
                  {item.label}
                  <IoIosArrowDown />
                </Link>
              </li>
            ))}
            <li className='flex items-center justify-center gap-3 text-2xl mt-5'>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
              <Link href={"/"}>
                <RiInstagramFill />
              </Link>
              <Link href={"/"}>
                <BsTwitterX />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
