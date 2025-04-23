"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      className="px-6 py-10 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🔥 Big Banner Image */}
      <div className="relative h-[300px] md:h-[450px] mb-12 overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/img/services.jpg"
          alt="Our Services"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Our Services
          </h1>
        </div>
      </div>

      {/* 🔥 Section Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold tracking-wide">
          Explore What We Offer
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
          Goodwood Community offers venue hire, engaging programs, support
          services, exciting events, and relaxing social spaces for everyone to
          enjoy.
        </p>
      </motion.div>

      {/* 🔥 Services Cards Side by Side */}
      {services.map((service, index) => (
        <motion.div
          key={service._id}
          whileHover={{ scale: 1.02 }}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300`}
        >
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto relative">
            {service.imageUrl ? (
              <Image
                src={service.imageUrl}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <span className="bg-pink-300 text-xs font-semibold px-3 py-1 rounded shadow">
                {service.category}
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {/* Optional: Short description if you have */}
              Discover more about our {service.category.toLowerCase()} service
              at Goodwood.
            </p>

            <Link
              href={`/services/${service._id}`}
              className="inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServicesPage;
