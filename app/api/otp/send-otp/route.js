// app/api/otp/send-otp/route.ts
import { dbConnect } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { sendOTP } from "@/lib/otpSms";
import Otp from "@/model/Otp";
import User from "@/model/User";
import { NextResponse } from "next/server";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  await dbConnect();
  const { phone, email } = await req.json();

  // Validation
  const phoneRegex = /^(\+98|0)?9\d{9}$/; // Iran phone format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!phone && !email) {
    return NextResponse.json(
      { success: false, message: "Phone or email is required." },
      { status: 400 }
    );
  }

  if (phone && !phoneRegex.test(phone)) {
    return NextResponse.json(
      { success: false, message: "شماره تلفن وارد شده صحیح نیست." },
      { status: 400 }
    );
  }

  if (email && !emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, message: "ایمیل وارد شده صحیح نیست." },
      { status: 400 }
    );
  }

  const contact = phone || email;

  // Check if user exists
  let user;
  if (phone) {
    user = await User.findOne({ phone });
  } else if (email) {
    user = await User.findOne({ email });
  }

  if (!user) {
    // Register user automatically
    user = await User.create({
      name: "کاربر جدید",
      ...(phone ? { phone } : {}),
      ...(email ? { email } : {}),
      isActive: false,
      role: "user",
      bio: "",
      orders: [],
      addresses: [],
      avatar: "/avatar.png",
      gender: "",
      birthday: null,
    });
  }

  // Create OTP
  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  await Otp.deleteMany({ contact });
  await Otp.create({ contact, code: otpCode, expiresAt });

  if (email) {
    await sendEmail(
      email,
      "OTP confirmation code",
      `this is you OTP code dont share this with others ... ${otpCode}`
    );
  }
  if (phone) {
        const smsResult = await sendOTP(phone, otpCode);
        console.log("🚀 ~ POST ~ smsResult:", smsResult);
  }

  return NextResponse.json({
    success: true,
    message: "کد تایید با موفقیت ارسال شد.",
  });
}
