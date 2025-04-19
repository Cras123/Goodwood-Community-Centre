"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo.png"
            alt="Good Wood Community Centre Logo"
            width={25}
            height={25}
          />
        </div>

        {/* Centered Text */}
        <div className="text-center flex-1">
          <p className="text-sm md:text-base max-w-lg mx-auto">
            © {new Date().getFullYear()} Goodwood Community Centre | ABN
            89459396771 | Reg. No. XXXXXXX
          </p>

          <Link rel="stylesheet" href="/events/create">
            create{" "}
          </Link>

          <Link rel="stylesheet" href="/services/add">
            add{" "}
          </Link>
        </div>

        {/* Social Links (arranged vertically) */}
        <div className="flex flex-col gap-6">
          <Link
            href="#"
            style={{
              background: "linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)",
            }}
            className="hover:opacity-90 transition px-4 py-1 rounded flex items-center gap-2"
          >
            <FaInstagram size={20} />
            Instagram
          </Link>
          <Link
            href="#"
            className="bg-blue-500 hover:bg-blue-400 transition px-4 py-2 rounded flex items-center gap-2"
          >
            <FaFacebook size={20} />
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
}
