"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", email, password);
    // Add your authentication logic here
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
            <Link href="/login" className="flex-1">
              <button className="w-full bg-[#e9f0ff] text-[#00855e] font-semibold py-2 px-4 rounded-l-md">
                Login
              </button>
            </Link>
            <Link href="/signup" className="flex-1">
              <button className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-2 px-4 rounded-r-md font-medium transition-all duration-300">
                Sign Up
              </button>
            </Link>
          </div>

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
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e]"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/forgot-password">
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

export default AuthPage;
