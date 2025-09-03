"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastContext";
import axios from "axios";
import AddBtn from "@/components/shared/AddBtn";
import RoleCard from "./RoleCard";
import EmptyCard from "@/components/shared/EmptyCard";
import Loader from "@/components/shared/Loader";
import { useRoles } from "@/hooks/fetchRoles";

export default function Roles() {
  const { roles,setRoles, loading, error } = useRoles();
  console.log("🚀 ~ Roles ~ error:", error)

  const [deleting, setDeleting] = useState(null);
  const { addToast } = useToast();

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await axios.delete(`/api/admin/role/${id}`);
      if (res.status === 200) addToast("موفقانه حذف شد", "success");
      setRoles((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      addToast(`خطا صورت گرفته لطفا دوباره تلاش کنید ${error}`);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='p-6 min-h-screen'>
      {/* Add Button */}
      <div className='my-10'>
        <AddBtn route={"/admin/roles/create"} title={"افزودن نقش جدید"} />
      </div>

      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-extrabold text-ketab-gray'>
          📌 نقش‌ها و مسئولیت‌ها
        </h1>
        <p className='text-sm text-ketab-gray/70'>
          لیست نقش‌ها همراه با وظایف و مسئولیت‌ها
        </p>
      </div>

      {/* Roles Grid */}
      {roles.length === 0 ? (
        <EmptyCard
          title='هیچ نقشی تعریف نشده'
          description='برای شروع مدیریت سیستم، یک نقش جدید ایجاد کنید'
          actionLabel='ایجاد نقش جدید'
          actionRoute='/admin/roles/create'
        />
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {roles.map((role) => (
            <RoleCard
              key={role._id}
              role={role}
              onDelete={handleDelete}
              deleting={deleting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
