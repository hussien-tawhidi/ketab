"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleForm from "@/components/admin/roles/RoleForm";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import axios from "axios";
import { useToast } from "@/components/ToastContext";
import { TiArrowLeft } from "react-icons/ti";

export default function CreateRoles() {
  const { user } = useLoggedUser();
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/role", {
        ...formData,
        userId: user?.userId,
      });
      if (res.status === 201 || res.status === 200) {
        router.push("/admin/roles");
      } else {
        addToast("خطا در ایجاد نقش", "error");
      }
    } catch {
      addToast("خطا در برقراری ارتباط با سرور", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 mt-10'>
      <div className='flex justify-between my-5'>
        <h2 className='text-xl font-bold mb-4'>ایجاد نقش جدید</h2>
        <button
          onClick={() => router.push("/admin/roles")}
          className='py-1.5 flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
          <TiArrowLeft className='text-2xl' />
        </button>
      </div>
      <RoleForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel='ایجاد نقش'
      />
    </div>
  );
}
