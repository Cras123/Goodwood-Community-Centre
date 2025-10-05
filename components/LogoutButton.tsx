"use client";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({
        callbackUrl: "/Auth",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
      // Force redirect if logout fails
      window.location.href = "/Auth";
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      title="Logout"
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
        isLoggingOut
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#00aba9] hover:bg-[#007d7b]"
      }`}
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">
        {isLoggingOut ? "Logging out..." : "Log out"}
      </span>
    </button>
  );
}
