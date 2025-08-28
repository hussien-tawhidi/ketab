"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CoverImageUploader from "@/components/shared/CoverImageUploader";
import Input from "@/components/shared/Input";
import ActiveDisActiveStatus from "@/components/shared/ActiveDisActiveStatus";
import TextArea from "@/components/shared/TextArea";
import SubmitButton from "@/components/shared/SubmitButton";
import { TiArrowLeft } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function UpdateCategory({ id }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = ["فعال", "غیر فعال"];
  const [selected, setSelected] = useState(options[0]); // default فعال

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  // ✅ Fetch category data on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`/api/admin/categories/${id}`);
        console.log("🚀 ~ fetchCategory ~ data:", data);
        setName(data?.cates?.name || "");
        setDescription(data?.cates?.description || "");
        setSelected(data?.cates?.status || options[0]);
        // If you save image as URL in DB, prefill it
        setImage(data?.cates?.image || null);
      } catch (err) {
        setError("خطا در دریافت اطلاعات دسته بندی");
      }
    };
    fetchCategory();
  }, [id]);

  // ✅ Handle update
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

      await axios.put(`/api/admin/categories/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("دسته بندی با موفقیت بروزرسانی شد");
      router.push("/admin/categories");
    } catch (error) {
      setError("خطا در بروزرسانی دسته بندی");
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10'>
      <div className='flex justify-between my-5'>
        <h2 className='text-xl font-bold mb-4'>بروز رسانی دسته بندی</h2>
        <button
          onClick={() => router.push("/admin/categories")}
          className='py-1.5 flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
          <TiArrowLeft className='text-2xl' />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 bg-ketab-light p-6 rounded-2xl shadow-md transition-all'>
        {/* Cover Image */}
        <CoverImageUploader onChange={setImage} initialImage={image} />

        {/* Inputs Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Input
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='عنوان'
            required
          />

          <ActiveDisActiveStatus
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* Description */}
        <TextArea
          label='توضیحات'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Error / Success */}
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}

        {/* Submit */}
        <div className='mt-4'>
          <SubmitButton
            label={loading ? "در حال بروزرسانی..." : "بروزرسانی"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
