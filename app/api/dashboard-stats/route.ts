// src/pages/api/admin/dashboard-stats.ts
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Event from "@/models/Events";
import Service from "@/models/Services";
import HallBooking from "@/models/HallBooking";
import Feedback from "@/models/Feedback"; // if feedback collection exists

export async function GET() {
  await connectDB();

  const [
    totalEvents,
    totalServices,
    totalBookings,
    totalFeedback,
    recentBookingsRaw,
  ] = await Promise.all([
    Event.countDocuments(),
    Service.countDocuments(),
    HallBooking.countDocuments(),
    Feedback.countDocuments(),
    HallBooking.find().sort({ createdAt: -1 }).limit(5),
  ]);

  const bookingsOverTimeAgg = await HallBooking.aggregate([
    {
      $group: {
        _id: { $substr: ["$eventDate", 0, 10] }, // Group by date
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const bookingStatusAgg = await HallBooking.aggregate([
    {
      $group: {
        _id: "$status",
        value: { $sum: 1 },
      },
    },
  ]);

  const bookingsOverTime = bookingsOverTimeAgg.map((item) => ({
    date: item._id,
    count: item.count,
  }));

  const bookingStatusCounts = bookingStatusAgg.map((item) => ({
    status: item._id,
    value: item.value,
  }));

  const recentBookings = recentBookingsRaw.map((b) => ({
    name: b.name || "N/A",
    email: b.email || "N/A",
    date: b.eventDate,
    status: b.status || "Pending",
  }));

  return NextResponse.json({
    totalEvents,
    totalServices,
    totalBookings,
    totalFeedback,
    recentBookings,
    bookingsOverTime,
    bookingStatusCounts,
  });
}
