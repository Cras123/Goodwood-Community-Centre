"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const AdminDashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalServices: 0,
    totalBookings: 0,
    totalFeedback: 0,
    recentBookings: [],
    bookingsOverTime: [],
    bookingStatusCounts: [],
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/dashboard-stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  const bookingLineData = {
    labels: stats.bookingsOverTime.map((b) => b.date || b._id),
    datasets: [
      {
        label: "Bookings",
        data: stats.bookingsOverTime.map((b) => b.count || b.total || 0),
        fill: false,
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const statusPieData = {
    labels: stats.bookingStatusCounts.map((s) => s.status || s._id),
    datasets: [
      {
        data: stats.bookingStatusCounts.map((s) => s.value || s.total || 0),
        backgroundColor: ["#34D399", "#FBBF24", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link href="/admin/events">
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:bg-blue-200 transition cursor-pointer text-center">
            <h2 className="text-3xl font-bold text-blue-800">
              {stats.totalEvents}
            </h2>
            <p className="text-blue-600">Total Events</p>
          </div>
        </Link>

        <Link href="/admin/services">
          <div className="bg-green-100 p-6 rounded-lg shadow hover:bg-green-200 transition cursor-pointer text-center">
            <h2 className="text-3xl font-bold text-green-800">
              {stats.totalServices}
            </h2>
            <p className="text-green-600">Total Services</p>
          </div>
        </Link>

        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-yellow-800">
            {stats.totalBookings}
          </h2>
          <p className="text-yellow-600">Total Bookings</p>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-purple-800">
            {stats.totalFeedback}
          </h2>
          <p className="text-purple-600">Feedback Entries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Bookings Over Time
          </h3>
          <Line data={bookingLineData} />
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Booking Status
          </h3>
          <Pie data={statusPieData} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentBookings.map((booking, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
