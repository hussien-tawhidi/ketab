import { dbConnect } from "@/lib/db";
import Book from "@/model/Book";
import { booksData } from "@/seed";
import { NextResponse } from "next/server";

export async function POST() {
  await dbConnect();

  try {
    // Find existing books by slug
    const slugs = booksData.map((book) => book.slug);
    const existingBooks = await Book.find({ slug: { $in: slugs } }).select(
      "slug"
    );
    const existingSlugs = existingBooks.map((book) => book.slug);

    // Filter out books that already exist
    const newBooks = booksData.filter(
      (book) => !existingSlugs.includes(book.slug)
    );

    if (newBooks.length > 0) {
      const insertedBooks = await Book.insertMany(newBooks);
      return NextResponse.json({
        message: `Seeding completed. ${insertedBooks.length} new books added.`,
        insertedBooks,
      });
    }

    return NextResponse.json({ message: "No new books to add." });
  } catch (error) {
    console.error("Error seeding books:", error);
    return NextResponse.json(
      { error: error.message || "Seeding failed" },
      { status: 500 }
    );
  }
}
