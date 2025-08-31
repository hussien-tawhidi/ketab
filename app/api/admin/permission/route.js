import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Permission, { VALID_ROLES } from "@/model/Permission";
import User from "@/model/User";

export async function POST(req) {
  try {
    const {
      userId,
      role,
      active = true,
      jobs = [],
      responsibilities = [],
    } = await req.json();

    // Basic validation
    if (!userId || !role) {
      return NextResponse.json(
        { message: "فیلدهای userId و role الزامی هستند!" },
        { status: 401 }
      );
    }

    // Validate role
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { message: "نقش انتخاب‌شده معتبر نیست!" },
        { status: 400 }
      );
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "شناسه معتبر نیست" },
        { status: 402 }
      );
    }

    await dbConnect();

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json(
        { message: "کاربری با این شناسه وجود ندارد!" },
        { status: 404 }
      );
    }

    // Create permission
    const newPermission = await Permission.create({
      userId,
      role,
      active,
      jobs,
      responsibilities,
    });

    return NextResponse.json(
      { message: "Permission created successfully", permission: newPermission },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "خطا در ایجاد مجوز", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const permissions = await Permission.find().populate("userId");
    return NextResponse.json(
      {
        permissions,
        message: "Permission fetched",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ get ~ error:", error);
    return NextResponse.json(
      {
        message: "Permission fetched failed",
      },
      { status: 500 }
    );
  }
}
