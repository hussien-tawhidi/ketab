"use client";

import { useEffect, useState } from "react";
import CategorisTable from "./CategorisTable";
import { categoriesListTabelHeader } from "@/constant/admin";
import ErrorMsg from "@/components/shared/ErrorMsg";
import AddBtn from "@/components/shared/AddBtn";
import axios from "axios";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ToastContext";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "ایا مطین هستید میخواهید ای دسته بندی را حذف کنید ؟"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/categories/${id}`);

      // Update local categories state
      setCategories((prev) => prev.filter((cate) => cate._id !== id));

      addToast("حذف موفقانه صورت گرفت", "success");
    } catch (error) {
      console.error("Failed to delete category:", error);
      addToast("خطا صورت گرفته است", "error");
    }
  };

  useEffect(() => {
    const fetchCate = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/admin/categories");
        setCategories(data?.cates);
      } catch (error) {
        console.log("🚀 ~ fetchCate ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCate();
  }, []);

  return (
    <div className='pt-10 overflow-hidden px-10'>
      <AddBtn route={"/admin/categories/create"} title='افزودن دسته بندی' />

      {loading ? (
        <Loader />
      ) : categories && categories?.length === 0 ? (
        <ErrorMsg text={"دسته بندی هنوز ثبت نشده"} />
      ) : (
        <CategorisTable
          categories={categories}
          categoriesListTabelHeader={categoriesListTabelHeader}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
