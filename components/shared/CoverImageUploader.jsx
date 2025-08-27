"use client";
import React, { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";

export default function CoverImageUploader({ onChange }) {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    onChange(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className='relative w-full max-w-xs mx-auto border-2 border-dashed border-ketab-gray rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-ketab-green transition-all duration-300'
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      {!image ? (
        <>
          <AiOutlineCloudUpload className='text-4xl text-ketab-gray mb-3' />
          <p className='text-sm text-ketab-gray text-center'>
            فایل را اینجا بکشید یا کلیک کنید
          </p>
          <input
            type='file'
            accept='image/*'
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            onChange={handleFileChange}
          />
        </>
      ) : (
        <div className='relative w-full'>
          <img
            src={image}
            alt='Cover Preview'
            className='w-full h-64 object-cover rounded-xl'
          />
          <button
            type='button'
            onClick={handleRemove}
            className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition'>
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
}
