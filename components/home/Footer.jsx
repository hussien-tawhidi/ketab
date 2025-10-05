"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className='bg-ketab-dark text-ketab-gray/50 py-10 mt-10 border-t border-ketab-gray/10'>
      <div className='container mx-auto px-4 grid md:grid-cols-4 gap-8'>
        {/* Logo & Description */}
        <div>
          <Link href='/' className='text-2xl font-bold text-ketab-green'>
            کتابراه
          </Link>
          <p className='mt-4 text-sm leading-6'>
            کتابراه مرجع دانلود کتاب‌های الکترونیک و صوتی با بهترین کیفیت و
            پشتیبانی عالی برای علاقه‌مندان به مطالعه است.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-ketab-gray/80'>
            دسترسی سریع
          </h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/support' className='hover:text-ketab-green'>
                پشتیبانی
              </Link>
            </li>
            <li>
              <Link href='/terms' className='hover:text-ketab-green'>
                شرایط استفاده
              </Link>
            </li>
            <li>
              <Link href='/privacy' className='hover:text-ketab-green'>
                حریم خصوصی
              </Link>
            </li>
            <li>
              <Link href='/about' className='hover:text-ketab-green'>
                درباره ما
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-ketab-gray/80'>
            دسته‌بندی‌ها
          </h3>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/categories/novels'
                className='hover:text-ketab-green'>
                رمان
              </Link>
            </li>
            <li>
              <Link
                href='/categories/psychology'
                className='hover:text-ketab-green'>
                روانشناسی
              </Link>
            </li>
            <li>
              <Link
                href='/categories/self-improvement'
                className='hover:text-ketab-green'>
                خودشناسی
              </Link>
            </li>
            <li>
              <Link
                href='/categories/success'
                className='hover:text-ketab-green'>
                موفقیت
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-ketab-gray/80'>
            ما را دنبال کنید
          </h3>
          <div className='flex space-x-4 space-x-reverse'>
            <Link href='#' className='hover:text-ketab-green text-xl'>
              <FaInstagram />
            </Link>
            <Link href='#' className='hover:text-ketab-green text-xl'>
              <FaTelegram />
            </Link>
            <Link href='#' className='hover:text-ketab-green text-xl'>
              <FaTwitter />
            </Link>
            <Link href='#' className='hover:text-ketab-green text-xl'>
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='mt-10 text-center text-sm text-ketab-gray/30 border-t border-ketab-gray/10 pt-5'>
        © {year || "----"} کتاب - همه حقوق محفوظ است.
      </div>
    </footer>
  );
}
