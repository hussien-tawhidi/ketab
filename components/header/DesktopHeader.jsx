"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Search from "./search/Search";
import { FaRegCircleUser } from "react-icons/fa6";
import BottomHeader from "./BottomHeader";
import { useRouter } from "next/navigation";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import UserMenu from "./UserMenu";
import { CiShoppingCart } from "react-icons/ci";
import CartDrawer from "./cart/CartDrawer";
import { useSelector } from "react-redux";

export default function DesktopHeader() {
  const [showMenu, setShowMenu] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, logout } = useLoggedUser();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  // Hydration-safe mount flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide/show header on scroll
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setShowMenu(false); // scrolling down
      } else {
        setShowMenu(true); // scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Avoid hydration mismatch: render nothing until mounted
  if (!mounted) return null;

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
            onClick={() => router.push("/")}
          />

          <div className='w-full'>
            <Search />
          </div>

          {/* Cart */}
          <div className='relative'>
            {cartItems.length > 0 && (
              <span className='text-xs text-white bg-ketab-green w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-2'>
                {cartItems.length}
              </span>
            )}
            <CiShoppingCart
              onClick={() => setOpenCart(true)}
              className='text-2xl text-ketab-gray cursor-pointer'
            />
          </div>
          <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

          {/* Auth */}
          {user ? (
            <div className='flex items-center gap-3'>
              <UserMenu user={user} logout={logout} />
            </div>
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

        {/* Bottom nav */}
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
