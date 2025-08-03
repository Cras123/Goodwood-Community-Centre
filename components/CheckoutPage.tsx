import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

interface CheckoutPageProps {
  amount: number;
  clientSecret: string; // ✅ Add this prop
  referenceId?: string;
  referenceType?: "participant" | "membership";
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  amount,
  clientSecret, // ✅ Destructure it from props
  referenceId,
  referenceType,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe not ready or client secret missing.");
      setIsLoading(false);
      return;
    }

    // Optional: ensure the card details or form is completed
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Form submission failed.");
      setIsLoading(false);
      return;
    }

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({ amount: amount.toString() });
    if (referenceId) params.append("referenceId", referenceId);
    if (referenceType) params.append("referenceType", referenceType);

    const returnUrl = `${origin}/payment-success?${params.toString()}`;

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret, // ✅ Use the lowercase prop
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (paymentError) {
      setErrorMessage(paymentError.message || "Payment failed.");
    }

    setIsLoading(false);
  };

  if (!stripe || !elements) {
    return <div>Loading payment form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-black text-white font-bold py-3 mt-4 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutPage;
