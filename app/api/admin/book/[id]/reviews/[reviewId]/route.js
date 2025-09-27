import { dbConnect } from "@/lib/db";
import Book from "@/model/Book";

import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const param =await params;
    const { id, reviewId } = param;
    const { comment, rating } = await req.json();

    if (!comment || !rating) {
      return NextResponse.json(
        { message: "لطفاً متن نظر و امتیاز را وارد کنید" },
        { status: 400 }
      );
    }

    // Find the book and update review inside reviews array
    const book = await Book.findOneAndUpdate(
      { _id: id, "reviews._id": reviewId },
      {
        $set: {
          "reviews.$.comment": comment,
          "reviews.$.rating": rating,
        },
      },
      { new: true }
    );

    if (!book) {
      return NextResponse.json(
        { message: "کتاب یا نظر یافت نشد" },
        { status: 404 }
      );
    }

    const updatedReview = book.reviews.id(reviewId);

    return NextResponse.json(
      { message: "نظر با موفقیت ویرایش شد", updatedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚀 ~ PUT review error:", error);
    return NextResponse.json(
      { message: "خطا در ویرایش نظر", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id, reviewId } = params;

  await dbConnect();

  try {
    const book = await Book.findById(id);
    if (!book) return new Response("Book not found", { status: 404 });

    // Remove review from the array
    const reviewIndex = book.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return new Response("Review not found", { status: 404 });
    }

    book.reviews.splice(reviewIndex, 1); // remove review

    // Recalculate rating
    if (book.reviews.length > 0) {
      const total = book.reviews.reduce((sum, r) => sum + r.rating, 0);
      book.rating.average = total / book.reviews.length;
      book.rating.count = book.reviews.length;
    } else {
      book.rating.average = 0;
      book.rating.count = 0;
    }

    await book.save();

    return new Response(JSON.stringify({ message: "Review deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
