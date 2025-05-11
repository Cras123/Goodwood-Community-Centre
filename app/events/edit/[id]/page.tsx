"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  category: string;
  cost: string;
  imageUrl: string;
  repeatWeekly?: boolean;
  endRepeatDate?: string;
}

const EditEventPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const eventId = Array.isArray(id) ? id[0] : id;

  const [form, setForm] = useState<EventType | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [repeatWeekly, setRepeatWeekly] = useState<boolean>(false);
  const [endRepeatDate, setEndRepeatDate] = useState<string>("");

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      setForm(data);
      setPreview(data.imageUrl);
      setRepeatWeekly(!!data.repeatWeekly);
      setEndRepeatDate(
        data.endRepeatDate ? data.endRepeatDate.split("T")[0] : ""
      );
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (form) setForm({ ...form, [name]: value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = form?.imageUrl || "";
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
    }

    const updatedEvent = {
      ...form,
      imageUrl,
      repeatWeekly,
      endRepeatDate: repeatWeekly ? endRepeatDate : null,
    };

    const res = await fetch(`/api/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });

    if (res.ok) {
      alert("Event updated successfully!");
      router.push("/events");
    } else {
      alert("Failed to update event.");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold text-center">Edit Event</h2>
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
            value={form.date.split("T")[0]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
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
          <option value="Community">Community</option>
          <option value="Workshop">Workshop</option>
          <option value="Celebration">Celebration</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

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
          <div className="mt-2">
            <label className="block text-gray-700 mb-1">Repeat Until</label>
            <input
              type="date"
              value={endRepeatDate}
              onChange={(e) => setEndRepeatDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-24 rounded shadow"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
