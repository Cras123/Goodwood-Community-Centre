"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../components/Header";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Validate token (simplified for example)
    if (!token) {
      setIsValid(false);
      setError(
        "Invalid or expired password reset link. Please request a new one."
      );
    }
  }, [token]);

  const validatePassword = (password: string) => {
    return password.length >= 8; // Basic validation, enhance as needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset with token:", token);
      console.log("New password set (not showing for security)");
      setIsLoading(false);
      setIsSuccess(true);
      // Add your actual password reset logic here
    }, 1500);
  };

  const redirectToLogin = () => {
    router.push("/Auth");
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
            <p className="text-slate-600">Create a new password</p>
          </div>

          {!isValid ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Invalid Reset Link</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <Link href="/Auth/forgot-password">
                <button className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium">
                  Request New Reset Link
                </button>
              </Link>
            </div>
          ) : isSuccess ? (
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
              <h2 className="text-xl font-bold mb-2">
                Password Reset Successful
              </h2>
              <p className="text-slate-600 mb-6">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
              <button
                onClick={redirectToLogin}
                className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300"
              >
                Login to Your Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="password" className="block text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-slate-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e] ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
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

export default function ResetPasswordPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
