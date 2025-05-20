"use client";

import { useEffect, useState } from "react";
import HallCalendar, { CalendarItem } from "./HallCalender";

export default function CalendarPage() {
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);

  const dummyData: CalendarItem[] = [];

  useEffect(() => {
    const fetchData = async () => {
      const [eventRes, bookingRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/bookings"),
      ]);

      const events = await eventRes.json();
      const bookingData = await bookingRes.json();
      const bookings = Array.isArray(bookingData.bookings)
        ? bookingData.bookings
        : []; // ✅ extract actual array

      const transformedEvents: CalendarItem[] = events.map((event: any) => {
        const start = new Date(event.date);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour later
        return {
          id: event._id,
          title: event.title,
          start,
          end,
          type: "Event",
        };
      });

      const transformedBookings: CalendarItem[] = bookings.map(
        (booking: any) => {
          const start = new Date(`${booking.eventDate}T${booking.startTime}`);
          const end = new Date(`${booking.eventDate}T${booking.endTime}`);
          return {
            title: booking.eventType || booking.name,
            start,
            end,
            type: "Booking",
          };
        }
      );

      setCalendarItems([...transformedEvents, ...transformedBookings]);
    };

    fetchData();
  }, []);
  console.log("Dummy data being used:", dummyData);

  return (
    <HallCalendar events={calendarItems.length ? calendarItems : dummyData} />
  );
}
