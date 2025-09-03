import { dbConnect } from "@/lib/db";
import Role from "@/model/Role";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const role = await Role.findById(id);

    return NextResponse.json(
      { role, message: "Role successfully founded" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error in  ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    await Role.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "role successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json(
      { message: `Error in deleting role: ${error.message}` },
      { status: 500 }
    );
  }
}

// ✅ Update role by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const { name, description, permissions } = body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        name,
        description,
        permissions,
      },
      { new: true } // return updated document
    );

    if (!updatedRole) {
      return NextResponse.json({ message: "نقش پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "نقش با موفقیت بروزرسانی شد", role: updatedRole },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error)
    return NextResponse.json(
      { message: "خطا در بروزرسانی نقش", error: error.message },
      { status: 500 }
    );
  }
}
