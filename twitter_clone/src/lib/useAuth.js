// Authentication helpers
// Contains reusable authentication logic, configuration, or helper functions for authentication and session management
// jsonwebtoken for JWT
// bcryptjs for password hashing
// /lib/useAuth.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Stronger salt rounds for bcrypt
const BCRYPT_SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "super-cool-secret"; // Use only environment variable for JWT secret in production
const JWT_EXPIRES_IN = "7d"; // easily changeable

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

// Password hashing with error handling
export async function hashPassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  try {
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Failed to hash password");
  }
}

// Password verification with error handling
export async function verifyPassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.error("Error verifying password:", err);
    return false;
  }
}

// JWT signing with customizable payload
export function signJwt(user) {
  try {
    // You can add more fields as needed (e.g., email, roles)
    const payload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    console.error("Error signing JWT:", error);
    throw new Error("Failed to sign JWT");
  }
}

// JWT verification with error logging
export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.warn("JWT verification failed:", err.message);
    return null;
  }
}

export function getUserFromToken(token) {
  return verifyJwt(token);
}

