import React, { useState, useEffect, useRef } from "react";
import { halls as availableHalls } from "@/data/hallData";
import { HallRules, BookingFormData } from "@/app/types/hallTypes";
import { useSearchParams } from "next/navigation";

interface BookingFormProps {
  rules: HallRules;
  defaultDate?: string;
  onClose?: () => void; // Optional close handler for modal
}

const BookingForm: React.FC<BookingFormProps> = ({
  rules,
  defaultDate,
  onClose,
}) => {
  const searchParams = useSearchParams();
  const selectedDate = defaultDate || searchParams.get("date") || "";

  const initialFormData: BookingFormData = {
    name: "",
    email: "",
    phone: "",
    hallId: availableHalls[0]?.id || "",
    eventDate: selectedDate,
    startTime: "",
    endTime: "",
    eventType: "",
    message: "",
  };

  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Focus the first input on open
  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Update eventDate if defaultDate changes (e.g., when opening the modal)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      eventDate: selectedDate,
    }));
  }, [selectedDate]);

  // Validation
  const validate = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.hallId ||
      !formData.eventDate
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      setError("End time must be after start time.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatusMessage("Submitting your inquiry...");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        setStatusMessage(
          error.error || "This hall is already booked for the selected date."
        );
        setSubmitting(false);
        return;
      }

      const result = await response.json();
      setStatusMessage(
        `Thank you, ${result.booking.name}! Your booking for ${result.booking.eventDate} has been received.`
      );
      setFormData(initialFormData); // Reset form
      setSubmitting(false);
    } catch (err: any) {
      setStatusMessage(
        "Error submitting your booking. Please try again later."
      );
      setSubmitting(false);
    }
  };

  return (
    <div
      id="booking-form"
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative"
    >
      {/* Close button for modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          aria-label="Close booking form"
          type="button"
        >
          &times;
        </button>
      )}

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

      {/* Status/Error Messages */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-800">{error}</div>
      )}
      {statusMessage && !error && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full sm:w-auto px-6 py-2 font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${
              submitting
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
