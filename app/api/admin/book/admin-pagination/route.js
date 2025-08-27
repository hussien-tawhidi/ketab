import { dbConnect } from "@/lib/db";
import Book from "@/model/Book";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit).lean();
    const totalCount = await Book.countDocuments();
    return NextResponse.json(
      {
        books,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
