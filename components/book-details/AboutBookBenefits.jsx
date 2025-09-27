"use client";

import {
  FaRocket,
  FaBrain,
  FaClock,
  FaUsers,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";

const benefitsList = [
  {
    icon: <FaRocket className='text-ketab-green text-2xl shrink-0' />,
    title: "افزایش سرعت مطالعه",
    description:
      "مطالعه منظم باعث می‌شود سرعت خواندن و درک شما افزایش یابد. شما یاد می‌گیرید چگونه زمان خود را بهتر مدیریت کنید.",
  },
  {
    icon: <FaBrain className='text-ketab-green text-2xl shrink-0' />,
    title: "تقویت حافظه و تمرکز",
    description:
      "مطالعه مداوم مغز را تمرین می‌دهد، تمرکز را بیشتر می‌کند و به حافظه قدرت ذخیره‌سازی اطلاعات تازه می‌بخشد.",
  },
  {
    icon: <FaClock className='text-ketab-green text-2xl shrink-0' />,
    title: "مدیریت زمان",
    description:
      "با مطالعه مستمر، شما نظم بیشتری پیدا می‌کنید و زمان خود را به شکل موثرتری برای یادگیری و کار استفاده می‌کنید.",
  },
  {
    icon: <FaUsers className='text-ketab-green text-2xl shrink-0' />,
    title: "افزایش مهارت‌های اجتماعی",
    description:
      "خواندن کتاب‌ها و مقالات دیدگاه شما را گسترش می‌دهد و در گفتگوها و تعاملات اجتماعی اعتمادبه‌نفس بیشتری خواهید داشت.",
  },
  {
    icon: <FaLightbulb className='text-ketab-green text-2xl shrink-0' />,
    title: "تقویت خلاقیت و بینش",
    description:
      "کتاب‌ها ذهن شما را به ایده‌های جدید باز می‌کنند و قدرت تحلیل و خلاقیت شما را افزایش می‌دهند.",
  },
  {
    icon: <FaHeart className='text-ketab-green text-2xl shrink-0' />,
    title: "سلامت روانی و آرامش",
    description:
      "مطالعه یک راه عالی برای کاهش استرس و ایجاد آرامش ذهنی است. مطالعه قبل از خواب کیفیت خواب را نیز بهتر می‌کند.",
  },
];

export default function AboutBookBenefits() {
  return (
    <section className=' mx-auto py-12 mt-10'>
      <h2 className='text-2xl md:text-3xl font-bold text-ketab-white mb-8'>
        فواید مطالعه
      </h2>

      <div className='space-y-6'>
        {benefitsList.map((b, i) => (
          <div
            key={i}
            className='flex items-start gap-4 p-5 bg-ketab-dark/50 rounded-xl hover:bg-ketab-dark/70 transition'>
            {b.icon}
            <div>
              <h3 className='text-lg font-semibold text-ketab-white mb-1'>
                {b.title}
              </h3>
              <p className='text-sm md:text-base text-ketab-gray leading-relaxed'>
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
