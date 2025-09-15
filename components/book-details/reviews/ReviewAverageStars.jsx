import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ReviewAverageStars({ reviews = [], reviewLength }) {
  // Keep as number
  const avgRatingNum =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 4.5;

  const avgRating = avgRatingNum.toFixed(1); // string for display
  const fullStars = Math.floor(avgRatingNum); // number
  const hasHalf = avgRatingNum - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className='flex items-center gap-2'>
      <span className='text-lg font-semibold text-ketab-green'>
        {avgRating}
      </span>
      <div className='flex '>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} className='text-ketab-green' />
        ))}
        {hasHalf && <FaStarHalfAlt className='text-ketab-green rotate-y-180' />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} className='text-gray-600' />
        ))}
      </div>
      {reviewLength && (
        <span className='text-sm text-ketab-gray'>({reviews.length} نظر)</span>
      )}
    </div>
  );
}
