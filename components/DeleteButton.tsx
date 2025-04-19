"use client";

import { useRouter } from "next/navigation";

interface Props {
  id: string;
  type: "events" | "services"; // Accept both types
}

const DeleteButton = ({ id, type }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const res = await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push(`/${type}`); // redirect to list
      } else {
        alert(`Failed to delete ${type}`);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
    >
      Delete {type === "services" ? "Service" : "Event"}
    </button>
  );
};

export default DeleteButton;
