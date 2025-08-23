"use client";

import { useState } from "react";
import Link from "next/link";
import { general, userProfile } from "@/constant/side-bar-data";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [openMenus, setOpenMenus] = useState({});
  const router = useRouter();
  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div
      className='px-4 py-6 w-72 bg-gradient-to-b from-ketab-light to-ketab-bg h-screen overflow-y-auto shadow-lg
    [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-light 
  dark:[&::-webkit-scrollbar-track]:dark:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-light'>
      {/* Logo/Brand Area */}
      <div
        className='mb-8 cursor-pointer px-2'
        onClick={() => router.push("/admin")}>
        <h2 className='text-xl font-bold text-ketab-green'>فروشگاه کتاب</h2>
        <p className='text-xs text-ketab-gray mt-1 font-semibold'>پنل مدیریت</p>
      </div>

      {/* General Menus */}
      <div className='mb-8'>
        <h3 className='text-xs font-semibold text-ketab-gray mb-3 px-2 uppercase tracking-wider border-b pb-2 border-ketab-green/20'>
          مدیریت فروشگاه
        </h3>
        <ul className='space-y-1'>
          {general.map((menu) => {
            const Icon = menu.icon;
            const isOpen = openMenus[menu.name];

            return (
              <li key={menu.name}>
                <div
                  className='flex items-center justify-between px-3 py-3 font-medium text-sm text-ketab-gray 
                  hover:bg-ketab-green/5 rounded-lg cursor-pointer transition-all duration-200'
                  onClick={() => toggleMenu(menu.name)}>
                  <div className='flex items-center gap-2'>
                    <Icon className='text-ketab-green text-lg' />
                    <span>{menu.name}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {isOpen && (
                  <ul className='pl-9 mt-1 space-y-1 border-r-2 border-ketab-green/10 mr-2'>
                    {menu.subMenu.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <li key={sub.name}>
                          <Link
                            href={sub.link}
                            className='flex items-center gap-2 px-3 py-2 text-sm text-ketab-gray 
                            hover:text-ketab-green hover:bg-ketab-green/5 rounded-lg transition-all duration-200'>
                            <SubIcon className='text-ketab-gray text-base' />
                            <span>{sub.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile Menus */}
      <div>
        <h3 className='text-xs font-semibold text-ketab-gray mb-3 px-2 uppercase tracking-wider border-b pb-2 border-ketab-green/20'>
          مدیریت کاربران
        </h3>
        <ul className='space-y-1'>
          {userProfile.map((menu) => {
            const Icon = menu.icon;
            const isOpen = openMenus[menu.name];

            return (
              <li key={menu.name}>
                <div
                  className='flex items-center justify-between px-3 py-3 font-medium text-sm text-ketab-gray 
                  hover:bg-ketab-green/5 rounded-lg cursor-pointer transition-all duration-200'
                  onClick={() => toggleMenu(menu.name)}>
                  <div className='flex items-center gap-2'>
                    <Icon className='text-ketab-green text-lg' />
                    <span>{menu.name}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {isOpen && (
                  <ul className='pl-9 mt-1 space-y-1 border-r-2 border-ketab-green/10 mr-2'>
                    {menu.subMenu.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <li key={sub.name}>
                          <Link
                            href={sub.link}
                            className='flex items-center gap-2 px-3 py-2 text-sm text-ketab-gray 
                            hover:text-ketab-green hover:bg-ketab-green/5 rounded-lg transition-all duration-200'>
                            <SubIcon className='text-ketab-gray text-base' />
                            <span>{sub.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile Section */}
      <div className='mt-10 pt-6 border-t border-ketab-green/20'>
        <div className='flex items-center gap-3 px-2'>
          <div className='w-10 h-10 rounded-full bg-ketab-green/10 flex items-center justify-center'>
            <span className='text-ketab-green font-semibold'>ا</span>
          </div>
          <div>
            <p className='text-sm font-medium text-ketab-gray'>امیر حسین</p>
            <p className='text-xs text-ketab-gray/70'>مدیر سیستم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
