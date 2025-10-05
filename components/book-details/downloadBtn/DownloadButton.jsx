"use client";

import { useState } from "react";

export default function DownloadButton({ bookName }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload(bookName) {
    setLoading(true);
    try {
      // Step 1: generate download URL
      const res = await fetch("/api/download/generate-link", {
        method: "POST",
        body: JSON.stringify({ fileName: bookName }),
      });
      const data = await res.json();

      // Step 2: trigger download
      const link = document.createElement("a");
      link.href = data.url;
      link.download = bookName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("🚀 ~ handleDownload ~ error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={() => handleDownload(bookName)}
      disabled={loading}
      className='bg-ketab-green text-white px-4 py-2 rounded-lg hover:bg-ketab-green/90 transition'>
      {loading ? "در حال دانلود..." : "دانلود"}
    </button>
  );
}
