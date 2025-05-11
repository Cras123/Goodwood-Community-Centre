"use client";

import { useState } from "react";

const ParticipateForm = ({
  eventId,
  onSuccess,
}: {
  eventId: string;
  onSuccess: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/participate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        name,
        email,
        message,
        paymentStatus: "Pending",
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      onSuccess(); // call parent to close modal after few seconds
    } else {
      alert("Failed to participate.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      {success ? (
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you!</h2>
          <p className="text-gray-700">
            You have successfully registered for the event.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Participate in this Event</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#00aba9] hover:bg-[#23677c] text-white py-3 rounded font-bold"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ParticipateForm;
