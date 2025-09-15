"use client";

import { fetchBooks } from "@/hooks/books";
import { useEffect, useState } from "react";
import BookBreadcrumb from "./BookBreadCrumb";
import BookReviews from "./reviews/BookReview";
import BookHeaderOption from "./BookHeaderOption/BookHeaderOption";

export default function BookDetail({ id }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchBooks();

      const filter = data.find((item) => item._id === id);
      setBook(filter);
    }
    load();
  }, [id]);

  if (!book) return <div className='py-20 text-center'>در حال بارگذاری...</div>;

  const discountPercent = book.discountPrice
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 0;

  return (
    <div className='px-[10%] py-6'>
      <BookBreadcrumb categories={book?.categories || []} title={book?.title} />
      <div className='mt-5'>
        <h1 className='md:text-2xl font-bold my-5'>
          معرفی و دانلود کتاب {book.title}{" "}
        </h1>
        <BookHeaderOption reviews={book.reviews} />

        <BookReviews reviews={book.reviews} />
      </div>
    </div>
  );
}
