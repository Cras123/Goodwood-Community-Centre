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

const quickLinks = [
  { href: "/events/create", label: "Create Event" },
  { href: "/services/add", label: "Add Service" },
  { href: "/Admin/staff", label: "Admin" },
  { href: "#", label: "Volunteer" },
  { href: "/Auth", label: "Admin Portal" },
];

const AdminDashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  interface ParticipantDetail {
    name: string;
    email: string;
  }

  interface MembershipDetail {
    name: string;
    email: string;
  }

  interface FeedbackDetail {
    userMessage: string;
    userName: string;
    userEmail: string;
  }
  interface EventParticipantGroup {
    _id: string;
    participants: { name: string; email: string }[];
  }

  const [stats, setStats] = useState<{
    totalParticipants: number;
    participantEmails: string[];
    totalMemberships: number;
    totalEvents: number;
    totalBookings: number;
    totalServices: number;
    totalFeedback: number;
    latestFeedback: FeedbackDetail[];
    recentBookings: any[];
    bookingsOverTime: any[];
    bookingStatusCounts: any[];
    totalUsers: number;
    userEmails: string[];
    participantDetails: ParticipantDetail[];
    membershipDetails: MembershipDetail[];
    participantsByEvent: EventParticipantGroup[];
  }>({
    totalParticipants: 0,
    participantEmails: [],
    totalMemberships: 0,
    totalEvents: 0,
    totalBookings: 0,
    totalServices: 0,
    totalFeedback: 0,
    latestFeedback: [],
    recentBookings: [],
    bookingsOverTime: [],
    bookingStatusCounts: [],
    totalUsers: 0,
    userEmails: [],
    participantDetails: [],
    membershipDetails: [],
    participantsByEvent: [],
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  const fetchStats = async () => {
    const res = await fetch("/api/dashboard-stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  const bookingLineData = {
    labels: stats.bookingsOverTime.map((b) => b._id),
    datasets: [
      {
        label: "Bookings",
        data: stats.bookingsOverTime.map((b) => b.total || 0),
        fill: false,
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  const statusPieData = {
    labels: stats.bookingStatusCounts.map((s) => s._id),
    datasets: [
      {
        data: stats.bookingStatusCounts.map((s) => s.total || 0),
        backgroundColor: ["#34D399", "#FBBF24", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-8">Admin Panel</h2>
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-700">
            QUICK LINKS
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 rounded hover:bg-blue-50 text-blue-600 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-4 sm:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Dashboard
          </h1>
          <button
            onClick={fetchStats}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded shadow transition"
          >
            ⟳ Refresh Stats
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Participants"
            value={stats.totalParticipants}
            color="bg-blue-100"
          />
          <StatCard
            title="Memberships"
            value={stats.totalMemberships}
            color="bg-indigo-100"
          />
          <StatCard
            title="Events"
            value={stats.totalEvents}
            color="bg-green-100"
          />
          <StatCard
            title="Bookings"
            value={stats.totalBookings}
            color="bg-yellow-100"
          />
          <StatCard
            title="Services"
            value={stats.totalServices}
            color="bg-pink-100"
          />
          <StatCard
            title="Feedback"
            value={stats.totalFeedback}
            color="bg-purple-100"
          />
          <StatCard
            title="Users"
            value={stats.totalUsers}
            color="bg-orange-100"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Bookings Over Time
            </h3>
            <Line data={bookingLineData} />
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Booking Status
            </h3>
            <Pie data={statusPieData} />
          </div>
        </div>

        {/* Participants by Event */}
        {stats.participantsByEvent?.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Participants by Event
            </h2>
            <ul className="space-y-4">
              {stats.participantsByEvent.map((event, i) => (
                <li key={i}>
                  <h3 className="text-lg font-bold text-gray-800">
                    {event._id}
                  </h3>
                  <ul className="pl-4 mt-2 space-y-1">
                    {event.participants.map((p, j) => (
                      <li key={j} className="border p-2 rounded">
                        <p className="font-medium text-gray-700">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          Email: {p.email}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Members */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Members</h2>
          <ul className="space-y-2">
            {stats.membershipDetails.map((m, i) => (
              <li key={i} className="border p-3 rounded">
                <p className="font-medium text-gray-800">{m.name}</p>
                <p className="text-sm text-gray-500">Email: {m.email}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Feedback */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Latest Feedback
          </h2>
          <ul className="space-y-3">
            {stats.latestFeedback.map((fb, i) => (
              <li key={i} className="border p-3 rounded">
                <p className="text-gray-800 font-medium">{fb.userMessage}</p>
                <p className="text-sm text-gray-500">Name: {fb.userName}</p>
                <p className="text-sm text-gray-500">Email: {fb.userEmail}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  color: string; // Tailwind color class
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className={`${color} p-4 rounded shadow text-center`}>
    <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    <p className="text-gray-600">{title}</p>
  </div>
);

export default AdminDashboardPage;
