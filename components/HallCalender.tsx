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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            <BookingForm
              rules={hallRules} // 👈 Replace with your actual HallRules object
              defaultDate={selectedDate.toISOString().split("T")[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
