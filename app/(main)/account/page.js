"use client";

import Loader from "@/components/shared/Loader";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaUserCircle, FaBook, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function UserAccountPage() {
  const router = useRouter();
  const { user, loading, logout } = useLoggedUser();

  // ✅ Redirect AFTER render, not during render
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/users/signin"); // replace avoids loop in history
    }
  }, [loading, user, router]);

  if (loading) return <Loader />;
  if (!user) return null; // wait until redirect or data ready
  
  const cards = [
    {
      id: 1,
      title: "کتاب‌های من",
      desc: "لیست کتاب‌های دانلود یا خریداری شده",
      link: "/account/my-lib",
      icon: <FaBook className='text-3xl text-ketab-green mb-3' />,
    },
    {
      id: 2,
      link: "/account/my-lib",
      title: "علاقه‌مندی‌ها",
      desc: "کتاب‌هایی که به لیست علاقه‌مندی‌ها اضافه کرده‌اید",
      icon: <FaHeart className='text-3xl text-ketab-red mb-3' />,
    },
    {
      id: 3,
      title: "خروج",
      link: null,
      desc: "از حساب کاربری خارج شوید",
      icon: <FaSignOutAlt className='text-3xl text-ketab-dark-yellow mb-3' />,
    },
  ];

  return (
    <div className='min-h-screen text-ketab-gray py-10 px-4'>
      <div className='max-w-4xl mx-auto shadow-lg rounded-2xl p-6'>
        {/* Header */}
        <div className='flex items-center justify-between gap-4 border-b pb-6 mb-6'>
          <div className='flex items-center gap-4'>
            <FaUserCircle className='text-6xl text-ketab-green' />
            <div>
              <h1 className='text-2xl font-bold'>{user?.name}</h1>
              <p className='text-ketab-gray text-sm'>
                خوش آمدید! اینجا اطلاعات و فعالیت‌های شما نمایش داده می‌شود.
              </p>
            </div>
          </div>
          <Link
            href={"/account/profile-edit"}
            className='text-ketab-green border border-ketab-green p-1 rounded hover transition-all hover:bg-ketab-green hover:text-ketab-white'>
            <HiOutlinePencil />
          </Link>
        </div>

        {/* Sections */}
        <div className='grid md:grid-cols-3 gap-6'>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col items-center bg-ketab-dark rounded-xl p-6 shadow hover:shadow-md transition cursor-pointer`}>
              {card.icon}
              <h2 className='font-semibold'>{card.title}</h2>
              <p className='text-sm font-light mt-1'>{card.desc}</p>
              {!card.link && (
                <button
                  onClick={() => logout()}
                  className={`text-[12px] transition-all hover:bg-ketab-red hover:text-ketab-white cursor-pointer text-ketab-red mt-3 border border-ketab-red px-3 rounded py-0.5 flex items-center gap-2 font-light`}>
                  {card.title}
                </button>
              )}
              {card.link && (
                <Link
                  href={card?.link}
                  className={`text-[12px] text-ketab-green flex items-center gap-2 font-light`}>
                  <MdKeyboardArrowRight className='text-sm' />
                  {card.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
