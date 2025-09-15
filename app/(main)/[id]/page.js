import BookDetail from "@/components/book-details/BookDetail";
import React from "react";

export default async function bookDetailsPage({ params }) {
  console.log("🚀 ~ bookDetailsPage ~ params:", params.id);
  return <BookDetail id={params.id} />;
}
