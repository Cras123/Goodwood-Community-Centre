"use client";
import { signOut, useSession } from "next-auth/react";

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
      className="w-fit h-10 rounded-full bg-[#00aba9] text-white font-bold flex items-center justify-center hover:bg-[#00724f] transition-all"
    >
      Log out
    </button>
  );
}
