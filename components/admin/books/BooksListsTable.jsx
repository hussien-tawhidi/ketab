"use client";

import { useRouter } from "next/navigation";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TbDatabaseEdit } from "react-icons/tb";

export default function BooksListsTable({
  books,
  bookListTabelHeader,
  sortConfig,
  onSort,
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
                onClick={() => onSort(header.key)}
                className='py-3 px-4 text-right font-medium whitespace-nowrap cursor-pointer select-none'>
                {header.label}
                {sortConfig?.key === header.key && (
                  <span className='ml-1'>
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
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
                {book.price.toLocaleString()}{" "}
                <span className='text-xs'>تومان</span>
              </td>

              {/* Actions */}
              <td className='px-4 py-1 gap-2'>
                <button
                  onClick={() => handleDelete(book?._id)}
                  className='px-2 py-1 border border-ketab-orange ml-2 rounded-md text-ketab-orange hover:bg-ketab-orange/10 transition'
                  title='حذف'>
                  <RiDeleteBin7Line size={18} />
                </button>
                <button
                  onClick={() => router.push(`/admin/books/${book._id}`)}
                  className='px-2 py-1 rounded-md hover:bg-ketab-gray/10 border border-ketab-gray transition'
                  title='ویرایش'>
                  <TbDatabaseEdit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
