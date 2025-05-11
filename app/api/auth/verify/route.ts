import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/utils/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json(null, { status: 401 });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return NextResponse.json(null, { status: 401 });

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
