// lib/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function getUserFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // now contains userId, name, phone, email, role
  } catch (err) {
    return null;
  }
}
