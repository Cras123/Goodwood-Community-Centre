"use client";

import { useState } from "react";
import ParticipateForm from "./ParticipateForm";

const ParticipateModal = ({ eventId }: { eventId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#00aba9] hover:bg-[#23677c] text-white font-bold px-6 py-3 rounded-lg transition mt-6"
      >
        Book
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            {/* Form */}
            <ParticipateForm
              eventId={eventId}
              onSuccess={() => setOpen(false)} // ✅ Close the modal after successful form submission
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipateModal;
