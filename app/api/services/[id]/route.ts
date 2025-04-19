import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Service from "@/models/Services";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const service = await Service.findById(params.id);
  return NextResponse.json(service);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updated = await Service.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Service.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
