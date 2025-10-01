"use client";

import { menuItems } from "@/constant/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdOutlineLogout } from "react-icons/md";

const UserMenu = ({ user, logout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className='relative' ref={menuRef}>
      <div
        className='whitespace-nowrap rounded overflow-hidden'
        onClick={() => setShowUserMenu(!showUserMenu)}>
        <button
          className={`p-2 text-2xl border flex items-center text-ketab-gray gap-1 ${
            showUserMenu ? "border-ketab-green" : "border-none"
          } transition`}>
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt='user image'
              className='object-cover w-9 h-6 overflow-hidden rounded-full'
              width={150}
              height={150}
            />
          ) : (
            <FaRegCircleUser />
          )}
          {/* <MdKeyboardArrowDown className='md:flex hidden' /> */}
        </button>
      </div>
      {showUserMenu && (
        <div className='w-64 animate-[fadeDown_0.25s_ease-out] overflow-hidden bg-ketab-light shadow-lg absolute top-full mt-3 rounded-xl left-0 z-50'>
          <nav className='mt-6'>
            <ul>
              <li
                className='flex items-center p-2 gap-3 cursor-pointer border-b border-ketab-gray/20'
                onClick={() => router.push("/account")}>
                <Image
                  src={user.avatar ? user.avatar : "/main/avatar.png"}
                  width={100}
                  height={100}
                  alt='avatar'
                  className='object-cover w-10 h-10 rounded-full'
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                {user.name}
              </li>
              {menuItems.map((item) => (
                <li key={item.id} className='py-1 last:border-b-0'>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`w-full flex items-center hover:text-ketab-green justify-between p-2 text-right transition-colors`}>
                    <div className='flex items-center w-full'>
                      <span
                        className={`ml-3 text-ketab-green ${item.isLogout}`}>
                        {item.icon && <item.icon />}
                      </span>
                      <div className='flex justify-between w-full'>
                        <p className='text-sm'>{item.title}</p>
                        {item.subtitle && (
                          <div className='text-xs text-ketab-gray mt-1 border-r border-ketab-gray/50 pr-2'>
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
              <li
                className='flex items-center p-2 gap-3 bg-ketab-orange cursor-pointer'
                onClick={logout}>
                <MdOutlineLogout />
                خروج
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
