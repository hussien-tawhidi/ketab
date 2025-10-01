"use client";
import { useState } from "react";

export default function DownloadButton({bookName}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        // body: JSON.stringify({ fileName: "book1.pdf" }),
        body: JSON.stringify({ fileName: bookName }),
      });

      if (!res.ok) throw new Error("Failed to download");

      // دریافت فایل
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // ایجاد لینک موقت و کلیک خودکار
      const a = document.createElement("a");
      a.href = url;
      a.download = "book1.pdf"; // اسم فایل
      document.body.appendChild(a);
      a.click();
      a.remove();

      // حذف URL موقت
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("خطا در دانلود فایل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className='bg-ketab-green text-white px-4 py-2 rounded-lg hover:bg-ketab-green/90 transition'>
      {loading ? "در حال دانلود..." : "دانلود"}
    </button>
  );
}
