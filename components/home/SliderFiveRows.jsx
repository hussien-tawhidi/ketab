"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDown } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import LoadingSkelton from "./LoadingSkelton";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function SliderFiveRows({
  data = [],
  title = "",
  link = "/",
  loading,
  description = "",
  header = true,
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
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
    ],
  };


  return (
    <div className={`slider-container relative md:px-3 px-1.5 ${textColor}`}>
      {header && (
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
      )}

      {loading ? (
        // Render skeletons while loading
        <div className='flex gap-3'>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <LoadingSkelton key={i} />
            ))}
        </div>
      ) : (
        data &&
        data.length > 0 && (
          <Slider {...settings}>
            {data.map((item, i) => {
              const discountPercent = item.discountPrice
                ? Math.round(
                    ((item.price - item.discountPrice) / item.price) * 100
                  )
                : 0;

              return (
                <Link
                  href={`/books/${item._id}`}
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
                    height={200}
                    className='h-full w-full object-cover overflow-hidden rounded-2xl'
                    alt='book cover'
                    loading='lazy'
                  />
                  <div className='text-right flex flex-col md:gap-1.5 p-1.5'>
                    <h2 className='font-bold md:text-xl text-[12px] whitespace-nowrap hover:text-ketab-green'>
                      {item.title.length > 10 ? (
                        <span>...{item.title.slice(0, 10)}</span>
                      ) : (
                        item.title
                      )}
                    </h2>
                    <p className='md:text-[12px] text-[10px] hover:text-ketab-green whitespace-nowrap flex items-center justify-end gap-2'>
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
        )
      )}
    </div>
  );
}

export default SliderFiveRows;
