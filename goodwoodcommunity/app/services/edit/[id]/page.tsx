"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EditServiceProps {
  params: {
    id: string;
  };
}

const EditServicePage = ({ params }: EditServiceProps) => {
  const router = useRouter();
  const [service, setService] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${params.id}`);
        const data = await res.json();
        setService({
          title: data.title,
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };

    fetchService();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/services/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    if (res.ok) {
      router.push(`/services/${params.id}`); // Redirect to service details after update
    } else {
      alert("Failed to update service");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={service.title}
          onChange={handleChange}
          placeholder="Service Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={service.description}
          onChange={handleChange}
          placeholder="Service Description"
          className="w-full border p-2 rounded"
          rows={5}
        />
        <input
          type="text"
          name="category"
          value={service.category}
          onChange={handleChange}
          placeholder="Service Category"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={service.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditServicePage;
