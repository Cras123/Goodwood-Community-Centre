"use client";

import Image from "next/image";
import { useState } from "react";
import PaymentPopup from "@/components/DonationPaymentPopup"; // You’ll create this

export default function DonationPage() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/goodwood_photos/logo.png"
            alt="Goodwood Logo"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Goodwood Community Centre
        </h2>
        <p className="text-gray-500 mb-1">@Goodwoodcommunity</p>
        <p className="text-sm text-gray-600 mb-4">
          Thank you for supporting Goodwood Community Centre Tasmania.
        </p>

        <button
          onClick={() => setShowPayment(true)}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Donate Now
        </button>
      </div>

      {showPayment && (
        <PaymentPopup amount={5} onClose={() => setShowPayment(false)} />
      )}
    </main>
  );
}
