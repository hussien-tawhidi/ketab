"use client";
import { useState } from "react";
import { BsGift } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { GrShareOption } from "react-icons/gr";
import ReviewAverageStars from "../reviews/ReviewAverageStars";
import ShareModal from "./ShareModal";

export default function BookHeaderOption({ reviews }) {
  const [showModal, setShowModal] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className='flex justify-between border-b border-ketab-gray/30 pb-1 items-center gap-4'>
      <ReviewAverageStars reviews={reviews} />
      <div className='text-ketab-gray flex items-center md:gap-5 gap-2'>
        <button className='hover:text-ketab-green transition-all duration-200 cursor-pointer'>
          <BsGift />
        </button>
        <button className='hover:text-ketab-green transition-all duration-200 cursor-pointer'>
          <LuBookMarked />
        </button>
        <button
          onClick={() => setShowModal(true)}
          className='hover:text-ketab-green transition-all duration-200 cursor-pointer'>
          <GrShareOption />
        </button>
      </div>

      {/* Share modal */}
      <ShareModal
        show={showModal}
        onClose={() => setShowModal(false)}
        url={currentUrl}
      />
    </div>
  );
}
