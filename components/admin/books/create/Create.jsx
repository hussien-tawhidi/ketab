"use client";
import { useState } from "react";
import { booksCategories } from "@/constant/header";
import axios from "axios";
import CreateForm from "./CreateForm";
import { useToast } from "@/components/ToastContext";
import { useRouter } from "next/navigation";
import { TiArrowLeft } from "react-icons/ti";
export default function Create() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState("");
  const [translators, setTranslators] = useState([]);
  const [translatorInput, setTranslatorInput] = useState("");
  const [publisher, setPublisher] = useState("");
  const [categories, setCategories] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type] = useState("ebook");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { addToast } = useToast();

  const categoryOptions = booksCategories.map((item) => ({
    label: item.title,
    value: item.title,
  }));

  const handleAddAuthors = () => {
    if (authorInput.trim()) {
      const newAuthors = authorInput
        .split(",")
        .map((author) => author.trim())
        .filter(Boolean);
      setAuthors([...authors, ...newAuthors]);
      setAuthorInput("");
    }
  };

  const handleRemoveAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  const handleAddTranslators = () => {
    if (translatorInput.trim()) {
      const newTranslators = translatorInput
        .split(",")
        .map((translator) => translator.trim())
        .filter(Boolean);
      setTranslators([...translators, ...newTranslators]);
      setTranslatorInput("");
    }
  };

  const handleRemoveTranslator = (index) => {
    const updatedTranslators = [...translators];
    updatedTranslators.splice(index, 1);
    setTranslators(updatedTranslators);
  };

  const handleCategoryChange = (selectedOptions) => {
    if (Array.isArray(selectedOptions)) {
      setCategories(selectedOptions.map((option) => option.value));
    } else if (selectedOptions) {
      setCategories([selectedOptions.value]);
    } else {
      setCategories([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data correctly
      const formData = new FormData();

      // Append simple fields
      formData.append("title", title);
      formData.append("publisher", publisher);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice);
      formData.append("description", description);
      formData.append("type", type);

      // Append arrays correctly - as JSON strings
      formData.append("authors", JSON.stringify(authors));
      formData.append("translators", JSON.stringify(translators));
      formData.append("categories", JSON.stringify(categories));

      // Append cover image if exists
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await axios.post("/api/admin/book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Reset form
      setTitle("");
      setAuthors([]);
      setTranslators([]);
      setPublisher("");
      setCategories([]);
      setCoverImage(null);
      setPrice("");
      setDiscountPrice("");
      setDescription("");

      addToast("محصول موفقانه افزوده شد", "success");
      router.push("/admin/books")
    } catch (error) {
      console.error("Error creating book:", error);
      addToast("خطای رخ داده", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold mb-6 text-ketab-gray'>
          ایجاد کتاب جدید
        </h2>
        <button
          onClick={() => router.push("/admin/books")}
          className='py-1.5 flex items-center gap-2 px-5 mr-4 rounded-md border border-ketab-green text-ketab-green'>
          <TiArrowLeft className='text-2xl' />
        </button>
      </div>
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
  );
}
