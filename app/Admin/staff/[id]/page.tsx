"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Staff {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
}

const StaffDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await fetch(`/api/staff/${id}`);
      const data = await res.json();
      setStaff(data);
    };

    fetchStaff();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this staff?")) {
      await fetch(`/api/staff/${id}`, { method: "DELETE" });
      router.push("/about-us"); // Go back after delete
    }
  };

  if (!staff) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <img
        src={staff.imageUrl}
        alt={staff.name}
        className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
      />
      <h2 className="text-3xl font-bold text-center mb-2">{staff.name}</h2>
      <h3 className="text-xl text-center text-gray-600 mb-4">{staff.role}</h3>
      <p className="text-center italic text-gray-500 mb-6">"{staff.quote}"</p>

      <div className="flex justify-center space-x-6">
        <button
          onClick={() => router.push(`/Admin/staff/${id}/edit`)}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StaffDetail;
