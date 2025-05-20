import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Offering {
  _id: string;
  title: string;
  content: string;
}

const Offerings: React.FC = () => {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const fetchOfferings = async () => {
    const res = await fetch("/api/offerings");
    const data = await res.json();
    setOfferings(data);
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/offerings/${editId}` : "/api/offerings";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchOfferings();
      setShowForm(false);
      setFormData({ title: "", content: "" });
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/offerings/${id}`, { method: "DELETE" });
    fetchOfferings();
  };

  const handleEdit = (offering: Offering) => {
    setFormData({ title: offering.title, content: offering.content });
    setEditId(offering._id);
    setShowForm(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
          {isLoggedIn && (
            <button
              onClick={() => {
                setFormData({ title: "", content: "" });
                setEditId(null);
                setShowForm(true);
              }}
              className="bg-[#00aba9] text-white px-4 py-2 rounded hover:bg-[#0b7681]"
            >
              + Create
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {offerings.map((offer) => (
            <div
              key={offer._id}
              className="bg-white p-6 rounded shadow hover:shadow-lg relative"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-2">{offer.content}</p>
              {isLoggedIn && (
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-bold">
                {editId ? "Edit Offering" : "Create New Offering"}
              </h3>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00aba9] text-white px-4 py-2 rounded hover:bg-[#0b7681]"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Offerings;
