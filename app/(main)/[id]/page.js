import BookDetail from "@/components/book-details/BookDetail";
import React from "react";

export default async function bookDetailsPage({ params }) {
  const param = await params;

  return <BookDetail id={param.id} />;
}
