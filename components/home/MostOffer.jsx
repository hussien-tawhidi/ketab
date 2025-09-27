"use client";

import { fetchBooks } from "@/hooks/books";
import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";

export default function MostOffer() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();

        // sort by biggest discount first
        const sorted = [...fetchedBooks].sort((a, b) => {
          const discountA = ((a.price - a.discountPrice) / a.price) * 100;
          const discountB = ((b.price - b.discountPrice) / b.price) * 100;
          return discountB - discountA; // descending order
        });

        setBooks(sorted.slice(0, 10));
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
    <div className='pt-5 mt-10 rounded-xl'>
      <SliderFiveRows
        title='تخفیف های ویژه'
        data={books}
        description=''
        loading={loading}
      />
    </div>
  );
}
