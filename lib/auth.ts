// lib/auth.ts
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { loginRateLimit } from "./rateLimiter";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Rate limiting check
          const rateLimitResult = loginRateLimit(credentials.email);
          if (!rateLimitResult.allowed) {
            console.log(`Rate limit exceeded for email: ${credentials.email}`);
            return null; // Return null instead of throwing error
          }

          const client = await clientPromise;
          const db = client.db();
          const users = db.collection("users");

          console.log(`🔍 Looking for user with email: ${credentials.email}`);
          const user = await users.findOne({ email: credentials.email });

          if (!user) {
            console.log(`❌ User not found for email: ${credentials.email}`);
            return null;
          }

          console.log(`✅ User found: ${user.name}`);
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log(`❌ Invalid password for user: ${user.name}`);
            return null;
          }

          console.log(`✅ Login successful for user: ${user.name}`);

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null instead of throwing error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge:
      process.env.NODE_ENV === "development" ? 60 * 60 : 30 * 24 * 60 * 60, // 1 hour in dev, 30 days in prod
  },
  pages: {
    signIn: "/Auth",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge:
          process.env.NODE_ENV === "development" ? 60 * 60 : 30 * 24 * 60 * 60,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Use object spread to add id property
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
