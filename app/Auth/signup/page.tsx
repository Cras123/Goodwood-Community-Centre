"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
      router.push("/Auth"); // redirect to login page
    } else {
      alert(data.error || "Signup failed");
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
            <p className="text-slate-600">Create a new account</p>
          </div>

          <div className="flex mb-6">
            <Link href="/Auth" className="flex-1">
              <button className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-2 px-4 rounded-l-md font-medium transition-all duration-300">
                Login
              </button>
            </Link>
            <Link href="/Auth/signup" className="flex-1">
              <button className="w-full bg-[#e9f0ff] text-[#00855e] font-semibold py-2 px-4 rounded-r-md">
                Sign Up
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                required
              />
            </div>

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

            <div className="mb-4">
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-slate-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00855e]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00855e] hover:bg-[#00724f] text-white py-3 px-4 rounded font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00855e]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
