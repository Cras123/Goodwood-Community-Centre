import { hash } from "bcryptjs";
import connectDB from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { registrationRateLimit } from "@/lib/rateLimiter";
import { validateFormData } from "@/lib/inputValidation";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate and sanitize input
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.sanitizedData;

    // Rate limiting (using email as identifier)
    const rateLimitResult = registrationRateLimit(email);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
