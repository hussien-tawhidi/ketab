"use client";

import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";
import { fetchBooks } from "@/hooks/books";

export default function NewBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks();
      const sortedBooks = fetchedBooks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBooks(sortedBooks.slice(0, 15));
    };

    loadBooks();
  }, []);

  return <SliderFiveRows title='جدیدترین کتاب‌ها' data={books} />;
}
