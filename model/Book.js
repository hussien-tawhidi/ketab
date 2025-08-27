import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // عنوان کتاب
    slug: { type: String, required: true, unique: true, index: true }, // اسلاگ برای URL
    description: { type: String, required: true }, // توضیحات
    type: {
      type: String,
      enum: ["ebook", "audiobook"],
      required: true,
    }, // نوع کتاب
    categories: [{ type: String, required: true }], // دسته‌بندی‌ها
    authors: [{ type: String, required: true }], // نویسندگان
    translators: [{ type: String }], // مترجمان
    narrators: [{ type: String }], // گویندگان (فقط صوتی)
    publisher: { type: String, required: true }, // ناشر
    language: { type: String, default: "fa" }, // زبان
    coverImage: { type: String, required: true }, // تصویر جلد
    fileUrl: { type: String }, // لینک فایل (بعداً رمزگذاری میشه)
    pages: { type: Number }, // تعداد صفحات (ebook)
    duration: { type: Number }, // مدت زمان (audiobook - دقیقه)
    price: { type: Number, required: true }, // قیمت اصلی
    discountPrice: { type: Number }, // قیمت تخفیف خورده
    rating: {
      average: { type: Number, default: 0 }, // میانگین امتیاز
      count: { type: Number, default: 0 }, // تعداد نظرات
    },
    publishedAt: { type: Date }, // تاریخ انتشار

    // 👇 برای مدیریت نظرات
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // کاربر
        rating: { type: Number, min: 1, max: 5 }, // امتیاز
        comment: { type: String }, // متن نظر
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // 👇 برای سبد خرید
    inCarts: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        quantity: { type: Number, default: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
