"use client";

import { IoAdd } from "react-icons/io5";
import BooksLists from "./BooksLists";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/shared/AddBtn";

export default function Books() {
  const router = useRouter();
  return (
    <div className='mt-10'>
      <AddBtn route={"/admin/books/create"} title='افزودن کتاب' />
      <BooksLists />
    </div>
  );
}
