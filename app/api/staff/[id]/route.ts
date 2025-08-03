import { NextRequest } from "next/server";
import connectDB from "@/utils/db";
import Staff from "@/models/Staff";

// GET single staff
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const staff = await Staff.findById(params);
    if (!staff) {
      return new Response("Staff not found", { status: 404 });
    }
    return new Response(JSON.stringify(staff), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}

// PUT update staff
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedStaff = await Staff.findByIdAndUpdate(params, body, {
      new: true,
    });
    if (!updatedStaff) {
      return new Response("Staff not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedStaff), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}

// DELETE staff
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    await Staff.findByIdAndDelete(params);
    return new Response("Staff deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}
