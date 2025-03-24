"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  ); // Track the open dropdown

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index: number) => {
    // Toggle the dropdown for specific index
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // Navigation items array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/Aboutus" },
    { name: "Booking", href: "#", hasDropdown: true },
    { name: "Hall Hire", href: "/hall-hire" },
    { name: "Membership", href: "/membership" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-6 md:px-8 py-4">
      <nav className="block w-full max-w-screen px-4 py-4 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <Link
            href="/"
            className="mr-4 block cursor-pointer py-1.5 text-[#27AE60] font-bold text-2xl"
          >
            GwCC
          </Link>

          <div className="lg:hidden">
            <button
              className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden z-50`}
          >
            <div className="flex flex-row items-center border-b pb-4">
              <Link
                href="/"
                className="cursor-pointer text-red-600 font-bold text-xl pt-4 ps-4"
              >
                GwCC
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4">
              {navItems.map((item, index) =>
                item.hasDropdown ? (
                  // Instead of showing the parent "Booking", directly render its children.
                  <React.Fragment key={index}>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600 hover:text-red-500">
                      <Link href="/booking/room" className="flex items-center">
                        Booking Services
                      </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600 hover:text-red-500">
                      <Link href="/booking/event" className="flex items-center">
                        Booking Events
                      </Link>
                    </li>
                  </React.Fragment>
                ) : (
                  <li
                    key={index}
                    className="flex items-center p-1 text-sm gap-x-2 text-slate-600 hover:text-red-500"
                  >
                    <Link href={item.href} className="flex items-center">
                      {item.name}
                    </Link>
                  </li>
                )
              )}
              <li className="mt-4">
                <button className="bg-[#27AE60] hover:bg-[#006B1A] text-white px-8 py-2 rounded-md">
                  Login
                </button>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems.map((item, index) =>
                item.hasDropdown ? (
                  <li key={index} className="relative group inline-block">
                    <div className="flex items-center p-1 text-sm text-slate-600 hover:text-red-500 cursor-default">
                      {item.name}
                      {/* Down Arrow Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.85a.75.75 0 01-1.02 0l-4.25-3.85a.75.75 0 01.02-1.06z" />
                      </svg>
                    </div>
                    {/* Dropdown Menu on Hover */}
                    <div className="absolute left-0 top-full w-40 bg-white shadow-md rounded-lg text-sm text-slate-600 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-50">
                      <ul>
                        <li>
                          <Link
                            href="/booking/room"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Services Booking
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/booking/event"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Event Booking
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li
                    key={index}
                    className="flex items-center p-1 text-sm gap-x-2 text-slate-600 hover:text-red-500"
                  >
                    <Link href={item.href} className="flex items-center">
                      {item.name}
                    </Link>
                  </li>
                )
              )}
              <li>
                <button className="bg-[#27AE60] hover:bg-[#006B1A] text-white px-8 py-2 rounded-md">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
