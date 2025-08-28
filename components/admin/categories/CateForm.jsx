"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import ActiveDisActiveStatus from "@/components/shared/ActiveDisActiveStatus";
import TextArea from "@/components/shared/TextArea";
import SubmitButton from "@/components/shared/SubmitButton";
import CoverImageUploader from "@/components/shared/CoverImageUploader";
export default function CategoryForm({
  handleSubmit,
  loading = false,
  success = null,
  error = null,
  initialValues = {},
  options = ["فعال", "غیر فعال"],
  submitLabel = "ایجاد دسته‌بندی",
}) {
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [image, setImage] =
    (useState < File) | (null > (initialValues.image || null));
 const safeOptions =
   Array.isArray(options) && options.length > 0
     ? options
     : ["فعال", "غیر فعال"];

 const [selected, setSelected] = useState(
   initialValues.status || safeOptions[0]
 );

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10'>
      {/* Cover Image */}
      <CoverImageUploader onChange={setImage} />

      {/* Form Fields */}
      <div className='flex-1 flex flex-col gap-6 my-3'>
        {/* Name & Status */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            name='name'
            label='عنوان دسته‌بندی'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='مثال: کتاب‌های علمی'
            required
          />

          <div className='w-1/2 my-3 mx-auto'>
            <ActiveDisActiveStatus
              options={options}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        {/* Description */}
        <TextArea
          label='توضیحات'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='توضیح مختصری درباره دسته‌بندی وارد کنید...'
          required
        />

        {/* Feedback */}
        {success && (
          <p className='text-green-400 text-sm bg-ketab-green/20 p-2 rounded-md'>
            {success}
          </p>
        )}
        {error && (
          <p className='text-ketab-orange text-sm bg-ketab-orange/20 p-2 rounded-md'>
            {error}
          </p>
        )}

        {/* Submit */}
        <div className='mt-2'>
          <SubmitButton
            label={loading ? "در حال ایجاد..." : submitLabel}
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
}
