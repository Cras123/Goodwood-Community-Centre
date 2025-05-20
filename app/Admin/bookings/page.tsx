"use client";
import { useEffect, useState } from "react";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Hall</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b._id}>
              <td className="border px-4 py-2">{b.name}</td>
              <td className="border px-4 py-2">{b.eventDate}</td>
              <td className="border px-4 py-2">{b.hallId}</td>
              <td className="border px-4 py-2">{b.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingsPage;
