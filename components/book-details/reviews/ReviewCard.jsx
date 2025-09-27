"use client";

import { FaCheck, FaStar } from "react-icons/fa";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import toast from "react-hot-toast";
import { BiError } from "react-icons/bi";

export default function ReviewCard({ rev, onDelete, canModify, id, onUpdate }) {
  console.log("🚀 ~ ReviewCard ~ rev:", rev.user)
  const [editModal, setEditModal] = useState(false);
  const [editComment, setEditComment] = useState(rev?.comment || "");
  const [editRating, setEditRating] = useState(rev?.rating || 0);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setEditModal((prev) => !prev);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/admin/book/${id}/reviews/${rev?._id}`, {
        comment: editComment,
        rating: editRating,
      });

      setEditModal(false);

      toast.success(res.data.message || "کمنت حذف شد !", {
        icon: <FaCheck className='text-ketab-green' />,
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#5e942b",
        },
      });
      onUpdate(res.data.updatedReview);
    } catch (error) {
      // console.log("🚀 ~ handleUpdate ~ error:", error.response.data.message);
      toast.success(error?.response?.data?.message || "خطا در ویرایش نظر", {
        icon: <BiError className='text-ketab-red' />,
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#b53737",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Review Card */}
      <div className='bg-ketab-dark/50 border border-ketab-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
        <div className='flex items-start justify-between mb-3'>
          {/* User Info */}
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-ketab-gray flex items-center justify-center text-ketab-white font-bold uppercase'>
              {rev?.user?.name?.[0] || "U"}
            </div>
            <div>
              <h3 className='font-semibold text-ketab-white'>
                {rev?.user?.name || "کاربر ناشناس"}
              </h3>
              {rev?.createdAt && (
                <span className='text-xs text-ketab-gray'>
                  {new Date(rev?.createdAt).toLocaleDateString("fa-IR")}
                </span>
              )}
            </div>
          </div>

          {/* Stars + Actions */}
          <div className='flex items-center gap-2'>
            <div className='flex'>
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg transition-colors duration-200 ${
                    i < (rev?.rating ?? 0)
                      ? "text-ketab-green"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>

            {canModify && (
              <div className='flex gap-2'>
                <FiEdit
                  onClick={toggleModal}
                  className='text-ketab-gray hover:text-ketab-green cursor-pointer transition-colors'
                  title='ویرایش نظر'
                />
                <FiTrash2
                  onClick={() => onDelete(rev?._id)}
                  className='text-ketab-gray hover:text-ketab-red cursor-pointer transition-colors'
                  title='حذف نظر'
                />
              </div>
            )}
          </div>
        </div>

        {/* Comment */}
        <p className='text-ketab-gray text-sm leading-relaxed'>
          {rev?.comment}
        </p>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
          <div className='bg-ketab-dark rounded-xl p-6 w-full max-w-md border border-ketab-white/10 shadow-lg'>
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-ketab-white'>
                ویرایش نظر
              </h2>
              <FiX
                onClick={toggleModal}
                className='text-ketab-gray hover:text-ketab-red cursor-pointer'
              />
            </div>

            {/* Reused Form */}
            <ReviewForm
              comment={editComment}
              setComment={setEditComment}
              rating={editRating}
              setRating={setEditRating}
              loading={loading}
              onSubmit={handleUpdate}
              userId={"dummy"} // force render (we only want the form fields)
            />
          </div>
        </div>
      )}
    </>
  );
}
