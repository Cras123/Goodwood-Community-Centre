"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverviewCard from "@/components/OverviewCard";
import Link from "next/link";
interface Service {
  _id: string;
  title: string;
  imageUrl: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 4;
  const totalItems = services.length;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleNext = () => {
    if (visibleStartIndex + itemsPerPage < totalItems) {
      setDirection(-1);
      setVisibleStartIndex(visibleStartIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (visibleStartIndex > 0) {
      setDirection(1);
      setVisibleStartIndex(visibleStartIndex - itemsPerPage);
    }
  };

  const displayedServices = services.slice(
    visibleStartIndex,
    visibleStartIndex + itemsPerPage
  );

  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>

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
            {displayedServices.map((service) => (
              <Link
                href={`/services/${service._id}`}
                key={service._id}
                className="w-full md:w-1/4"
              >
                <OverviewCard
                  title={service.title}
                  imageSrc={service.imageUrl}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
