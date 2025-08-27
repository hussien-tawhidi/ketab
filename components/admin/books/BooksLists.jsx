"use client";

import { bookListTabelHeader } from "@/constant/admin";
import axios from "axios";
import { useEffect, useState } from "react";
import BooksListsTable from "./BooksListsTable";
import ErrorMsg from "@/components/shared/ErrorMsg";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ToastContext";
import Pagination from "./Pagination";

export default function BooksLists() {
  const [books, setBooks] = useState({
    books: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  console.log("🚀 ~ BooksLists ~ books:", books);
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchData = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `/api/admin/book/admin-pagination?page=${page}&limit=${itemsPerPage}`
      );
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "ایا مطین هستید میخواهید ای کتاب را حذف کنید ؟"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/book/${id}`);

      // Update local state inside the object
      setBooks((prev) => ({
        ...prev,
        books: prev.books.filter((book) => book?._id !== id),
        totalCount: prev.totalCount - 1,
      }));

      addToast("حذف موفقانه صورت کرفت", "success");
    } catch (error) {
      console.error("Failed to delete book:", error);
      addToast("خطا صورت گرفته است", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='p-4'>
      <div className='overflow-x-auto'>
        {books.books.length > 0 ? (
          <BooksListsTable
            books={books.books}
            bookListTabelHeader={bookListTabelHeader}
            handleDelete={handleDelete}
          />
        ) : (
          <ErrorMsg text={"کتاب هنوز ثبت نشده"} />
        )}
        <Pagination
          currentPage={books.currentPage}
          totalPages={books.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
