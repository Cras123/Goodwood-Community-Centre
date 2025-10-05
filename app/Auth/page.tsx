"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import { Suspense } from "react";

const AuthPage = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlMessage = searchParams.get("message");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        // Handle specific error cases
        if (res.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.");
        } else if (
          res.error.includes("rate limit") ||
          res.error.includes("Too many")
        ) {
          setError("Too many login attempts. Please try again later.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (res?.url) {
        router.push(res.url);
      } else if (res?.ok) {
        // Successful login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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
            <p className="text-slate-600">Login to your account</p>
          </div>

          <div className="flex mb-6">
            <Link href="/Auth" className="flex-1">
              <button className="w-full bg-[#e9f0ff] text-[#00855e] font-semibold py-2 px-4 rounded-l-md">
                Login
              </button>
            </Link>
          </div>

          {/* Error Messages */}
          {(error || urlError) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm text-center">
                {error || "Invalid login credentials."}
              </p>
            </div>
          )}

          {/* Success Messages */}
          {urlMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700 text-sm text-center">{urlMessage}</p>
            </div>
          )}

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

            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00855e] hover:bg-[#00724f]"
              } text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e]`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/Auth/forget-password">
              <span className="text-[#00855e] hover:text-[#00724f] cursor-pointer transition-colors duration-300">
                Forgot your password?{" "}
                <span className="font-medium">Reset here</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

const AuthPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthPage />
  </Suspense>
);

export default AuthPageWithSuspense;
