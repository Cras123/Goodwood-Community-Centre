// src/components/HireHall/BookingForm.tsx
import React, { useState } from "react";
import { halls as availableHalls } from "@/data/hallData"; // Import halls for dropdown
import { HallRules, BookingFormData } from "@/app/types/hallTypes"; // Import types

interface BookingFormProps {
  rules: HallRules; // Rules object is expected
}

const BookingForm: React.FC<BookingFormProps> = ({ rules }) => {
  const initialFormData: BookingFormData = {
    name: "",
    email: "",
    phone: "",
    hallId: availableHalls[0]?.id || "", // Default to first hall
    eventDate: "",
    startTime: "",
    endTime: "",
    eventType: "",
    message: "",
  };
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Type the event parameter for input/select/textarea changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Type the event parameter for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("Processing your inquiry...");

    // --- TODO: Backend Integration ---
    console.log("Submitting booking inquiry:", formData);
    // Replace with actual API call (e.g., using fetch or axios)
    // fetch('/api/booking-inquiries', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)})
    //  .then(response => response.json())
    //  .then(data => { setStatusMessage('Success...'); setFormData(initialFormData); })
    //  .catch(error => { setStatusMessage('Error...'); });
    setTimeout(() => {
      setStatusMessage(
        `Thank you, ${formData.name}! Your inquiry for ${formData.eventDate} has been received. We will contact you shortly via ${formData.email} or ${formData.phone}.`
      );
      // setFormData(initialFormData); // Reset form
    }, 1500);
    // --- End Backend Integration Placeholder ---
  };

  return (
    <div
      id="booking-form"
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Make a Booking Inquiry
      </h3>
      <p className="text-gray-600 mb-6">
        Fill out this form to request a booking or ask questions. We'll check
        availability and get back to you. Alternatively, contact{" "}
        {rules.contact.name} directly via{" "}
        <a
          href={`mailto:${rules.contact.email}`}
          className="text-indigo-600 hover:underline"
        >
          {rules.contact.email}
        </a>{" "}
        or{" "}
        <a
          href={`tel:${rules.contact.phone.replace(/\s/g, "")}`}
          className="text-indigo-600 hover:underline"
        >
          {rules.contact.phone}
        </a>
        .
      </p>

      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded ${
            statusMessage.toLowerCase().includes("error")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="hallId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Hall/Room <span className="text-red-500">*</span>
            </label>
            <select
              id="hallId"
              name="hallId"
              value={formData.hallId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {availableHalls.map((hall) => (
                <option key={hall.id} value={hall.id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type of Event (e.g., Meeting, Workshop, Party)
          </label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Details or Questions
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
