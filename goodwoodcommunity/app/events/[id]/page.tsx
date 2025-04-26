import { notFound } from "next/navigation";
import connectDB from "@/utils/db";
import Event from "@/models/Events";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";
interface Params {
  params: { id: string };
}

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  category: string;
  cost: string;
  imageUrl: string;
}

export default async function EventDetail({ params }: Params) {
  await connectDB();

  const event = (await Event.findById(
    params.id
  ).lean()) as unknown as EventType;

  if (!event || !("title" in event)) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <img src={event.imageUrl} alt={event.title} className="rounded mb-4" />
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="mt-4">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>
        <strong>Address:</strong> {event.address}
      </p>
      <p>
        <strong>Cost:</strong> {event.cost}
      </p>
      <p>
        <strong>Category:</strong> {event.category}
      </p>

      <div className="flex gap-4">
        <Link
          href={`/events/edit/${event._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <DeleteButton id={event._id.toString()} type="services" />
      </div>
    </div>
  );
}
