"use client";

import { fetchBooks } from "@/hooks/books";
import SliderFiveRows from "./SliderFiveRows";
import { useEffect, useState } from "react";

export default function AllPeopRead() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();
        fetchedBooks.map((item) => console.log(item.categories));
        const shuffled = [...fetchedBooks]
          .sort(() => Math.random() - 0.5)
          .slice(10, 20);

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
    <SliderFiveRows
      data={books}
      title='مردم دنیا چی میخواند ؟'
      loading={loading}
    />
  );
}
