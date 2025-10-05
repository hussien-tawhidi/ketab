"use client";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function HeroSlider({ data = [] }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 10, // default for large screens
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1536, // 2xl breakpoint
        settings: {
          slidesToShow: 10,
        },
      },
      {
        breakpoint: 1280, // xl breakpoint
        settings: {
          slidesToShow: 8,
        },
      },

      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className='slider-container relative'>
      <Slider {...settings}>
        {data.map((item, i) => (
          <Link
            href={`/books/${item._id}`}
            key={i}
            className='overflow-hidden rounded-2xl'>
            <Image
              src={item.coverImage || ""}
              width={200}
              loading='lazy'
              height={200}
              className='h-full w-full object-cover overflow-hidden rounded-2xl px-3'
              alt='book cover'
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
