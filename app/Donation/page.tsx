"use client";

import Image from "next/image";
import Link from "next/link";

export default function DonationPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/goodwood_photos/logo.png"
            alt="Bucaan Logo"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Goodwood Community Centre
        </h2>
        <p className="text-gray-500 mb-1">@Goodwoodcommunity</p>
        <p className="text-sm text-gray-600 mb-4">
          Thank you for supporting Goodwood Community Centre Tasmania.
        </p>
        <Link
          href="https://paypal.me/bucaancommunity"
          target="_blank"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Donate Now
        </Link>
      </div>
    </main>
  );
}
