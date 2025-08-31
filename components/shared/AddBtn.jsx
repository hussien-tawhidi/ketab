"use client";

import { useRouter } from "next/navigation";
import { IoAdd } from "react-icons/io5";

export default function AddBtn({ title, route }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(route)}
      className='py-2 flex items-center whitespace-nowrap gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
      <IoAdd /> {title}
    </button>
  );
}
