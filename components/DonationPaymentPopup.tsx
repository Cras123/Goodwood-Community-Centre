"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import { useState, useEffect } from "react";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
  amount: number;
  onClose: () => void;
}

export default function PaymentPopup({ amount, onClose }: Props) {
  const subAmount = convertToSubcurrency(amount);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: subAmount }),
      });
      if (!res.ok) {
        console.error("Failed to create payment intent");
        return;
      }
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [subAmount]);
  if (!clientSecret) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 text-center">
          <p className="text-gray-600">Loading payment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2 text-center">Support Us</h2>
        <p className="text-gray-600 text-center mb-4">
          Your $5 donation makes a big impact!
        </p>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: subAmount,
            currency: "aud",
          }}
        >
          <CheckoutPage amount={amount} clientSecret={clientSecret} />
        </Elements>
      </div>
    </div>
  );
}
