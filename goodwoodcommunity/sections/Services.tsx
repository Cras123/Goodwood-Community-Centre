"use client";
import React, { useState, useRef } from "react";
import { services } from "@/data/data"; // Assuming services data is stored in this file
import OverviewCard from "@/components/OverviewCard"; // Import OverviewCard component

const Services = () => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 4;
  const totalItems = services.length;

  // Handle Next Button
  const handleNext = () => {
    if (visibleStartIndex + itemsPerPage < totalItems) {
      setVisibleStartIndex(visibleStartIndex + itemsPerPage);
      if (containerRef.current) {
        const scrollDistance =
          containerRef.current.scrollLeft + containerRef.current.offsetWidth;
        containerRef.current.scrollTo({
          left: scrollDistance,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle Previous Button
  const handlePrev = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex(visibleStartIndex - itemsPerPage);
      if (containerRef.current) {
        const scrollDistance =
          containerRef.current.scrollLeft - containerRef.current.offsetWidth;
        containerRef.current.scrollTo({
          left: scrollDistance,
          behavior: "smooth",
        });
      }
    }
  };

  // Get the items to display
  const displayedServices = services.slice(
    visibleStartIndex,
    visibleStartIndex + itemsPerPage
  );

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          disabled={visibleStartIndex === 0}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 disabled:bg-gray-300"
        >
          &lt; Prev
        </button>

        <button
          onClick={handleNext}
          disabled={visibleStartIndex + itemsPerPage >= totalItems}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 disabled:bg-gray-300"
        >
          Next &gt;
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto" ref={containerRef}>
        <div className="flex space-x-6 justify-center">
          {displayedServices.map((service, index) => (
            <OverviewCard
              key={index}
              title={service.title}
              imageSrc={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
