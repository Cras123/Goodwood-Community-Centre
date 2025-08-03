import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Offering from "@/models/Offering";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const offering = await Offering.findById(params);
  return NextResponse.json(offering);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const data = await req.json();
  const updated = await Offering.findByIdAndUpdate(params, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  await Offering.findByIdAndDelete(params);
  return NextResponse.json({ message: "Deleted" });
}
