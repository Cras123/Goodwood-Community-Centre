// app/services/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-wider">OUR SERVICES</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Goodwood Community offers venue hire, engaging programs, support
          services, exciting events, and relaxing social spaces for everyone to
          enjoy.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="text-center bg-white rounded-lg shadow hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <Link href={`/services/${service._id}`}>
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="mx-auto object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </Link>
              <div className="absolute bottom-2 right-2 bg-pink-200 text-black text-sm font-semibold px-3 py-1 rounded shadow">
                {service.category}
              </div>
            </div>
            <p className="mt-4 font-semibold text-lg">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
