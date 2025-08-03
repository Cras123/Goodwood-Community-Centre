import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
interface MyComponentProps {
  amount: number;
  membershipId: string;
  onClose: () => void;
}

export default function MembershipPaymentPopup({
  amount,
  membershipId,
  onClose,
}: MyComponentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100,
          referenceId: membershipId,
          referenceType: "membership",
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    fetchClientSecret();
  }, [amount, membershipId]);

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutPage
            clientSecret={clientSecret}
            amount={amount}
            referenceId={membershipId}
            referenceType="membership"
          />
        </Elements>
      ) : (
        <div>Loading payment form...</div>
      )}
    </div>
  );
}
