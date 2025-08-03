"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import CheckoutPage from "./CheckoutPage";
import type { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentWrapperProps {
  amount: number;
  referenceId: string;
  referenceType: "participant" | "membership";
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({
  amount,
  referenceId,
  referenceType,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          referenceId,
          referenceType,
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [amount, referenceId, referenceType]);

  if (!clientSecret) return <div>Loading Stripe payment...</div>;

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage
        clientSecret="clientSecret"
        amount={amount}
        referenceId={referenceId}
        referenceType={referenceType}
      />
    </Elements>
  );
};

export default PaymentWrapper;
