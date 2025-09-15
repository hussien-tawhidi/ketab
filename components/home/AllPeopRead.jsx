"use client";

import { fetchBooks } from "@/hooks/books";
import SliderFiveRows from "./SliderFiveRows";
import { useEffect, useState } from "react";

export default function AllPeopRead() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks();
      fetchedBooks.map((item) => console.log(item.categories));
      const shuffled = [...fetchedBooks]
        .sort(() => Math.random() - 0.5)
        .slice(10, 20);

      setBooks(shuffled);
    };

    loadBooks();
  }, []);
  return <SliderFiveRows data={books} title='مردم دنیا چی میخواند ؟' />;
}
