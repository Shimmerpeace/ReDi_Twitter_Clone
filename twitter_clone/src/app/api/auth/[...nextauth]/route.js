// API route that processes authentication requests and returns responses.
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "super-cool-secret";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await makeSureDbIsReady();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("Invalid email or password");
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid email or password");
        // Return user object for session
        return { id: user._id, email: user.email, name: user.name, username: user.username };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // On sign in, add user info to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user info to session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username;
      }
      return session;
    },
    async signIn({ user }) {
      // Set JWT as HttpOnly cookie manually
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      // Set cookie (works in Route Handlers, not in pages/api)
      try {
        cookies().set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
        });
      } catch (e) {
        // cookies() only available in Route Handlers, not in pages/api
      }
      return true;
    }
  }
});


