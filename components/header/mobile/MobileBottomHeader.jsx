"use client";

import { usePathname, useRouter } from "next/navigation";
import { TbCategory2 } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { PiNotebookDuotone } from "react-icons/pi";
export default function MobileBottomHeader() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className='md:hidden block fixed bottom-0 left-0 right-0 bg-ketab-dark w-full p-3 z-10'>
      <ul className='flex w-full justify-between gap-3'>
        <li
          className={`flex flex-col items-center ${
            pathname === "/" && "text-ketab-green"
          }`}
          onClick={() => router.push("/")}>
          <CiHome className='text-2xl' /> خانه
        </li>
        <li
          className={`flex flex-col items-center ${
            pathname === "/mobile-view-categories" && "text-ketab-green"
          }`}
          onClick={() => router.push("/mobile-view-categories")}>
          <TbCategory2 className='text-2xl' /> دسته بندی
        </li>
        <li
          className={`flex flex-col items-center ${
            pathname === "/account/mylib" && "text-ketab-green"
          }`}
          onClick={() => router.push("/account/mylib")}>
          <PiNotebookDuotone className='text-2xl' />
          کتابخانه من
        </li>
      </ul>
    </div>
  );
}
