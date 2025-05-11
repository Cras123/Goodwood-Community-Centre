import React from "react";
import connectDB from "@/utils/db";
import Service from "@/models/Services";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
interface ParamsProps {
  params: {
    id: string;
  };
}

async function getService(id: string) {
  await connectDB();
  const service = await Service.findById(id).lean();
  return JSON.parse(JSON.stringify(service));
}

export default async function ServiceDetailPage({ params }: ParamsProps) {
  const service = await getService(params.id);
  const session = await getServerSession(authOptions);

  if (!service) notFound();

  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-start gap-10">
        {/* Left Section: Text Box */}
        <div className="flex-1 bg-gray-400 text-black p-6 rounded-2xl space-y-4 shadow-lg">
          <h1 className="text-3xl font-bold text-center">{service.title}</h1>
          <p className="text-md leading-relaxed font-mono">
            {service.description ||
              "No description available for this service."}
          </p>
          <p className="font-semibold mt-2">Cost: {service.category}</p>
          <p className="font-medium">
            Address: Goodwood Community Hall, Adelaide, SA
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="flex-1 relative w-full h-72 md:h-96">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Contact Us Button */}
      <div className="mt-10">
        <Link
          href="/Contactus"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-md"
        >
          Contact us to book now
        </Link>
      </div>

      {/* Show only if authenticated */}
      {session && (
        <div className="flex gap-4 mt-10">
          <Link
            href={`/services/edit/${params.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit
          </Link>
          <DeleteButton id={params.id} type="services" />
        </div>
      )}
    </div>
  );
}
