import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Offering from "@/models/Offering";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newOffering = await Offering.create(data);
    return NextResponse.json(newOffering, { status: 201 });
  } catch (error) {
    console.error("Error creating offering:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const offerings = await Offering.find();
  return NextResponse.json(offerings);
}
