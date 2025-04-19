// app/events/[id]/delete.ts
"use server";

import connectDB from "@/utils/db";
import Event from "@/models/Events";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export async function deleteEvent(id: string) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  await Event.findByIdAndDelete(id);
  redirect("/events");
}
