"use client";
import React, { useState } from "react";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    // Add your password reset logic here
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-24 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border-t-4 border-[#00855e]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">
              Goodwood Community Centre
            </h1>
            <p className="text-slate-600">Reset your password</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                  required
                />
              </div>

              <p className="text-sm text-slate-600 mb-6">
                Enter your email address and we&apos;ll send you a reset link.
              </p>

              <button
                type="submit"
                className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e]"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                Password reset link has been sent to {email}
              </div>
              <p className="mb-4">
                Please check your email inbox and spam folder.
              </p>
            </div>
          )}

          <div className="text-center mt-4">
            <Link href="/Auth">
              <span className="text-[#00855e] hover:text-[#00724f] cursor-pointer transition-colors duration-300">
                Remembered your password?{" "}
                <span className="font-medium">Back to Login</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
