import { hash } from "bcryptjs";
import connectDB from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

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
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
