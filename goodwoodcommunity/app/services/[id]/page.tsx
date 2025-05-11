import React from "react";
import connectDB from "@/utils/db";
import Service from "@/models/Services";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation"; // 👈 added

interface ParamsProps {
  params: {
    id: string;
  };
}

async function getService(id: string) {
  await connectDB();
  const service = await Service.findById(id).lean();
  return JSON.parse(JSON.stringify(service)); // Fix for MongoDB object
}

export default async function ServiceDetailPage({ params }: ParamsProps) {
  const service = await getService(params.id);

  if (!service) {
    notFound(); // 👈 better way
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={800}
            height={500}
            className="rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg mb-4">
          {service.description || "No description available."}
        </p>
        <div className="text-sm text-gray-600">Price: {service.category}</div>
      </div>

      <div className="flex gap-4 mt-8">
        <Link
          href={`/services/edit/${params.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Edit
        </Link>

        <DeleteButton id={params.id} type="services" />
      </div>
    </div>
  );
}
