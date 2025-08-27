"use client";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className='flex justify-center mt-8'>
      <nav className='flex items-center gap-1.5 text-ketab-gray'>
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            currentPage === 1
              ? "hidden"
              : "bg-ketab-dark text-red hover:bg-ketab-orange/5"
          }`}
          aria-label='Previous page'>
          <BsArrowRight />
        </button>
        {/* jump to first */}
        {currentPage > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className='flex items-center justify-center w-10 h-10 rounded-full bg-ketab-dark hover:bg-ketab-gray/5 border border-ketab-gray/10 transition-all'>
              1
            </button>
            <span>...</span>
          </>
        )}
        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
              currentPage === pageNum
                ? "bg-ketab-green text-ketab-white"
                : "bg-light hover:bg-darker-black/10"
            }`}
            aria-current={currentPage === pageNum ? "page" : undefined}>
            {pageNum}
          </button>
        ))}

        {/* Ellipsis and last page */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className='mx-1 text-darker-black/50'>...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className='flex items-center justify-center w-10 h-10 rounded-full bg-ketab-light border border-ketab-gray transition-all'>
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            currentPage === totalPages
              ? "hidden cursor-not-allowed"
              : "bg-ketab-light"
          }`}
          aria-label='Next page'>
          <BsArrowLeft />
        </button>
      </nav>
    </div>
  );
}
