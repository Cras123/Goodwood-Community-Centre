"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enAU } from "date-fns/locale/en-AU";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";
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
    </div>
  );
}
