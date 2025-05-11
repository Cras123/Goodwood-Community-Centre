// app/services/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddServicePage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    imagePreview: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
        imagePreview: data.secure_url,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Service added!");
      router.push("/services");
    } else {
      alert("Error adding service");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold text-center">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <input
          name="category"
          placeholder="Price"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        ></input>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {form.imagePreview && (
            <img
              src={form.imagePreview}
              alt="Preview"
              className="mt-4 h-24 rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServicePage;
