import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
});
const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);

export async function POST(req: Request) {
  await dbConnect();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

  await Token.create({ email, token, expires });

  // In production: send via email
  return NextResponse.json({ message: "Reset link generated", token });
}
