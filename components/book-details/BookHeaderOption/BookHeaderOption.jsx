"use client";
import { useState, useEffect } from "react";
import { BsGift } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { GrShareOption } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ReviewAverageStars from "../reviews/ReviewAverageStars";
import ShareModal from "./ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "@/store/slice/favoritesSlice";
import { addToBookMark } from "@/store/slice/bookMarkSlice";

export default function BookHeaderOption({ book }) {
  const [showModal, setShowModal] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const dispatch = useDispatch();
  const faveItems = useSelector((state) => state.favorites.favorites);
  const bookMarkItems = useSelector((state) => state.bookMarks.items);


  // derive isFav from redux state
  const isFav = faveItems.some((item) => item._id === book._id);
  const isBookmarked = bookMarkItems.some((item) => item._id === book._id);

  const toggleFav = () => {
    dispatch(addToFavorites(book));
  };
  
  const toggleBookMark = () => {
    dispatch(addToBookMark(book));
  };

  const options = [
    {
      label: isFav ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها",
      icon: isFav ? (
        <FaHeart className='text-xl text-red-500' />
      ) : (
        <CiHeart className='text-xl' />
      ),
      onClick: toggleFav,
    },
    {
      label: "افزودن به مطالعه",
      icon: <LuBookMarked className={isBookmarked?"text-ketab-green":""} />,
      onClick: toggleBookMark,
    },
    {
      label: "اشتراک‌گذاری",
      icon: <GrShareOption className='text-xl' />,
      onClick: () => setShowModal(true),
    },
  ];

  return (
    <div className='flex justify-between border-b border-ketab-gray/30 pb-2 items-center gap-4'>
      {/* ⭐ Average stars */}
      <ReviewAverageStars reviews={book.reviews} />

      {/* 📌 Action buttons */}
      <div className='flex items-center gap-3 md:gap-5'>
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={opt.onClick}
            aria-label={opt.label}
            title={opt.label}
            className='p-2 rounded-full hover:bg-ketab-green/10 transition-all duration-200 text-ketab-gray hover:text-ketab-green '>
            {opt.icon}
          </button>
        ))}
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
