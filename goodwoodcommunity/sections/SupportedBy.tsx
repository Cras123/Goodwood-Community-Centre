// src/sections/SupportedBy.tsx
import React from "react";
import Image from "next/image";

const SupportedBy = () => {
  return (
    <section className="bg-gray-100 py-10 mt-16">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Funded & Supported by
        </h2>

        <div className="relative w-64 h-32">
          <Image
            src="/img/tas-gov-logo.png"
            alt="Tasmanian Government Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-gray-600 max-w-xl text-lg">
          The Goodwood Community Centre has been proudly funded and supported by
          the Tasmanian Government.
        </p>
      </div>
    </section>
  );
};

export default SupportedBy;
