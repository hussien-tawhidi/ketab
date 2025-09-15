"use client";

import { FaStar } from "react-icons/fa";
import ReviewAverageStars from "./ReviewAverageStars";

export default function BookReviews({ reviews = [] }) {
  // Calculate average rating

  return (
    <section className='mt-10'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-ketab-white'>نظرات کاربران</h2>
        <ReviewAverageStars reviews={reviews} />
      </div>

      {/* Reviews list */}
      <div className='space-y-4'>
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className='bg-ketab-dark/60 border border-ketab-white/10 rounded-xl p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='font-semibold text-ketab-white'>{rev.user}</h3>
              <div className='flex'>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < rev.rating ? "text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className='text-ketab-gray text-sm leading-relaxed'>
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
