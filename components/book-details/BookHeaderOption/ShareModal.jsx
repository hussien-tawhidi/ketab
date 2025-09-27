"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { GoCheckCircle } from "react-icons/go";
import { GrClose } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import { RiFacebookCircleLine, RiTwitterXLine } from "react-icons/ri";
import { RxShare1 } from "react-icons/rx";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { VscLink } from "react-icons/vsc";

const sharedLinks = [
  {
    link: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: <RiFacebookCircleLine />,
    title: "فسبوک",
  },
  {
    link: "https://twitter.com/intent/tweet?url=",
    icon: <RiTwitterXLine />,
    title: "توییتر",
  },
  {
    link: "https://twitter.com/intent/tweet?url=",
    icon: <TiSocialLinkedinCircular />,
    title: "لینکدین",
  },
  {
    link: "https://api.whatsapp.com/send?text=",
    icon: <FaWhatsapp />,
    title: "واتس اپ",
  },
];

export default function ShareModal({ show, onClose, url }) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-ketab-bg/50'
      onClick={onClose}>
      <div
        className='bg-ketab-dark p-5 rounded-xl relative text-ketab-gray'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center border-b border-ketab-gray/30 pb-1'>
          <p className='text-2xl font-bold'>
            <RxShare1 />
          </p>
          <button onClick={onClose} className='  hover:text-ketab-white'>
            <GrClose />
          </button>
        </div>

        <ul className='flex items-center flex-wrap justify-between gap-3 mb-4'>
          {sharedLinks.map((item, index) => (
            <li key={index} className=' p-3 rounded-xl mt-3'>
              <Link
                href={`${item.link}${encodeURIComponent(url)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 flex-col  hover:text-ketab-green transition'>
                <span className='text-2xl'> {item.icon && item.icon}</span>
                <span className='text-[12px]'> {item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-10 border-t border-ketab-gray/50'>
          <p className='flex items-center gap-2 text-sm'>
            {" "}
            لینک کوتاه
            <VscLink className='my-3 text-xl' />
          </p>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={url}
              readOnly
              className='flex-1 bg-ketab-gray/10 text-sm p-2 rounded'
            />
            <button onClick={handleCopy} className=' px-3 py-2 rounded text-xl'>
              {copied ? <GoCheckCircle /> : <IoCopyOutline />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
