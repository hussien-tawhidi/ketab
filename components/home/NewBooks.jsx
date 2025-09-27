"use client";

import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";
import { fetchBooks } from "@/hooks/books";

export default function NewBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();
        const sortedBooks = fetchedBooks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBooks(sortedBooks.slice(0, 15));
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
    <SliderFiveRows title='جدیدترین کتاب‌ها' data={books} loading={loading} />
  );
}
