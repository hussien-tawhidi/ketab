
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  const user = getUserFromToken(token);

  if (!user)
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });

  return NextResponse.json({ success: true, user }); // returns user info directly from JWT
}
