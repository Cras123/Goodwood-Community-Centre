// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Event from "@/models/Events";

// GET one event by ID
export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url); // 👈 Create URL object
  const id = url.pathname.split("/").pop(); // 👈 Get id manually from the URL

  try {
    const event = await Event.findById(id).lean();
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
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const body = await req.json();

  try {
    const { id } = await params;

    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updatedEvent);
  } catch (err) {
    console.error("Failed to update event:", err);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE an event

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params; // await Promise to get id string

    await Event.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete event:", err);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
