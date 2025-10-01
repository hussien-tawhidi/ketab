"use client";

import { menuItems } from "@/constant/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarMenu() {
  const pathname = usePathname();

  return (
    <aside className='py-10'>
      <ul className='space-y-1 px-2'>
        {menuItems.map((item, index) => {
          const active = pathname === item.href;
          return (
            <li key={item.id || index}>
              <Link
                href={item.href}
                className='flex relative text-ketab-white items-center gap-3 text-sm rounded-xl px-3 py-2 font-thin'>
                <item.icon className='w-4 h-4' />
                <span>{item.title}</span>
                {active && (
                  <span className='h-[1px] w-full bg-ketab-green absolute bottom-0 left-0 right-0'></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
