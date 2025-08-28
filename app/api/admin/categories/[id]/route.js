import { dbConnect } from "@/lib/db";
import Categories from "@/model/Categories";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const param = await params;
  const { id } = param;
  try {
    await dbConnect();
    console.log("Deleting category with id:", id);

    const deleted = await Categories.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);
    return NextResponse.json(
      { message: "Category delete failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  console.log("🚀 ~ GET ~ params:", params)
  try {
    const { id } = await params;
    await dbConnect();
    const cates = await Categories.findById(id);

    return NextResponse.json(
      { cates, message: "Book successfully deleted" },
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

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const formData = await req.formData();

    const updatedData = {
      name: formData.get("name"),
      description: formData.get("description"),
      status: formData.get("selected"), // فعال / غیر فعال
    };

    // if image uploaded
    if (formData.get("image")) {
      updatedData.image = formData.get("image");
    }

    const category = await Categories.findByIdAndUpdate(
      params.id,
      updatedData,
      { new: true }
    );

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚀 ~ PUT ~ error:", error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}