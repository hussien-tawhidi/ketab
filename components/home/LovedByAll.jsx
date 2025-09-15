"use client";
import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";
import { fetchBooks } from "@/hooks/books";

export default function LovedByAll() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks();
      const shuffled = [...fetchedBooks]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      setBooks(shuffled);
    };

    loadBooks();
  }, []);
  return (
    <div className='bg-ketab-red pt-5 rounded-xl'>
      <SliderFiveRows
        data={books}
        title='چطور محبوب همه باشیم ؟'
        description='مهارت‌های اجتماعی، زبان بدن و...'
      />
    </div>
  );
}
