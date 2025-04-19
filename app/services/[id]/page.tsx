// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import connectDB from "@/utils/db";
import Service from "@/models/Services";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";

interface Params {
  params: { id: string };
}

interface ServiceType {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default async function ServiceDetail({ params }: Params) {
  await connectDB();

  const { id } = await Promise.resolve(params);
  if (!id) return notFound();

  const service = (await Service.findById(id).lean()) as unknown as ServiceType;
  if (!service || !("name" in service)) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <img src={service.imageUrl} alt={service.name} className="rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
      <p className="text-gray-600 mb-2">{service.description}</p>

      <p className="mb-4">
        <strong>Price:</strong> {service.category}
      </p>

      <div className="flex gap-4">
        <Link
          href={`/services/edit/${service._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <DeleteButton id={service._id.toString()} type="services" />
      </div>
    </div>
  );
}
