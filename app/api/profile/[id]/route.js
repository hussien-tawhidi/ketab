import { dbConnect } from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { saveUploadedFile } from "@/lib/uploadImage";

export async function PUT(req, { params }) {
  const param = await params;

  try {
    await dbConnect();

    const { id } = param;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

      const formData = await req.formData();
      
    // Build updates object
   const updates = {};
   [
     "name",
     "phone",
     "email",
     "bio",
     "birthday",
     "isActive",
     "gender",
   ].forEach((field) => {
     const value = formData.get(field);

     if (
       value !== null &&
       value !== "null" &&
       value !== "undefined" &&
       value !== ""
     ) {
       updates[field] = value;
     }
   });


    //   avatar image upload
    const avatarFile = formData.get("avatar");
    const userName = formData.get("name");
    if (avatarFile && avatarFile.name) {
      updates.avatar = await saveUploadedFile(avatarFile,{folder:`profile/${userName}`});
    }

    const gender = formData.get("gender");
    if (gender) {
      updates.gender =
        typeof gender === "object" && gender.label
          ?gender.label
          : gender;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully ✅",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ API /profile error:", error);

    // Duplicate key error (e.g., unique phone/email)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        {
          success: false,
          message: `${field} "${error.keyValue[field]}" is already in use.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
