"use client";

import React, { useState } from "react";

const AddEventPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    address: "",
    category: "",
    cost: "",
    imageUrl: "",
    imagePreview: "",
  });
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [endRepeatDate, setEndRepeatDate] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // ← Cloudinary image URL
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedUrl = await handleUpload(file);
      setForm((prev) => ({
        ...prev,
        imageUrl: uploadedUrl,
        imagePreview: uploadedUrl,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.trim().length < 10) {
      alert("Description must be at least 10 characters.");
      return;
    }
    const eventData = {
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time,
      address: form.address,
      category: form.category,
      cost: form.cost,
      imageUrl: form.imageUrl,
      repeatWeekly,
      endRepeatDate: repeatWeekly ? endRepeatDate : null,
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        alert("Event added successfully!");
        setForm({
          title: "",
          description: "",
          date: "",
          time: "",
          address: "",
          category: "",
          cost: "",
          imageUrl: "",
          imagePreview: "",
        });
        setRepeatWeekly(false); // ✅ Also reset
        setEndRepeatDate("");
      } else {
        alert("Error adding event");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold text-center">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
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
          rows={4}
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="repeatWeekly"
              checked={repeatWeekly}
              onChange={(e) => setRepeatWeekly(e.target.checked)}
            />
            <label htmlFor="repeatWeekly" className="text-gray-700">
              Repeat Weekly
            </label>
          </div>

          {repeatWeekly && (
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Repeat Until</label>
              <input
                type="date"
                value={endRepeatDate}
                onChange={(e) => setEndRepeatDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Event Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="cost"
          placeholder="Cost (e.g. Free or $20)"
          value={form.cost}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Weekly Events">Weekly Events</option>
          <option value="Workshops & Programs">Workshops & Programs</option>
          <option value="Family & Fun">Family & Fun</option>
          <option value="Festivals & Celebrations">
            Festivals & Celebrations
          </option>
          <option value="Markets & Fairs">Markets & Fairs</option>
          <option value="Social & Networking">Social & Networking</option>
          <option value="Volunteering & Join Us">Volunteering & Join Us</option>
          <option value="Other">Other</option>
        </select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image (Local preview only)
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
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
