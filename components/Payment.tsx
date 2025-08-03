"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import type { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentProps {
  amount: number; // in dollars
  referenceId: string;
  referenceType: "participant" | "membership";
}

const Payment: React.FC<PaymentProps> = ({
  amount,
  referenceId,
  referenceType,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // convert amount to cents here before sending
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          referenceId,
          referenceType,
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    fetchIntent();
  }, [amount, referenceId, referenceType]);

  if (!clientSecret) {
    return <p>Loading Stripe Elements...</p>;
  }

  // Stripe Elements options must include clientSecret only (and appearance if you want)
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "flat" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        amount={amount}
        referenceId={referenceId}
        referenceType={referenceType}
      />
    </Elements>
  );
};

export default Payment;
