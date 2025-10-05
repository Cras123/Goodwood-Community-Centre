"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [testToken, setTestToken] = useState(""); // For development only

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setIsSubmitted(true);
        // Only show token in development mode
        if (process.env.NODE_ENV === "development" && data.token) {
          setTestToken(data.token);
        }
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

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
              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  Enter the email address associated with your account, and
                  we&apos;ll send you a link to reset your password.
                </p>
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
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <button
                type="submit"
                className={`w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e] ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16 text-[#00855e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-slate-600 mb-4">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-slate-700">{email}</span>
              </p>
              <p className="text-slate-500 text-sm mb-6">
                If you don&apos;t see the email, check your spam folder or
                request another link.
              </p>

              {testToken && process.env.NODE_ENV === "development" && (
                <div className="mt-4 text-left bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-sm text-yellow-800 font-medium">
                    Development Mode - Password Reset Token:
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Copy this token to test password reset functionality
                  </p>
                  <pre className="bg-gray-100 p-2 mt-2 rounded text-xs break-all border">
                    {testToken}
                  </pre>
                  <p className="text-xs mt-2 text-yellow-700">
                    Test URL:{" "}
                    <code className="font-mono bg-gray-100 px-1 rounded">
                      /Auth/reset-password?token={testToken}
                    </code>
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-6">
            <Link href="/Auth">
              <span className="text-[#00855e] hover:text-[#00724f] cursor-pointer transition-colors duration-300">
                Back to <span className="font-medium">Login</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
