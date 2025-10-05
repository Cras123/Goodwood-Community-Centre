import { v4 as uuidv4 } from "uuid";
import connectDB from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { sendEmail } from "@/lib/SendMail";
import { passwordResetRateLimit } from "@/lib/rateLimiter";

const TokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
});
const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  // Basic validation
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Rate limiting
  const rateLimitResult = passwordResetRateLimit(email);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many password reset attempts. Please try again later." },
      { status: 429 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if user exists or not for security
    return NextResponse.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  }

  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

  await Token.create({ email, token, expires });

  // Send reset email
  try {
    const resetLink = `${process.env.NEXTAUTH_URL}/Auth/reset-password?token=${token}`;

    await sendEmail(
      email,
      "Password Reset Request - Goodwood Community Centre",
      `
        <h2>Password Reset Request</h2>
        <p>You have requested to reset your password for your Goodwood Community Centre account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="background-color: #00855e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${resetLink}</p>
        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Goodwood Community Centre Team</p>
      `
    );

    return NextResponse.json({
      message: "Password reset link sent to your email",
    });
  } catch (emailError) {
    console.error("Error sending password reset email:", emailError);
    // Still return success but log the error
    return NextResponse.json({
      message: "Password reset link generated",
      token: process.env.NODE_ENV === "development" ? token : undefined,
    });
  }
}
