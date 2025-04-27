"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Event {
  _id: string;
  title: string;
  date: string;
  cost: string;
  imageUrl: string;
  category: string;
  repeatWeekly?: boolean;
  endRepeatDate?: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();

      const today = new Date();
      const upcoming = data.filter(
        (event: Event) => new Date(event.date) >= today
      );
      const past = data.filter((event: Event) => new Date(event.date) < today);

      const sortedUpcoming = upcoming.sort(
        (a: Event, b: Event) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const sortedPast = past.sort(
        (a: Event, b: Event) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setEvents([...sortedUpcoming, ...sortedPast]);
    };
    fetchEvents();
  }, []);

  const groupedEvents = events.reduce(
    (acc: { [key: string]: Event[] }, event) => {
      if (!acc[event.category]) acc[event.category] = [];
      acc[event.category].push(event);
      return acc;
    },
    {}
  );

  const categories = ["All", ...Object.keys(groupedEvents)];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <motion.div
      className="px-6 md:px-12 py-10 container mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      {latestEvent && (
        <motion.div
          className="relative h-[500px] w-full mb-16 rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={latestEvent.imageUrl}
            alt={latestEvent.title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-xl text-center">
              {/* 🛡️ New Motivational Line */}
              <motion.p
                className="text-md md:text-lg text-[#00aba9] font-semibold tracking-wide uppercase"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Are you ready for the event?
              </motion.p>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-[#00aba9] mb-4 drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {latestEvent.title}
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-[#00aba9]  mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {new Date(latestEvent.date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </motion.p>

              <motion.button
                onClick={() => router.push(`/events/${latestEvent._id}`)}
                className="bg-[#00aba9] hover:bg-[#23677c] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
              >
                View Event
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explore Our Events Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <motion.h1
          className="text-4xl font-bold mb-6 md:mb-0 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore Our Events/Programs
        </motion.h1>

        <motion.select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </motion.select>
      </div>

      {/* Events List */}
      {selectedCategory === "All" ? (
        Object.keys(groupedEvents).map((category) => (
          <div key={category} className="mb-16">
            <motion.h2
              className="text-2xl font-bold text-[#00aba9] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {category}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {groupedEvents[category].map((event) => (
                <motion.div
                  key={event._id}
                  onClick={() => router.push(`/events/${event._id}`)}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 cursor-pointer max-w-xs mx-auto flex flex-col h-[260px]"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {event.imageUrl ? (
                    <div className="relative w-60 h-88">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="p-4 text-center flex flex-col justify-center items-center space-y-2 h-full">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {/* Show Repeats if available */}
                    {event.repeatWeekly && event.endRepeatDate && (
                      <p className="text-xs text-blue-600">
                        Every week until{" "}
                        {new Date(event.endRepeatDate).toLocaleDateString(
                          undefined,
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}

                    <p className="text-sm font-semibold text-green-600">
                      {event.cost}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="mb-16">
          <motion.h2
            className="text-2xl font-bold text-[#00aba9] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {selectedCategory}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {groupedEvents[selectedCategory]?.map((event) => (
              <motion.div
                key={event._id}
                onClick={() => router.push(`/events/${event._id}`)}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 cursor-pointer max-w-xs mx-auto flex flex-col h-[260px]"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {event.imageUrl ? (
                  <div className="relative w-60 h-88">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4 text-center flex flex-col justify-center items-center space-y-2 h-full">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    {event.cost}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EventsPage;
