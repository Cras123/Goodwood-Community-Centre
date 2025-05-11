import dbConnect from "@/utils/db";
import User from "@/models/User";
import mongoose from "mongoose";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const TokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
});

const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { token, password } = body;

    console.log("🔐 Incoming token:", token);
    console.log("🔐 New password:", password ? "received" : "missing");

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    const resetToken = await Token.findOne({ token });
    if (!resetToken) {
      console.log("❌ Token not found in DB");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (resetToken.expires < new Date()) {
      console.log("❌ Token expired");
      await Token.deleteOne({ _id: resetToken._id });
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    console.log("✅ Token is valid, updating password...");

    const hashed = await hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email: resetToken.email },
      { password: hashed }
    );

    if (!user) {
      console.log("❌ User not found for email:", resetToken.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await Token.deleteOne({ _id: resetToken._id });
    console.log("✅ Password updated for:", user.email);

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Server error in reset-password route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
