"use client";

import Image from "next/image";
import { FaCamera } from "react-icons/fa";

export default function AvatarUpload({
  avatar,
  onChange,
  label = "آپلود تصویر پروفایل",
}) {
  return (
    <div className='flex flex-col items-center space-y-3'>
      <div className={`relative`}>
        <Image
          width={100}
          height={100}
          src={avatar || "/default-avatar.png"}
          alt='Avatar'
          className={`rounded-full w-20 h-20 object-cover border border-ketab-gray/30 shadow-sm`}
        />
        <label className='absolute bottom-0 right-0 bg-ketab-green/50 text-white p-2 rounded-full cursor-pointer hover:bg-ketab-green/90 transition'>
          <FaCamera />
          <input type='file' className='hidden' onChange={onChange} />
        </label>
      </div>
      <p className='text-sm text-ketab-gray'>{label}</p>
    </div>
  );
}
