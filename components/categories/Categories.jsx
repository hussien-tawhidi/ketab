import { booksCategories } from "@/constant/header";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export default function Categories() {
  return (
    <div className='pt-20 px-4'>
      <p className='border-b w-full border-ketab-green text-ketab-green'>
        کتاب ها
      </p>
      <ul className='mt-5'>
        {booksCategories.map((item, index) => (
          <li key={index} className='mb-3'>
            <Link
              href={"/"}
              className='text-base flex items-center justify-between border-b text-ketab-gray border-ketab-white/20 py-1.5 transition-all duration-300'>
              {item.title}
              <IoIosArrowDown />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
