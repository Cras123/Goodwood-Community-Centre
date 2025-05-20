// app/api/calendar-events/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import HallBooking from "@/models/HallBooking";
import Event from "@/models/Events";

export async function GET() {
  try {
    await connectDB();

    const bookings = await HallBooking.find(
      {},
      "name eventDate startTime endTime"
    );
    const events = await Event.find({}, "name date startTime endTime");

    const merged = [
      ...bookings.map((b) => ({
        title: b.name,
        start: new Date(`${b.eventDate}T${b.startTime}`),
        end: new Date(`${b.eventDate}T${b.endTime}`),
        type: "Booking",
      })),
      ...events.map((e) => ({
        title: e.name,
        start: new Date(`${e.date}T${e.startTime}`),
        end: new Date(`${e.date}T${e.endTime}`),
        type: "Event",
      })),
    ];

    return NextResponse.json(merged);
  } catch (error) {
    console.error("GET /api/calendar-events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
