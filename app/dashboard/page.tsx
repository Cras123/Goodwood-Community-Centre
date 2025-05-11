import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Auth"); // redirect to your login page
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="text-gray-600 mt-4">Email: {session.user?.email}</p>

      <LogoutButton />
    </div>
  );
}
