"use client";

import React, { useState } from "react";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setImageFile(file);
      await uploadImageToCloudinary(file);
    }
  };
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "staff");

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        throw new Error("No secure_url returned from Cloudinary");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again!");
      setImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const newStaff = { name, role, quote, imageUrl };

    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStaff),
    });

    if (res.ok) {
      alert("Staff created successfully!");
      setName("");
      setRole("");
      setQuote("");
      setImageFile(null);
      setImageUrl("");
    } else {
      alert("Error creating staff.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Staff</h2>

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

      {/* Upload section */}
      <div className="flex flex-col items-center">
        <label className="cursor-pointer bg-[#00aba9] hover:bg-[#23677c] text-white font-semibold py-2 px-6 rounded-md shadow-md transition">
          {uploading ? "Uploading..." : "Choose File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {uploading && (
          <p className="text-gray-600 mt-2 text-sm">
            Uploading image, please wait...
          </p>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="mt-6 w-32 h-32 object-cover rounded-full shadow-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-[#00aba9] hover:bg-[#23677c] text-white font-bold py-3 rounded transition disabled:opacity-50"
      >
        {uploading ? "Please wait..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateStaff;
