"use client";

import TextArea from "@/components/shared/TextArea";
import { FaStar } from "react-icons/fa";

export default function ReviewForm({
  comment,
  setComment,
  rating,
  setRating,
  loading,
  onSubmit,
  userId,
}) {
  if (!userId) {
    return (
      <p className='text-ketab-gray text-sm'>
        برای ثبت نظر لطفاً وارد حساب کاربری شوید.
      </p>
    );
  }

  return (
    <div className='bg-ketab-dark/60 p-4 rounded-xl border border-ketab-white/10 shadow'>
      <h3 className='text-ketab-white font-semibold mb-3'>
        نظر خود را ثبت کنید
      </h3>

      {/* Stars */}
      <div className='flex gap-1 mb-3'>
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            onClick={() => setRating(i + 1)}
            className={`cursor-pointer text-2xl transition ${
              i < rating ? "text-ketab-green" : "text-ketab-gray"
            }`}
          />
        ))}
      </div>
      <TextArea
        label={"نظر خود را وارد کنید"}
        placeholder='تایپ کنید ...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className='mt-3 px-4 py-2 bg-ketab-green text-ketab-white rounded-lg hover:bg-green-600 transition disabled:opacity-50'>
        {loading ? "در حال ارسال..." : "ارسال نظر"}
      </button>
    </div>
  );
}
