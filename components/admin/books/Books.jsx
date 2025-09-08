"use client";

import BooksLists from "./BooksLists";
import AddBtn from "@/components/shared/AddBtn";

export default function Books() {
  return (
    <div className='mt-10'>
      <AddBtn route={"/admin/books/create"} title='افزودن کتاب' />
      <BooksLists />
    </div>
  );
}
