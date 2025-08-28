"use client";

import ActiveDisActiveStatus from "@/components/shared/ActiveDisActiveStatus";
import CoverImageUploader from "@/components/shared/CoverImageUploader";
import Input from "@/components/shared/Input";
import SubmitButton from "@/components/shared/SubmitButton";
import TextArea from "@/components/shared/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = ["فعال", "غیر فعال"];
  const [selected, setSelected] = useState(options[0]); // default فعال

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("selected", selected);
      if (image) formdata.append("image", image);

      formdata.append("description", description);

      await axios.post("/api/admin/categories", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("✅ دسته‌بندی با موفقیت ایجاد شد");
      setName("");
      setDescription("");
      setImage(null);
      setSelected(options[0]);
      router.push("/admin/categories");
    } catch (err) {
      console.error("🚀 ~ handleSubmit ~ error:", err);
      setError("❌ خطا در ایجاد دسته‌بندی. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 md:p-10'>
      <form
        onSubmit={handleSubmit}
        className=' bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10'>
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

            <div className='w-1/3 my-3 mx-auto'>
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
              label={loading ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
