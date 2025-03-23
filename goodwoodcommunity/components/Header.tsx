"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyLogo
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <Link href="#home" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link href="#services" className="hover:text-blue-500">
              Services
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-blue-500">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700">
            <li>
              <Link href="#home" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="#services" onClick={() => setIsOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
