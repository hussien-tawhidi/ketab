import { dbConnect } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploadImage";
import Book from "@/model/Book";
import { NextResponse } from "next/server";
import User from "@/model/User"
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    await Book.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Book successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { message: `Error in deleting book: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const param=await params
  try {
    const { id } = param; // params is already an object
    await dbConnect();

    const book = await Book.findById(id).populate({
      path: "reviews.user",
      select: "name email", // only select necessary fields
    });

    if (!book) {
      return NextResponse.json({ message: "کتاب یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { book, message: "کتاب با موفقیت دریافت شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { message: `خطا در دریافت کتاب: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const formData = await req.formData();

    // Helper: safely parse array
    const parseArray = (field) => {
      try {
        return JSON.parse(formData.get(field) || "[]");
      } catch {
        return [];
      }
    };

    // Collect only provided fields
    const updateFields = {};

    if (formData.get("title")) updateFields.title = formData.get("title");
    if (formData.get("publisher"))
      updateFields.publisher = formData.get("publisher");
    if (formData.get("price"))
      updateFields.price = Number(formData.get("price"));
    if (formData.get("discountPrice"))
      updateFields.discountPrice = Number(formData.get("discountPrice"));
    if (formData.get("description"))
      updateFields.description = formData.get("description");
    if (formData.get("type")) updateFields.type = formData.get("type");

    const authors = parseArray("authors");
    if (authors.length) updateFields.authors = authors;

    const translators = parseArray("translators");
    if (translators.length) updateFields.translators = translators;

    const categories = parseArray("categories");
    if (categories.length) updateFields.categories = categories;

    // Handle file (Base64)
    const coverImageFile = formData.get("coverImage");
    if (coverImageFile && coverImageFile.name) {
      updateFields.coverImage = await saveUploadedFile(coverImageFile);
    }

    // Update MongoDB doc
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Book updated successfully", book: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating book:", error);
    return NextResponse.json(
      { message: "Error in updating book", error: error.message },
      { status: 500 }
    );
  }
}
