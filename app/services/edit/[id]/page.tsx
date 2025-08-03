"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface ServiceType {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const EditServicePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const serviceId = Array.isArray(id) ? id[0] : id;

  const [form, setForm] = useState<ServiceType>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // Fetch service on mount
  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          imageUrl: data.imageUrl || "",
        });
        setPreview(data.imageUrl || "");
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    if (serviceId) fetchService();
  }, [serviceId]);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload image to your API (e.g., Cloudinary)
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.secure_url; // Adjust based on your upload API response
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = form.imageUrl;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const updatedService = {
        ...form,
        imageUrl,
      };

      const res = await fetch(`/api/services/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });

      if (res.ok) {
        alert("Service updated successfully!");
        router.push(`/services/${serviceId}`);
      } else {
        alert("Failed to update service.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during update.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold text-center">Edit Service</h2>
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
          placeholder="Service Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditServicePage;
