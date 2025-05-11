"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditStaff = () => {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await fetch(`/api/staff/${id}`);
      const data = await res.json();
      setName(data.name);
      setRole(data.role);
      setQuote(data.quote);
      setImageUrl(data.imageUrl);
      setLoading(false);
    };
    fetchStaff();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "staff");

    setUploading(true);
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;

    if (newImageFile) {
      try {
        finalImageUrl = await uploadImageToCloudinary(newImageFile);
      } catch (error) {
        alert("Failed to upload image!");
        return;
      }
    }

    const updatedStaff = { name, role, quote, imageUrl: finalImageUrl };

    const res = await fetch(`/api/staff/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStaff),
    });

    if (res.ok) {
      alert("Staff updated successfully!");
      router.push("/AboutUs");
    } else {
      alert("Error updating staff.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Staff</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Role/Position"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Inspirational Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
        className="w-full border p-3 rounded"
      />

      <div className="text-center">
        <img
          src={newImageFile ? URL.createObjectURL(newImageFile) : imageUrl}
          alt="Staff"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
      </div>

      <div className="flex flex-col items-center">
        <label className="cursor-pointer bg-[#00aba9] hover:bg-[#23677c] text-white font-semibold py-2 px-6 rounded-md shadow-md transition">
          {uploading ? "Uploading..." : "Choose New Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {uploading && (
          <p className="text-gray-500 mt-2 text-sm">Uploading image...</p>
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-[#00aba9] hover:bg-[#23677c] text-white font-bold py-3 rounded transition disabled:opacity-50"
      >
        {uploading ? "Please wait..." : "Update Staff"}
      </button>
    </form>
  );
};

export default EditStaff;
