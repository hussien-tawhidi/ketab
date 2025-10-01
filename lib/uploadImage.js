import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";


export async function saveUploadedFile(file, { folder = "uploads" } = {}) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload directory inside public
  const uploadDir = join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const fullPath = join(uploadDir, fileName);

  await writeFile(fullPath, buffer);

  // Return public URL path
  return `/${folder}/${fileName}`;
}
