"use client";

import React, { useState } from "react";
import Payment from "./Payment";

interface ParticipateFormProps {
  eventId: string;
  onSuccess: () => void;
  cost: string; // e.g. "Free", "$49.99", "0", "20"
  reference?: "participant" | "membership"; // Default is "participant"
}

const ParticipateForm: React.FC<ParticipateFormProps> = ({
  eventId,
  onSuccess,
  reference = "participant",
  cost = "Free",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null); // This is either participantId or membershipId

  const sanitizedCost =
    typeof cost === "string" ? cost.replace(/[^0-9.]/g, "") : "0";
  const numericCost = parseFloat(sanitizedCost);
  const isFree = isNaN(numericCost) || numericCost === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const response = await fetch("/api/participate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, eventId, cost }),
    });

    const result = await response.json();

    const newId = result.participantId || result.membershipId;
    if (response.ok && newId) {
      setGeneratedId(newId);
      setShowPayment(true);
    } else {
      setStatus("error");
    }
  }; // ✅ This closing brace was missing

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-xl mx-auto">
      {!showPayment ? (
        <form onSubmit={handleProceed} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Event Participation</h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            {isFree ? "Confirm Registration" : "Proceed to Payment"}
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Complete Your Payment</h3>
          {generatedId && (
            <Payment
              amount={numericCost}
              referenceId={generatedId}
              referenceType={reference}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ParticipateForm;
