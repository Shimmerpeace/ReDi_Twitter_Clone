// # Authentication helpers
// Helper functions for authentication and session management

// /lib/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signJwt(user) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyJwt(token) {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}