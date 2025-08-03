"use client";

import { useState, useEffect } from "react";
import ParticipateForm from "./ParticipateForm";

interface ParticipateModalProps {
  eventId: string;
  cost: string; // e.g., "Free", "$49.99"
}

const ParticipateModal: React.FC<ParticipateModalProps> = ({
  eventId,
  cost,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#00aba9] hover:bg-[#23677c] text-white font-bold px-6 py-3 rounded-lg transition mt-6"
      >
        Book
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Book This Event
            </h2>

            <ParticipateForm
              eventId={eventId}
              cost={cost}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipateModal;
