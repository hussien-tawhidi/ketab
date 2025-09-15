"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDown } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function SliderFiveRows({
  data = [],
  title = "",
  link = "/",
  description = "",
  textColor = "",
}) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1536, // 2xl breakpoint
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1280, // xl breakpoint
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={`slider-container relative md:px-3 px-1.5 ${textColor}`}>
      <div className='flex justify-between items-center font-extrabold mb-5'>
        <p className='flex flex-col'>
          {title} <span className='text-sm font-normal'>{description}</span>
        </p>
        <Link
          href={link}
          className='flex items-center gap-2 transition-all hover:text-ketab-green duration-200'>
          مشاهده <IoIosArrowDown className='rotate-90' />
        </Link>
      </div>
      {data && (
        <Slider {...settings}>
          {data.map((item, i) => {
            const discountPercent = Math.round(
              ((item.price - item.discountPrice) / item.price) * 100
            );
            return (
              <Link
                href={`/${item._id}`}
                key={i}
                className='overflow-hidden rounded-2xl relative px-2'>
                {item.discountPrice && (
                  <span className='absolute top-1 left-3 bg-ketab-red p-1 text-ketab-white'>
                    {discountPercent}%
                  </span>
                )}
                <Image
                  src={item.coverImage || ""}
                  width={200}
                  loading='lazy'
                  height={200}
                  className='h-full w-full object-cover overflow-hidden rounded-2xl'
                  alt='book cover'
                />
                <div className='text-right flex flex-col md:gap-1.5 p-1.5'>
                  <h2 className='font-bold md:text-xl text-[12px] whitespace-nowrap hover:text-ketab-green'>
                    {item.title.length > 10 ? (
                      <span>...{item.title.slice(0, 10)}</span>
                    ) : (
                      item.title
                    )}
                  </h2>
                  <p
                    key={i}
                    className='md:text-[12px] text-[10px] hover:text-ketab-green whitespace-nowrap flex items-center justify-end gap-2'>
                    {item.authors.length > 1 ? (
                      <span>...{item.authors[0]}</span>
                    ) : (
                      item.authors[0]
                    )}
                    <TfiWrite />
                  </p>
                 
                  <p className='font-semibold md:text-xl text-sm relative hover:text-ketab-green'>
                    <span className='text-[10px]'>تومان</span>
                    <span> {item.price}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </Slider>
      )}
    </div>
  );
}

export default SliderFiveRows;
