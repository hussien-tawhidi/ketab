"use client";
import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";
import { fetchBooks } from "@/hooks/books";

export default function LovedByAll() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();
        const shuffled = [...fetchedBooks]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        setBooks(shuffled);
      } catch (error) {
        console.log("🚀 ~ loadBooks ~ error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);
  if (!books) return null;
  return (
    <div className='bg-ketab-red pt-5 rounded-xl'>
      <SliderFiveRows
        data={books}
        loading={loading}
        title='چطور محبوب همه باشیم ؟'
        description='مهارت‌های اجتماعی، زبان بدن و...'
      />
    </div>
  );
}
