import mongoose from "mongoose";

const hallBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    hallId: { type: String, required: true },
    eventDate: { type: String, required: true },
    startTime: String,
    endTime: String,
    eventType: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.HallBooking ||
  mongoose.model("HallBooking", hallBookingSchema);
