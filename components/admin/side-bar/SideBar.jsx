"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GeneralList from "./GeneralList";
import UserProfileMenu from "./UserProfileMenu";
import AdminProfile from "./AdminProfile";
import { IoStorefrontOutline } from "react-icons/io5";

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
      <h3
        onClick={() => router.push("/")}
        className='text-xs font-semibold text-ketab-gray cursor-pointer w-full hover:bg-ketab-green/5 text-md flex gap-2 uppercase tracking-wider pb-2 px-3 py-3'>
        <IoStorefrontOutline className='text-ketab-green text-lg' />
        فروشگاه
      </h3>

      <GeneralList openMenus={openMenus} toggleMenu={toggleMenu} />
      <UserProfileMenu openMenus={openMenus} toggleMenu={toggleMenu} />
      <AdminProfile />
    </div>
  );
}
