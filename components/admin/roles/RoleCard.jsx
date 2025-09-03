"use client";

import DeleteActionBtn from "@/components/shared/DeleteActionBtn";
import EditActionBtn from "@/components/shared/EditActionBtn";
import { IoReturnDownBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";

export default function RoleCard({ role, onDelete, deleting }) {
  const router = useRouter();

  return (
    <div className='bg-ketab-light border border-ketab-gray/20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between'>
      {/* Role Header */}
      <h2 className='text-xl font-bold text-ketab-gray mb-2 flex items-center gap-3'>
        <span className='w-10 h-10 rounded-full bg-gradient-to-br from-ketab-gray to-ketab-light flex items-center justify-center text-ketab-white font-bold shadow'>
          {role.name?.charAt(0)}
        </span>
        {role.name}
      </h2>

      {/* Description */}
      <p className='text-sm text-ketab-gray/70 mb-4 line-clamp-2'>
        {role.description || "بدون توضیحات"}
      </p>

      {/* Responsibilities */}
      <div className='mb-4'>
        <h3 className='font-semibold text-ketab-gray mb-2'>مسئولیت‌ها:</h3>
        {role.permissions?.length ? (
          <ul className='text-sm text-ketab-gray/80 space-y-1'>
            {role.permissions.map((r, idx) => (
              <li key={idx} className='flex items-center gap-2'>
                <FaRegCheckCircle className='text-ketab-green' />
                {r}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-ketab-gray/50'>هیچ مسئولیتی تعریف نشده</p>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 mt-auto mb-5'>
        <DeleteActionBtn
          onDelete={() => onDelete(role._id)}
          deletingText='در حال حذف'
          text='حذف'
          isLoading={deleting === role._id}
        />
        <EditActionBtn
          onEdit={() => router.push(`/admin/roles/${role._id}`)}
          text='ویرایش'
        />
      </div>

      {/* Created By */}
      <div className='mt-auto text-xs text-ketab-gray/60 border-t border-ketab-gray/20 pt-2'>
        ایجاد شده توسط:{" "}
        <span className='font-semibold'>
          {role?.createdBy?.name || "نامشخص"}
        </span>
      </div>
    </div>
  );
}
