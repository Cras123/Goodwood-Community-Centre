"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Event {
  _id: string;
  title: string;
  date: string;
  cost: string;
  imageUrl: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => router.push(`/events/${event._id}`)}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-sm font-semibold text-green-600">
                {event.cost}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
