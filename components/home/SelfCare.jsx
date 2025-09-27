"use client";

import { fetchBooks } from "@/hooks/books";
import { useEffect, useState } from "react";
import SliderFiveRows from "./SliderFiveRows";

export default function SelfCare() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["روانشناسی", "خودشناسی", "موفقیت", "معنوی"];

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();

        const filtered = fetchedBooks.filter((book) =>
          book.categories?.some((cat) => categories.includes(cat))
        );
        setBooks(filtered.slice(0, 15));
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
    <div className='bg-ketab-dark-yellow pt-5 rounded-xl'>
      <SliderFiveRows
        title='درمانگر خودت باش !'
        data={books}
        textColor='text-ketab-bg'
        description='کنترول استرس، انگیزیشی ...'
        loading={loading}
      />
    </div>
  );
}
