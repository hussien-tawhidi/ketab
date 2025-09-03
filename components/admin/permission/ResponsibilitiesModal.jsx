"use client";
import { useEffect } from "react";

export default function ResponsibilitiesModal({ open, onClose, user }) {
  // Prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !user) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-ketab-bg/50'
      onClick={onClose} // close on outside click
    >
      <div
        className='bg-ketab-light rounded-xl shadow-xl w-full max-w-md p-6 relative'
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 left-3 text-ketab-gray'>
          ✖
        </button>

        {/* Title */}
        <h2 className='text-lg font-bold mb-4'>
          وظایف و مسئولیت‌ها - {user?.userId?.name}
        </h2>

        {/* Responsibilities */}
        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-ketab-gray'>مسئولیت‌ها:</h3>
            {user?.permissions?.length ? (
              <ul className='list-disc list-inside text-sm text-ketab-gray/80'>
                {user.permissions.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className='text-sm text-ketab-gray/50'>
                هیچ مسئولیتی تعریف نشده
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
