"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorMsg from "@/components/shared/ErrorMsg";
import Loader from "@/components/shared/Loader";
import CreateForm from "../create/CreateForm";
import { TiArrowLeft } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastContext";
import Image from "next/image";

export default function UpdateBook({ bookId }) {
  const [loadBook, setLoadBook] = useState(false);
  const [error, setError] = useState("");
  // states matching CreateForm props
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const [authorInput, setAuthorInput] = useState("");
  const [authors, setAuthors] = useState([]);

  const [translatorInput, setTranslatorInput] = useState("");
  const [translators, setTranslators] = useState([]);

  const [categories, setCategories] = useState([]);
  const categoryOptions = ["Science", "History", "Novel", "Tech"]; // example

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToast } = useToast();

  // load initial book
  useEffect(() => {
    const fetchData = async () => {
      setLoadBook(true);
      try {
        const { data } = await axios.get(`/api/admin/book/${bookId}`);
        console.log("🚀 ~ fetchData ~ data:", data);
        const b = data?.book;
        // prefill form
        setCoverImage(b.coverImage || null); // 👈 use same state
        setTitle(b.title || "");
        setPublisher(b.publisher || "");
        setPrice(b.price || "");
        setDiscountPrice(b.discountPrice || "");
        setDescription(b.description || "");
        setAuthors(b.authors || []);
        setTranslators(b.translators || []);
        setCategories(b.categories || []);
      } catch (err) {
        console.error("fetchData error:", err);
        setError("خطا برای دریافت محصول");
      } finally {
        setLoadBook(false);
      }
    };
    fetchData();
  }, [bookId]);

  // handlers for arrays
  const handleAddAuthors = () => {
    if (authorInput.trim()) {
      setAuthors([...authors, authorInput.trim()]);
      setAuthorInput("");
    }
  };
  const handleRemoveAuthor = (i) =>
    setAuthors(authors.filter((_, idx) => idx !== i));

  const handleAddTranslators = () => {
    if (translatorInput.trim()) {
      setTranslators([...translators, translatorInput.trim()]);
      setTranslatorInput("");
    }
  };
  const handleRemoveTranslator = (i) =>
    setTranslators(translators.filter((_, idx) => idx !== i));

  const handleCategoryChange = (newCategories) => setCategories(newCategories);

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("description", description);
    formData.append("authors", JSON.stringify(authors));
    formData.append("translators", JSON.stringify(translators));
    formData.append("categories", JSON.stringify(categories));

    if (coverImage) formData.append("coverImage", coverImage);

    try {
      const res = await axios.put(`/api/admin/book/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      addToast("ّبروز رسانی موفقانه بود", "success");
      router.back();
    } catch (err) {
      addToast("خطا در هنگام بروز رسانی", "error");
      console.error("❌ Error updating book:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const router = useRouter();
  if (loadBook) return <Loader />;

  return (
    <div className='p-6 mx-auto'>
      <div className='flex justify-between my-5'>
        <h2 className='text-xl font-bold mb-4'>بروز رسانی محصول</h2>
        <button
          onClick={() => router.push("/admin/books")}
          className='py-1.5 flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
          <TiArrowLeft className='text-2xl' />
        </button>
      </div>
      {error && <ErrorMsg text={error} />}
      <div className='bg-ketab-light pt-5'>
        {coverImage && (
          <Image
            src={
              typeof coverImage === "string"
                ? coverImage // from DB (URL)
                : URL.createObjectURL(coverImage) // newly uploaded File
            }
            width={100}
            height={100}
            className='object-cover mx-auto rounded-xl overflow-hidden'
            alt='cover'
          />
        )}

        <CreateForm
          title={title}
          setTitle={setTitle}
          authorInput={authorInput}
          setAuthorInput={setAuthorInput}
          authors={authors}
          handleAddAuthors={handleAddAuthors}
          handleRemoveAuthor={handleRemoveAuthor}
          translatorInput={translatorInput}
          setTranslatorInput={setTranslatorInput}
          translators={translators}
          handleAddTranslators={handleAddTranslators}
          handleRemoveTranslator={handleRemoveTranslator}
          publisher={publisher}
          setPublisher={setPublisher}
          price={price}
          setPrice={setPrice}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          categories={categories}
          categoryOptions={categoryOptions}
          handleCategoryChange={handleCategoryChange}
          description={description}
          setDescription={setDescription}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
