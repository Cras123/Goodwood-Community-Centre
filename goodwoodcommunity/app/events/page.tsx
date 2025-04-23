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
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();

      // 🔥 Sort here
      const today = new Date();

      // Separate upcoming and past events
      const upcoming = data.filter(
        (event: Event) => new Date(event.date) >= today
      );
      const past = data.filter((event: Event) => new Date(event.date) < today);

      // Sort both upcoming and past
      const sortedUpcoming = upcoming.sort(
        (a: Event, b: Event) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const sortedPast = past.sort(
        (a: Event, b: Event) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Merge them: upcoming events first, then past events
      setEvents([...sortedUpcoming, ...sortedPast]);
    };
    fetchEvents();
  }, []);

  // Group after sorting
  const groupedEvents = events.reduce(
    (acc: { [key: string]: Event[] }, event) => {
      if (!acc[event.category]) {
        acc[event.category] = [];
      }
      acc[event.category].push(event);
      return acc;
    },
    {}
  );

  // Sort inside each category again (for safety)
  Object.keys(groupedEvents).forEach((category) => {
    groupedEvents[category].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  const categories = ["All", ...Object.keys(groupedEvents)];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <motion.div
      className="px-6 py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-4xl font-bold mb-4 md:mb-0 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore Our Events
        </motion.h1>

        {/* Category Dropdown */}
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
          <div key={category} className="mb-12">
            <motion.h2
              className="text-2xl font-bold text-blue-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {category}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {groupedEvents[category].map((event) => (
                <motion.div
                  key={event._id}
                  onClick={() => router.push(`/events/${event._id}`)}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
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
                    <h3 className="text-xl font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
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
        <div className="mb-12">
          <motion.h2
            className="text-2xl font-bold text-blue-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {selectedCategory}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedEvents[selectedCategory]?.map((event) => (
              <motion.div
                key={event._id}
                onClick={() => router.push(`/events/${event._id}`)}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
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
