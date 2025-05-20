// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import HallBooking from "@/models/HallBooking";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Optional: basic validation
    if (!body.name || !body.email || !body.hallId || !body.eventDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await HallBooking.findOne({
      hallId: body.hallId,
      eventDate: body.eventDate,
    });

    if (existing) {
      return NextResponse.json(
        { error: "This hall is already booked for the selected date." },
        { status: 400 }
      );
    }
    const booking = await HallBooking.create(body);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await HallBooking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
