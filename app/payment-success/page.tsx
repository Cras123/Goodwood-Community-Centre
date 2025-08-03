"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const referenceId = searchParams.get("referenceId");
  const referenceType = searchParams.get("referenceType");

  const [status, setStatus] = useState("⏳ Processing...");

  useEffect(() => {
    if (!referenceId || !referenceType) {
      setStatus("🙏 Thank you for your donation!");
      return;
    }

    const updateStatus = async () => {
      try {
        const res = await fetch("/api/payment-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referenceId, referenceType }),
        });

        const data = await res.json();
        setStatus(
          data.success
            ? "✅ Payment confirmed and record updated."
            : `⚠️ Payment succeeded, but ${referenceType} update failed.`
        );
      } catch (err) {
        console.error("❌ Error:", err);
        setStatus("❌ Error updating payment status.");
      }
    };

    updateStatus();
  }, [referenceId, referenceType]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        Thank you for your payment of{" "}
        <span className="font-bold text-black">
          A${parseFloat(amount || "0").toFixed(2)}
        </span>
        .
      </p>
      <p className="text-gray-600">{status}</p>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={<div className="text-center p-6 text-gray-600">Loading...</div>}
    >
      <PaymentSuccess />
    </Suspense>
  );
}
