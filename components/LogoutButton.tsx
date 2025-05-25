"use client";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { data: session } = useSession();
  const name = session?.user?.name || "A";

  const handleLogout = () => {
    signOut({ callbackUrl: "/Auth" });
  };

  return (
    <button
      onClick={handleLogout}
      title="Logout"
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00aba9] text-white font-medium hover:bg-[#007d7b] transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Log out</span>
    </button>
  );
}
