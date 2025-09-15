"use client";

import Link from "next/link";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

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
      <div className='bg-ketab-dark p-5 rounded-xl w-80 relative'>
        <div className='flex justify-between items-center'>
          <button
            onClick={onClose}
            className=' text-ketab-gray hover:text-ketab-white'>
            <GrClose />
          </button>
          <h3 className='text-lg font-bold'>Share this book</h3>
        </div>

        <ul className='flex flex-col gap-3 mb-4'>
          <li>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-ketab-green transition'>
              Facebook
            </Link>
          </li>
          <li>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                url
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-ketab-green transition'>
              Twitter
            </Link>
          </li>
          <li>
            <Link
              href={`mailto:?subject=Check this book&body=${encodeURIComponent(
                url
              )}`}
              className='hover:text-ketab-green transition'>
              Email
            </Link>
          </li>
          <li>
            <Link
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                url
              )}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-ketab-green transition'>
              WhatsApp
            </Link>
          </li>
        </ul>

        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={url}
            readOnly
            className='flex-1 bg-ketab-gray/10 text-sm p-2 rounded'
          />
          <button
            onClick={handleCopy}
            className='bg-ketab-green text-black px-3 py-2 rounded text-sm'>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
