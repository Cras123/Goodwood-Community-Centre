import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Event from "@/models/Events";
import Service from "@/models/Services";
import HallBooking from "@/models/HallBooking";
import Feedback from "@/models/Feedback";
import Participant from "@/models/Participants";
import Membership from "@/models/Membership";

export async function GET() {
  try {
    await connectDB();
    const participantsByEvent = await Participant.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "eventInfo",
        },
      },
      {
        $unwind: "$eventInfo",
      },
      {
        $group: {
          _id: "$eventInfo.title",
          participants: {
            $push: { name: "$name", email: "$email" },
          },
        },
      },
    ]);

    const [
      totalParticipants,
      participantDetails,
      totalMemberships,
      membershipDetails,
      totalEvents,
      totalBookings,
      totalServices,
      totalFeedback,
      latestFeedback,
      bookingsOverTime,
      bookingStatusCounts,
    ] = await Promise.all([
      Participant.countDocuments(),
      Participant.find({}, "name email").limit(5),
      Membership.countDocuments(),
      Membership.find({}, "name email").limit(5),
      Event.countDocuments(),
      HallBooking.countDocuments(),
      Service.countDocuments(),
      Feedback.countDocuments(),
      Feedback.find().sort({ createdAt: -1 }).limit(5),
      HallBooking.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdAt" },
              },
            },
            total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      HallBooking.aggregate([
        {
          $group: {
            _id: "$eventType",
            total: { $sum: 1 },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      totalParticipants,
      participantDetails,
      totalMemberships,
      membershipDetails,
      totalEvents,
      totalBookings,
      totalServices,
      totalFeedback,
      latestFeedback,
      bookingsOverTime,
      bookingStatusCounts,
      totalUsers: 0,
      userEmails: [],
      participantsByEvent,
    });
  } catch (error) {
    console.error("GET /api/dashboard-stats error:", error);
    return NextResponse.json(
      {  
        error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
