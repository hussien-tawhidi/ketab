// app/api/admin/roles/route.js
import { dbConnect } from "@/lib/db";
import Role from "@/model/Role";
import { NextResponse } from "next/server";
import User from "@/model/User"; 

// GET all roles
export async function GET() {
  await dbConnect();
  try {
    const roles = await Role.find().populate("createdBy");
    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error("🚨 GET Roles error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت نقش‌ها" },
      { status: 500 }
    );
  }
}

// POST new role
export async function POST(req) {
  await dbConnect();
  try {
    const { name, permissions, description, userId } =
      await req.json();

    const newRole = await Role.create({
      name,
      permissions: permissions || [],
      description: description || "",
      createdBy: userId, // 👈 logged-in user
    });

    return NextResponse.json(
      { role: newRole, message: "نقش با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚨 POST Role error:", error);
    return NextResponse.json({ message: "خطا در ایجاد نقش" }, { status: 500 });
  }
}
