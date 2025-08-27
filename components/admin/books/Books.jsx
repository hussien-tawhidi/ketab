"use client"

import { IoAdd } from "react-icons/io5";
import BooksLists from "./BooksLists";
import { useRouter } from "next/navigation";

export default function Books() {
    const router=useRouter()
  return (
    <div className='mt-10'>
      <button
        onClick={() => router.push("/admin/books/create")}
        className='py-1.5 flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
        <IoAdd /> افزودن کتاب
      </button>
      <BooksLists />
    </div>
  );
}
