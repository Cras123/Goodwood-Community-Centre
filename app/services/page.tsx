"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex flex-col space-y-16 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🔷 Hero Section with Background Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/img/services.jpg"
          alt="Our Services"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
        </div>
      </div>

      {/* 🟦 Service Cards */}
      <div className="px-6 container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Explore What We Offer</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Goodwood Community Centre provides diverse services — from venue
            hire and workshops to social events and support programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition"
            >
              <div className="relative w-full h-52">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  {service.category}
                </span>
                <Link
                  href={`/services/${service._id}`}
                  className="block mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
