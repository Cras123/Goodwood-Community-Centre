// scripts/deleteWorkshopEvents.ts
import mongoose from "mongoose";
import Event from "@/models/Events";
import connectDB from "@/utils/db"; // adjust path as needed

const deleteWorkshopEvents = async () => {
  try {
    await connectDB();
    const result = await Event.deleteMany({ category: "Workshop" });
    console.log(`${result.deletedCount} events deleted.`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

deleteWorkshopEvents();
