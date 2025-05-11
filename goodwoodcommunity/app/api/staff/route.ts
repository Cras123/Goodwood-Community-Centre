// app/api/staff/route.ts
import Staff from "@/models/Staff";
import connectDB from "@/utils/db"; // your MongoDB connection

export async function GET() {
  try {
    await connectDB();
    const staffs = await Staff.find();
    return new Response(JSON.stringify(staffs), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch staff:", error);
    return new Response("Failed to fetch staff", { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newStaff = await Staff.create(body);
  return Response.json(newStaff);
}
