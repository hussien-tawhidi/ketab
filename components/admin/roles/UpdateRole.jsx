"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ToastContext";
import RoleForm from "./RoleForm";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { TiArrowLeft } from "react-icons/ti";
import Loader from "@/components/shared/Loader";

export default function UpdateRole({ id }) {
  const router = useRouter();
  const { addToast } = useToast();
  const { user } = useLoggedUser();
  console.log("🚀 ~ UpdateRole ~ user:", user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // ✅ Fetch role data by id
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data } = await axios.get(`/api/admin/role/${id}`);
        setName(data.role.name);
        setDescription(data.role.description || "");
        setPermissions(
          data.role.permissions?.length ? data.role.permissions : [""]
        );
      } catch (error) {
        addToast("خطا در بارگذاری نقش", "error");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchRole();
  }, [id, addToast]);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/admin/role/${id}`, {
        name,
        description,
        permissions,
        userId: user.userId,
      });

      if (res.status === 200) {
        addToast("نقش با موفقیت ویرایش شد", "success");
        router.push("/admin/roles");
      } else {
        addToast("خطا در ویرایش نقش", "error");
      }
    } catch (err) {
      addToast("خطا در برقراری ارتباط با سرور", "error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <Loader />;

  // ✅ Build roleData object from state
  const roleData = { name, description, permissions };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-ketab-light mt-10 shadow rounded-xl'>
      <div className='flex justify-between my-5'>
        <h2 className='text-xl font-bold mb-4'>ویرایش نقش </h2>
        <button
          onClick={() => router.push("/admin/roles")}
          className=' flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
          <TiArrowLeft className='text-2xl' />
        </button>
      </div>
      <RoleForm
        initialData={roleData}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel='ذخیره تغییرات'
      />
    </div>
  );
}
