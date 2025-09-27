import { dbConnect } from "@/lib/db";
import Book from "@/model/Book";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const param=await params
  try {
    await dbConnect();

    const { id } = param; // Book ID from URL
    const { rating, comment, userId } = await req.json();

    if (!rating || !comment || !userId) {
      return NextResponse.json(
        { message: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    // Find book
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ message: "کتاب یافت نشد" }, { status: 404 });
    }

    // Push new review
    book.reviews.push({
      user: userId,
      rating,
      comment,
      createdAt: new Date(),
    });

    // Update book rating
    const totalReviews = book.reviews.length;
    const sumRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
    book.rating.count = totalReviews;
    book.rating.average = sumRating / totalReviews;

    // Save book
    await book.save();

    // Populate the last review's user
    const newReviewId = book.reviews[book.reviews.length - 1]._id;
    const populatedBook = await Book.findById(id).populate({
      path: "reviews.user",
      select: "name email", // pick fields you need
    });

    const newReview = populatedBook.reviews.find(
      (r) => r._id.toString() === newReviewId.toString()
    );

    return NextResponse.json(
      { message: "نظر شما ثبت شد", newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚀 ~ POST /reviews error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
