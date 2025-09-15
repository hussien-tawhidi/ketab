"use client";
import { GrHome } from "react-icons/gr";
import { MdOutlineBook } from "react-icons/md";
import NavItem from "./NavItem";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Image from "next/image";
export default function BottomHeader() {
  return (
    <>
      
    <div className='flex items-center justify-between'>
      <ul className='flex items-center gap-5 h-full'>
        <NavItem icon={<GrHome />} label={"خانه"} href='/' />
        <NavItem icon={<MdOutlineBook />} label={"کتاب الکترونبیکی"} href='/' hover/>
        <NavItem
          icon={<IoMdInformationCircleOutline />}
          label={"پشتیبانی"}
          href='/contact'
          />
      </ul>
      <div className='flex items-center gap-2 text-ketab-green font-extrabold'>
        <Image
          src={"/logo.png"}
          alt='logo'
          width={30}
          height={30}
          className='object-cover'
          /> اپلیکیشن
      </div>
    </div>
          </>
  );
}
