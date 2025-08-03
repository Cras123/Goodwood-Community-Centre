import connectDB from "@/utils/db";
import Participant from "@/models/Participants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { eventId, name, email, phone, address, cost } = body;

    const numericCost =
      typeof cost === "string" ? parseFloat(cost.replace(/[^0-9.]/g, "")) : 0;
    const isFree = isNaN(numericCost) || numericCost === 0;
    const newParticipant = new Participant({
      eventId,
      name,
      email,
      phone,
      address,
      paymentStatus: isFree ? "Free" : "Pending", // Default to Pending, update later after payment
    });

    await newParticipant.save();

    return NextResponse.json({
      success: true,
      participantId: newParticipant._id,
      message: "Booking successful!",
    });
  } catch (error) {
    console.error("Error saving participant:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save booking." },
      { status: 500 }
    );
  }
}
