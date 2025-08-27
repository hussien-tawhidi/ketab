"use client";

import { useRouter } from "next/navigation";
import EditActionBtn from "../../shared/EditActionBtn";
import DeleteActionBtn from "../../shared/DeleteActionBtn";

export default function BooksListsTable({
  books,
  bookListTabelHeader,
  handleDelete,
}) {
  const router = useRouter();
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full shadow-md rounded-xl overflow-hidden'>
        <thead className='text-ketab-gray border-b border-ketab-gray/50 text-sm'>
          <tr>
            {bookListTabelHeader.map((header) => (
              <th
                key={header.key}
                className='py-3 px-4 text-right font-medium whitespace-nowrap select-none'>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='text-ketab-gray text-sm'>
          {books.map((book, idx) => (
            <tr
              key={book._id}
              className={`transition duration-150 border-b border-ketab-gray/20`}>
              {/* Book cover */}
              <td className='px-4 py-1'>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className='w-14 h-14 object-cover rounded-lg shadow-sm'
                />
              </td>

              {/* Title */}
              <td className='px-4 py-1 font-medium'>{book.title}</td>

              {/* Authors */}
              <td className='px-4 py-1'>{book.authors.join(", ")}</td>

              {/* Categories */}
              <td className='px-4 py-1 space-x-1 rtl:space-x-reverse'>
                {book.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className='inline-block text-xs bg-ketab-green/10 text-ketab-green px-2 py-0.5 rounded-full font-medium'>
                    {cat}
                  </span>
                ))}
              </td>

              {/* Price */}
              <td className='px-4 py-1 font-semibold'>
                {book.price.toLocaleString()}
                <span className='text-xs'>تومان</span>
              </td>

              {/* Actions */}
              <td className='px-4 py-1'>
                <div className='items-center flex gap-2'>
                  <EditActionBtn
                    onEdit={() => router.push(`/admin/books/${book._id}`)}
                    text='ویرایش'
                  />
                  <DeleteActionBtn
                    onDelete={() => handleDelete(book?._id)}
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
