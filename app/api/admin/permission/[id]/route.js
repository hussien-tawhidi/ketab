import { dbConnect } from "@/lib/db";
import Permission from "@/model/Permission";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const param = await params;
  const id = await param.id;
  const { role, active, responsibilities, jobs } = await req.json();
  await dbConnect();
  try {
    const update = {};
    if (role) {
      update.role = role;
      update.responsibilities = responsibilities;
      update.jobs = jobs;
    }
    if (active !== undefined) update.active = active;

    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      {
        $set: update,
      },
      { new: true }
    );

    return NextResponse.json(
      { permissions: updatedPermission, message: "ذخیره شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json(
      { message: `خطا رخ داده لطفا دوباره تلاش کنید` },
      { status: 500 }
    );
  }
}
