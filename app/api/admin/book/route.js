import { dbConnect } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploadImage";
import Book from "@/model/Book";
import { NextResponse } from "next/server";

function generateSlug(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "") // keep Persian/Arabic chars
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // Extract simple fields
    const title = formData.get("title");
    const publisher = formData.get("publisher");
    const price = Number(formData.get("price")) || 0;
    const discountPrice = Number(formData.get("discountPrice")) || 0;
    const description = formData.get("description");
    const type = formData.get("type");
    const parseArray = (field) => {
      try {
        return JSON.parse(formData.get(field) || "[]");
      } catch {
        return [];
      }
    };
    const authors = parseArray("authors");
    const translators = parseArray("translators");
    const categories = parseArray("categories");

    // File (convert to Base64)
    const coverImageFile = formData.get("coverImage");
    let coverImageBase64 = null;

    if (coverImageFile) {
      // const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      // coverImageBase64 = `data:${coverImageFile.type};base64,${buffer.toString(
      //   "base64"
      // )}`;
      coverImageBase64 = await saveUploadedFile(coverImageFile);
    }
    const slug = generateSlug(title);
    // Save to MongoDB
    const newBook = await Book.create({
      title,
      authors,
      translators,
      publisher,
      categories,
      slug,
      price,
      discountPrice,
      description,
      type,
      coverImage: coverImageBase64,
    });

    return NextResponse.json(
      { message: "Book created successfully", book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating book:", error);
    return NextResponse.json(
      { message: "Error in creating book" },
      { status: 500 }
    );
  }
}
