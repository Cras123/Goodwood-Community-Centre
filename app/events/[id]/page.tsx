import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { notFound } from "next/navigation";
import connectDB from "@/utils/db";
import Event from "@/models/Events";
import DeleteButton from "@/components/DeleteButton";
import ParticipateModal from "@/components/ParticipateModal"; // Add this if not already imported
import Link from "next/link";

interface Params {
  params: { id: string };
}

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  category: string;
  cost: string;
  imageUrl: string;
  repeatWeekly?: boolean; // 👈 add this (optional)
  endRepeatDate?: string; // 👈 add this (optional)
}

export default async function EventDetail({ params }: Params) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const rawEvent = await Event.findById(params.id).lean<EventType>();

  if (!rawEvent) return notFound();

  const event = {
    ...rawEvent,
    _id: rawEvent._id.toString(), // 👈 Important: Convert _id to plain string!
  } as unknown as EventType;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Event Image */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Event Information */}
        <div className="p-4 flex flex-col justify-center items-center text-center space-y-3 h-full">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>

          {/* Description */}
          <p className="text-gray-600">{event.description}</p>

          {/* Date */}
          <p className="text-sm text-gray-600">
            📅{" "}
            {new Date(event.date).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Time */}
          <p className="text-sm text-gray-600">🕒 {event.time}</p>

          {/* Repeats */}
          {event.repeatWeekly && event.endRepeatDate && (
            <p className="text-xs text-blue-500">
              🔁 Every week until{" "}
              {new Date(event.endRepeatDate).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {/* Address */}
          <p className="text-sm text-gray-600">📍 {event.address}</p>

          {/* Cost */}
          <p className="text-lg font-semibold text-green-600">{event.cost}</p>
          <ParticipateModal eventId={event._id} />
        </div>
      </div>

      {/* Actions: Participate + Edit + Delete */}
      {session && (
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href={`/events/edit/${event._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <DeleteButton id={event._id} type="events" />
        </div>
      )}
    </div>
  );
}
