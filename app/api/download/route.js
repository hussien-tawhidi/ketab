import fs from "fs";
import path from "path";

export async function POST(req) {
  const { fileName } = await req.json();

  if (!fileName) {
    return new Response("File name required", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "books", fileName);

  try {
    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}
