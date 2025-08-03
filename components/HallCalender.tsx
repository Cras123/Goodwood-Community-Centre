"use client";
import BookingForm from "@/components/HireHall/BookingForm";
import { HallRules } from "@/app/types/hallTypes"; // or wherever your rules come from

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enAU } from "date-fns/locale/en-AU";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
import { hallRules } from "@/data/hallData";
const locales = {
  "en-AU": enAU,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface CalendarItem {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "Event" | "Booking";
}

interface Props {
  events: CalendarItem[];
}

export default function HallCalendar({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);

  const localDateString = selectedDate
    ? selectedDate.toLocaleDateString("en-CA") // e.g. "2025-07-16"
    : "";

  return (
    <div className="h-[700px] mt-6 px-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate} // ✅ control the date
        onNavigate={(date) => setCurrentDate(date)} // ✅ update it when nav is clicked
        defaultView="month"
        views={["month", "week", "day"]}
        style={{
          height: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
        onSelectEvent={(event) => {
          if (event.type === "Event") {
            router.push(`/events/${event.id}`);
          }
        }}
        eventPropGetter={(event) => {
          const backgroundColor =
            event.type === "Booking" ? "#ef4444" : "#3b82f6";
          return {
            style: {
              backgroundColor,
              borderRadius: "6px",
              color: "white",
              padding: "4px",
              border: "none",
              fontSize: "0.85rem",
              cursor: event.type === "Event" ? "pointer" : "default",
            },
          };
        }}
        selectable={true}
        onSelectSlot={(slotInfo) => {
          const clickedDate = slotInfo.start;

          const isBooked = events.some(
            (e) =>
              e.type === "Booking" &&
              e.start.toDateString() === clickedDate.toDateString()
          );

          if (isBooked) {
            alert("This date is already booked.");
            return;
          }
          setSelectedDate(clickedDate);
          setShowForm(true);
        }}
      />
      {showForm && selectedDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 pt-16"
            style={{
              maxHeight: "80vh", // Limit height to 80% of viewport height
              overflowY: "auto", // Enable vertical scrolling inside modal
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full z-20"
              aria-label="Close booking form"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
              Booking Inquiry
            </h2>

            <BookingForm rules={hallRules} defaultDate={localDateString} />
          </div>
        </div>
      )}
    </div>
  );
}
