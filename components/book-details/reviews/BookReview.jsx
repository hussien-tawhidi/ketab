"use client";

import axios from "axios";
import ReviewAverageStars from "./ReviewAverageStars";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function BookReviews({ book }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [localReviews, setLocalReviews] = useState(book?.reviews || []);

  const { user } = useLoggedUser();
  const userId = user?.userId;

  const addReview = async () => {
    if (!comment.trim()) {
      alert("لطفاً نظر خود را وارد کنید");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/admin/book/${book?._id}/reviews`,
        {
          comment,
          rating,
          userId,
        }
      );

      setLocalReviews((prev) => [...prev, data?.newReview]);
      toast.success("کمنت ثبت شد !", {
        icon: <FaCheck className='text-ketab-green' />,
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#5e942b",
          borderBottom: "#5e942b",
        },
      });
      setComment("");
      setRating(5);
    } catch (error) {
      console.log("🚀 ~ addReview ~ error:", error);
      alert(error.response?.data?.message || "خطا در ثبت نظر");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/admin/book/${book._id}/reviews/${reviewId}`);
      setLocalReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
      toast.success("کمنت حذف شد !", {
        icon: <RiDeleteBin5Line className='text-ketab-red' />,
        style: {
          borderRadius: "10px",
          background: "#222",
          color: "#b53737",
        },
      });
    } catch (error) {
      console.log("🚀 ~ onDelete ~ error:", error);
    }
  };

  return (
    <section className='mt-10 space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-ketab-white'>نظرات کاربران</h2>
        <ReviewAverageStars
          reviews={localReviews}
          reviewLength={localReviews.length}
        />
      </div>

      {/* Write review */}
      <ReviewForm
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
        loading={loading}
        onSubmit={addReview}
        userId={userId}
      />

      {/* Reviews list */}
      <div className='space-y-4'>
        {!localReviews?.length > 0 ? (
          <p className='text-ketab-gray'>هنوز نظری ثبت نشده است.</p>
        ) : (
          <div className='grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 gap-1.5'>
            {localReviews?.map((rev) => {
              const canModify =
                rev?.user?.toString() === userId?.toString() 

              return (
                <ReviewCard
                  key={rev._id}
                  userId={userId}
                  rev={rev}
                  id={book._id}
                  canModify={canModify}
                  onDelete={onDelete}
                  onUpdate={(updatedRev) => {
                    setLocalReviews((prev) =>
                      prev.map((r) =>
                        r._id === updatedRev._id ? updatedRev : r
                      )
                    );
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
