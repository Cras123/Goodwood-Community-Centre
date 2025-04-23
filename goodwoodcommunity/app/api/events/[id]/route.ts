// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Event from "@/models/Events";

// GET one event by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const event = await Event.findById(params.id).lean();
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PUT to update the event
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  try {
    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updatedEvent);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE an event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
