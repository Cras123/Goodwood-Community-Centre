"use client";
import React, { useState, useEffect } from "react";
// src/pages/HireHallPage.tsx
import HallInfo from "@/components/HireHall/HallInfo";
import AvailabilityViewer from "@/components/HireHall/AvailabilityViewer";
import RulesSection from "@/components/HireHall/RulesSection";
import BookingForm from "@/components/HireHall/BookingForm";
import { halls as mockHalls, hallRules as mockRules } from "@/data/hallData";
import { Hall, HallRules } from "@/app/types/hallTypes";

import { Calendar } from "react-big-calendar";
import CalendarPage from "@/components/Calender";
const HireHallPage: React.FC = () => {
  // Add types to state variables
  const [halls, setHalls] = useState<Hall[]>([]);
  const [rules, setRules] = useState<HallRules | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // --- TODO: Backend Integration ---
    // Replace with actual API call using fetch or axios
    // fetch('/api/halls') // Assuming endpoint returns { halls: Hall[], rules: HallRules }
    //   .then(response => {
    //      if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //      }
    //      return response.json();
    //    })
    //   .then((data: { halls: Hall[], rules: HallRules }) => { // Type the expected response data
    //      setHalls(data.halls);
    //      setRules(data.rules);
    //      setLoading(false);
    //   })
    //   .catch((err: Error) => { // Type the error
    //      console.error("Failed to fetch hall data:", err);
    //      setError("Could not load hall information. Please try again later.");
    //      setLoading(false);
    //   });

    // Using mock data:
    const timer = setTimeout(() => {
      // Simulate network delay
      try {
        setHalls(mockHalls);
        setRules(mockRules);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load mock data:", err);
        setError("Could not load hall information.");
        setLoading(false);
      }
    }, 500); // 0.5 second delay

    // Cleanup function for timeout if component unmounts
    return () => clearTimeout(timer);
    // --- End Backend Integration Placeholder ---
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Hire a Hall or Meeting Room
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          View details, check availability guidelines, and make booking
          inquiries for our community spaces.
        </p>
      </header>

      <main>
        {loading && (
          <p className="text-center text-gray-500 py-10">
            Loading hall information...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-4 rounded">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (or Main Content Area) */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800 border-b pb-2">
                Available Spaces
              </h2>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  <span className="text-gray-700">Event</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded"></div>
                  <span className="text-gray-700">Hall Hire</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-300 rounded"></div>
                  <span className="text-gray-700">
                    Click on dates to book or scroll
                  </span>
                </div>
              </div>
              {halls.length > 0 ? (
                halls.map((hall) => (
                  <div key={hall.id} className="mb-10">
                    <CalendarPage />
                    <HallInfo hall={hall} />
                    <AvailabilityViewer hall={hall} />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No hall information available at this time.
                </p>
              )}

              {/* Display Booking Form after Hall sections */}
              {rules && <BookingForm rules={rules} />}
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-1">
              {rules && <RulesSection rules={rules} />}
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};
export default HireHallPage;
