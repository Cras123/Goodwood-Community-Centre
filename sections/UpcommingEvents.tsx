"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewCard from "@/components/OverviewCard";
import Link from "next/link";
interface Event {
  _id: string;
  title: string;
  imageUrl: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 4;
  const totalItems = events.length;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        // ✅ Filter events that are today or later
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ✅ Set time to 00:00:00

        const upcoming = data.filter((event: any) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0); // ✅ Normalize event date
          return eventDate >= today;
        });

        setEvents(upcoming);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleNext = () => {
    if (visibleStartIndex + itemsPerPage < totalItems) {
      setDirection(1); // Next = Move left (new cards from right)
      setVisibleStartIndex(visibleStartIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (visibleStartIndex > 0) {
      setDirection(-1); // Prev = Move right (new cards from left)
      setVisibleStartIndex(visibleStartIndex - itemsPerPage);
    }
  };

  const displayedEvents = events.slice(
    visibleStartIndex,
    visibleStartIndex + itemsPerPage
  );

  return (
    <section className=" py-10 bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Upcoming Events & Programs
      </h2>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <button
          onClick={handlePrev}
          disabled={visibleStartIndex === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition"
        >
          &lt; Prev
        </button>
        <button
          onClick={handleNext}
          disabled={visibleStartIndex + itemsPerPage >= totalItems}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition"
        >
          Next &gt;
        </button>
      </div>

      {/* Event Cards */}
      <div className="relative overflow-hidden max-w-6xl mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={visibleStartIndex}
            initial={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-6"
          >
            {displayedEvents.map((event) => (
              <Link
                href={`/events/${event._id}`}
                key={event._id}
                className="w-full md:w-1/4"
              >
                <OverviewCard title={event.title} imageSrc={event.imageUrl} />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UpcomingEvents;
