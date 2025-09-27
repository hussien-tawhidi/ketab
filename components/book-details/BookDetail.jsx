"use client";

import { fetchBooks } from "@/hooks/books";
import { useEffect, useState } from "react";
import BookBreadcrumb from "./BookBreadCrumb";
import BookReviews from "./reviews/BookReview";
import BookHeaderOption from "./BookHeaderOption/BookHeaderOption";
import BookDesc from "./BookDesc";
import AboutBookBenefits from "./AboutBookBenefits";
import Loader from "../shared/Loader";
import Specification from "./Specification";
import SliderFiveRows from "../home/SliderFiveRows";
import axios from "axios";

export default function BookDetail({ id }) {
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Fetch the book with its details
        const { data } = await axios.get(`/api/admin/book/${id}`);
        const book = data.book;
        setBook(book);

        // Fetch all books for related filtering
        const related = await fetchBooks();

        if (related && book?.categories) {
          const relatedBooks = related.filter(
            (item) =>
              item._id !== book._id && // exclude current book
              item.categories.some((cat) => book.categories.includes(cat))
          );
          setRelatedBooks(relatedBooks);
        }
      } catch (error) {
        console.log("🚀 ~ load ~ error:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <Loader />;

  if (!relatedBooks || relatedBooks.length === 0) {
    return (
      <div className='text-center py-10 text-gray-400'>
        کتابی برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className='md:px-[10%] px-[2%] py-6'>
      <BookBreadcrumb categories={book?.categories || []} title={book?.title} />
      <div className='mt-5'>
        <h1 className='md:text-2xl font-bold my-5'>
          معرفی و دانلود کتاب {book.title}{" "}
        </h1>
        <BookHeaderOption book={book} />
        <BookDesc book={book} />
        <div className='my-10'>
          <SliderFiveRows
            loading={loading}
            data={relatedBooks}
            description='کتابهای مشابه که شاید دوست داشته باشید مطالعه کنید'
          />
        </div>
        <AboutBookBenefits />
        <Specification
          language={book.language}
          pages={book.pages}
          publishedAt={book.publishedAt}
          publisher={book.publisher}
          title={book.title}
          authors={book.authors}
          categories={book.categories}
          translators={book.translators}
          sepicId={"sepicId"}
        />
        <BookReviews book={book} />
      </div>
    </div>
  );
}
