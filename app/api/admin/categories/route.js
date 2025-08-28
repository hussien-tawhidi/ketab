import { dbConnect } from "@/lib/db";
import { saveUploadedFile } from "@/lib/uploadImage";
import Categories from "@/model/Categories";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();

    // Extract fields from formData
    const name = formData.get("name");
    const description = formData.get("description") || "";
    const selected = formData.get("selected") || "";
    const image = formData.get("image") || null;
    let imageUrl = "";
    if (image) {
      imageUrl = await saveUploadedFile(image);
    }

    // create new category doc
    const category = new Categories({
      name,
      description,
      isActive: selected,
      image: imageUrl,
    });

    await category.save();

    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Failed to create category", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const cates = await Categories.find();
    return NextResponse.json(
      { cates, message: "categories fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { cates, message: "categories fetched failed" },
      { status: 500 }
    );
  }
}
