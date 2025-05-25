import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Feedback from "@/models/Feedback";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Ensure checkbox string is converted to boolean
    body.ndaRequested = body.ndaRequested === "on";

    await connectDB();

    const feedback = new Feedback(body);
    await feedback.save();

    return NextResponse.json({ message: "Feedback submitted successfully." });
  } catch (err) {
    console.error("Error saving feedback:", err);
    return NextResponse.json(
      { error: "Failed to submit feedback." },
      { status: 500 }
    );
  }
}
