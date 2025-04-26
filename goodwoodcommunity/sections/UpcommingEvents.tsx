"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewCard from "@/components/OverviewCard";

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
        setEvents(data);
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
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upcoming Events / Programs
      </h2>

      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <button
          onClick={handlePrev}
          disabled={visibleStartIndex === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-300"
        >
          &lt; Prev
        </button>

        <button
          onClick={handleNext}
          disabled={visibleStartIndex + itemsPerPage >= totalItems}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-300"
        >
          Next &gt;
        </button>
      </div>

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
              <OverviewCard
                key={event._id}
                title={event.title}
                imageSrc={event.imageUrl}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UpcomingEvents;
