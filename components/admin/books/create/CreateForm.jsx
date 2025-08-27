"use client";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import SubmitButton from "@/components/shared/SubmitButton";
import CoverImageUploader from "@/components/shared/CoverImageUploader";
import CustomSelect from "@/components/shared/CustomeSelect";

export default function CreateForm({
  title,
  setTitle,
  authorInput,
  setAuthorInput,
  authors,
  handleAddAuthors,
  handleRemoveAuthor,
  translatorInput,
  setTranslatorInput,
  translators,
  handleAddTranslators,
  handleRemoveTranslator,
  publisher,
  setPublisher,
  price,
  setPrice,
  discountPrice,
  setDiscountPrice,
  categories,
  categoryOptions,
  handleCategoryChange,
  description,
  setDescription,
  coverImage,
  setCoverImage,
  isSubmitting,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 bg-ketab-light p-6 rounded-2xl shadow-md transition-all'>
      {/* Cover Image */}
      <CoverImageUploader onChange={setCoverImage} value={coverImage} />

      {/* Inputs Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Input
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='عنوان کتاب'
          required
        />

        {/* Authors Input */}
        <div className='md:col-span-3'>
          <div className='flex gap-2'>
            <Input
              name='authors'
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              placeholder='نویسنده‌ها (با کاما یا Enter جدا کنید)'
              className='flex-grow'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAuthors();
                }
              }}
            />
            {authorInput.length > 0 && (
              <button
                type='button'
                onClick={handleAddAuthors}
                className='w-64 border border-ketab-green rounded-md text-ketab-green'>
                افزودن
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {authors.map((author, index) => (
              <span
                key={index}
                className='bg-ketab-gray-light text-ketab-gray px-3 py-1 rounded-full flex items-center'>
                {author}
                <button
                  type='button'
                  onClick={() => handleRemoveAuthor(index)}
                  className='mr-2 text-red-500 hover:text-red-700'>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Translators Input */}
        <div className='md:col-span-3'>
          <div className='flex gap-2'>
            <Input
              name='translators'
              value={translatorInput}
              onChange={(e) => setTranslatorInput(e.target.value)}
              placeholder='مترجم‌ها (با کاما یا Enter جدا کنید)'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTranslators();
                }
              }}
            />
            {translatorInput.length > 0 && (
              <button
                type='button'
                onClick={handleAddTranslators}
                className='w-64 border border-ketab-green rounded-md text-ketab-green'>
                افزودن
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {translators.map((translator, index) => (
              <span
                key={index}
                className='bg-ketab-gray-light text-ketab-gray px-3 py-1 rounded-full flex items-center'>
                {translator}
                <button
                  type='button'
                  onClick={() => handleRemoveTranslator(index)}
                  className='mr-2 text-ketab-orange hover:text-ketab-orange/90'>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <Input
          name='publisher'
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder='ناشر'
          required
        />
        <Input
          name='price'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='قیمت اصلی (تومان)'
          required
          min='0'
        />
        <Input
          name='discountPrice'
          type='number'
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          placeholder='قیمت تخفیف (اختیاری)'
          min='0'
        />
      </div>

      {/* Categories Select */}
      <div>
        <label className='block text-sm font-medium text-ketab-gray mb-2'>
          دسته‌بندی‌ها
        </label>
        <CustomSelect
          options={categoryOptions}
          value={categoryOptions.filter((option) =>
            categories.includes(option.value)
          )}
          defaultLabel='انتخاب دسته‌بندی'
          isMulti
          onChange={handleCategoryChange}
        />
        <p className='mt-4 text-sm text-ketab-gray'>
          دسته‌بندی انتخاب‌شده:{" "}
          <span className='font-semibold'>
            {categories.join(", ") || "هیچ‌کدام"}
          </span>
        </p>
      </div>

      {/* Description */}
      <TextArea
        label='توضیحات کتاب'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Submit */}
      <div className='mt-4'>
        <SubmitButton
          label={isSubmitting ? "در حال ایجاد..." : "ارسال درخواست"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
