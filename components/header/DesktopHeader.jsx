"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Search from "./search/Search";
import { FaRegCircleUser } from "react-icons/fa6";
import BottomHeader from "./BottomHeader";
import { useRouter } from "next/navigation";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import UserMenu from "./UserMenu";

export default function DesktopHeader() {
  const [showMenu, setShowMenu] = useState(true);
  const { user, loading, logout } = useLoggedUser();
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // scrolling down
        setShowMenu(false);
      } else {
        // scrolling up
        setShowMenu(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className='relative pb-[140px] bg-ketab-dark'>
      <div className='fixed top-0 left-0 right-0 w-full z-50 bg-ketab-dark px-[10%]'>
        {/* Top bar */}
        <div className='flex items-center gap-5 justify-between h-[80px]'>
          <Image
            src='/logo.png'
            alt='logo'
            width={40}
            height={40}
            className='object-cover cursor-pointer'
            onClick={()=>router.push("/")}
          />
          <div className='w-full'>
            <Search />
          </div>
          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <div
              className='whitespace-nowrap'
              onClick={() => router.push("/users/signin")}>
              <button className='p-3 rounded-lg border flex items-center gap-1 border-ketab-white/10 transition'>
                <FaRegCircleUser className='text-ketab-gray' />
                ورود / ثبت نام
              </button>
            </div>
          )}
        </div>

        {/* DesktopHeader with smooth fade+slide */}
        <div
          className={`transform-gpu transition-all duration-500 ease-in-out ${
            showMenu
              ? "max-h-[70px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-5"
          }`}>
          <BottomHeader />
        </div>
      </div>
    </header>
  );
}
