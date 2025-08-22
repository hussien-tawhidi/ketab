// app/api/otp/verify-otp/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import Otp from "@/model/Otp";
import User from "@/model/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect();
  const { phone, email, otp } = await req.json();

  try {
    if (!otp || (!phone && !email)) {
      return NextResponse.json(
        { success: false, message: "OTP and phone/email are required." },
        { status: 400 }
      );
    }

    const contact = phone || email;

    // Find OTP record
    const record = await Otp.findOne({ contact, code: otp });
    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: "OTP is invalid or expired." },
        { status: 400 }
      );
    }

    // Delete OTP after verification
    await Otp.deleteOne({ _id: record._id });

    // Find the user by phone or email
    let user;
    if (phone) {
      user = await User.findOneAndUpdate(
        { phone },
        { isActive: true },
        { new: true } // return the updated document
      );
    } else if (email) {
      user = await User.findOneAndUpdate(
        { email },
        { isActive: true },
        { new: true }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Generate JWT with essential user info
    const payload = {
      userId: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      role: user.role,
      bio: user.bio,
      orders: user.orders,
      addresses: user.addresses,
      avatar: user.avatar,
      gender: user.gender,
      birthday: user.birthday,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({ success: true, token }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ success: false, token }, { status: 500 });
  }
}
