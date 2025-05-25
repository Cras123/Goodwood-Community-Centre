"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/AboutUs" },
    { name: "Booking", href: "#", hasDropdown: true },
    { name: "Hall Hire", href: "/hall-hire" },
    { name: "Membership", href: "/membership" },
    { name: "Donation", href: "/Donation" },
    { name: "Contact Us", href: "/Contactus" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-shadow ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/goodwood_photos/logo.png"
            alt="Logo"
            width={85}
            height={45}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 items-center text-slate-700 text-base font-medium">
          {navItems.map((item, idx) =>
            item.hasDropdown ? (
              <li key={idx} className="relative group">
                <button className="flex items-center gap-1 hover:text-[#00aba9]">
                  {item.name}
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.354a.75.75 0 111.02 1.1l-4.45 3.85a.75.75 0 01-1.02 0l-4.45-3.85a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                  <Link
                    href="/services"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Services
                  </Link>
                  <Link
                    href="/events"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Events
                  </Link>
                </div>
              </li>
            ) : (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-[#00aba9] font-semibold"
                      : "hover:text-[#00aba9]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
          {status === "authenticated" && (
            <div className="relative group">
              <Image
                src={session.user?.image || "/goodwood_photos/profile.png"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            </div>
          )}
        </ul>

        {/* Right: Hamburger Only */}
        <div className="flex items-center lg:hidden">
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <Link href="/">
            <Image
              src="/goodwood_photos/logo.png"
              alt="Logo"
              width={85}
              height={50}
            />
          </Link>
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-4 text-slate-700 text-base font-medium">
          {navItems.map((item, idx) => {
            if (item.hasDropdown) {
              return (
                <React.Fragment key={idx}>
                  <li>
                    <Link href="/services" onClick={toggleMobileMenu}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/events" onClick={toggleMobileMenu}>
                      Events
                    </Link>
                  </li>
                </React.Fragment>
              );
            }
            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={`${
                    isActive(item.href)
                      ? "text-[#00aba9] font-semibold"
                      : "hover:text-[#00aba9]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          {status === "authenticated" && (
            <div className="mt-4">
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
