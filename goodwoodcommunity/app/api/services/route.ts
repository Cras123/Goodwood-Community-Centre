import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Service from "@/models/Services";

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const newService = await Service.create(body);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const services = await Service.find();
  return NextResponse.json(services);
}
