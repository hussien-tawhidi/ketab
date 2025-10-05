import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return new Response("File name required", { status: 400 });
    }

    // Ensure extension exists
    let fullFileName = fileName.endsWith(".pdf") ? fileName : fileName + ".pdf";

    // Create a token valid for 1 minute
    const token = jwt.sign({ fileName: fullFileName }, SECRET, {
      expiresIn: "60s",
    });

    // Build absolute URL for download
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const downloadUrl = `${origin}/api/download?token=${encodeURIComponent(
      token
    )}`;

    return new Response(JSON.stringify({ url: downloadUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
