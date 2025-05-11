import connectDB from "@/utils/db";
import Participant from "@/models/Participants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { eventId, name, email, message, paymentStatus } = body;

    const newParticipant = new Participant({
      eventId,
      name,
      email,
      message,
      paymentStatus,
    });

    await newParticipant.save();

    // (Optional) Send email notification to admin (later we add this)

    return NextResponse.json({
      success: true,
      message: "Participation saved!",
    });
  } catch (error) {
    console.error("Error saving participant:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save participation." },
      { status: 500 }
    );
  }
}
