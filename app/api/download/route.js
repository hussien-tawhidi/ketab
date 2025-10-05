import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response("Missing token", { status: 400 });
    }

    // Verify JWT token
    let payload;
    try {
      payload = jwt.verify(token, SECRET);
    } catch (err) {
      return new Response("Invalid or expired link", { status: 403 });
    }

    const { fileName } = payload;

    const filePath = path.join(process.cwd(), "books", fileName);
    if (!fs.existsSync(filePath)) {
      return new Response("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          fileName
        )}"`,
      },
    });
  } catch (error) {
    console.log("Download error:", error);
    return new Response("Server error", { status: 500 });
  }
}
