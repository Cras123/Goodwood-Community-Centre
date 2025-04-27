import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Event from "@/models/Events";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Save ONE event, even if it is repeating
    const newEvent = await Event.create({
      ...data,
      repeatWeekly: data.repeatWeekly || false,
      endRepeatDate: data.repeatWeekly ? new Date(data.endRepeatDate) : null,
    });

    return NextResponse.json(
      { message: "Event created", newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
