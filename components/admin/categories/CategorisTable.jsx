"use client";

import { useRouter } from "next/navigation";
import EditActionBtn from "../../shared/EditActionBtn";
import DeleteActionBtn from "../../shared/DeleteActionBtn";

export default function CategorisTable({
  categories,
  categoriesListTabelHeader,
  handleDelete,
}) {
  const router = useRouter();
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full shadow-md rounded-xl overflow-hidden'>
        <thead className='text-ketab-gray border-b border-ketab-gray/50 text-sm'>
          <tr>
            {categoriesListTabelHeader.map((header) => (
              <th
                key={header.key}
                className='py-3 px-4 text-right font-medium whitespace-nowrap select-none'>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='text-ketab-gray text-sm'>
          {categories.map((cate, idx) => (
            <tr
              key={cate._id}
              className={`transition duration-150 border-b border-ketab-gray/20`}>
              {/* Book cover */}
              <td className='px-4 py-3'>{cate.name}</td>
              {/* Authors */}
              <td className='px-4 py-3'>{cate.isActive}</td>

              {/* Categories */}
              <td className='px-4 py-3 space-x-1 rtl:space-x-reverse'>
                {new Date(cate.createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>

              {/* Actions */}
              <td className='px-4 py-3'>
                <div className='items-center flex gap-2'>
                  <EditActionBtn
                    onEdit={() => router.push(`/admin/categories/${cate?._id}`)}
                    text='ویرایش'
                  />
                  <DeleteActionBtn
                    onDelete={() => handleDelete(cate?._id)}
                    text='حذف'
                    deletingText='در حال حذف...'
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
