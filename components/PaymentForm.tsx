"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";

interface PaymentFormProps {
  amount: number;
  referenceId?: string;
  referenceType?: "participant" | "membership";
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  referenceId,
  referenceType,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Fetch client secret
  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
        const data = await res.json();
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorMessage("Failed to retrieve payment intent.");
        }
      } catch (error) {
        setErrorMessage("Error connecting to payment server.");
      }
    };
    fetchIntent();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe not ready or client secret missing.");
      setIsLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Form submission failed.");
      setIsLoading(false);
      return;
    }

    const returnUrlParams = new URLSearchParams({
      amount: amount.toString(),
    });
    if (referenceId && referenceType) {
      returnUrlParams.append("referenceId", referenceId);
      returnUrlParams.append("referenceType", referenceType);
    }
    // Build absolute return_url dynamically
    const returnUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/payment-success?amount=${amount}&referenceId=${referenceId}&referenceType=${referenceType}`
        : "";

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
      },
    });
    if (paymentError) {
      setErrorMessage(paymentError.message || "Payment failed.");
    }

    setIsLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="text-center p-6 text-gray-600">
        Loading payment form...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
