"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/img/goodwood-logo.png"
              alt="Goodwood Community Centre Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-lg md:text-xl font-semibold leading-tight">
              Goodwood Community <br /> Centre
            </span>
          </div>

          <div className="text-sm leading-relaxed space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt size={16} />
              <span>20 Acton Crescent, Goodwood TAS 7010</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope size={16} />
              <span>manager@gwcc.org.au</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone size={16} />
              <span>03 6272 2560</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFacebook size={16} />
              <Link href="#" className="underline hover:text-blue-400">
                Goodwood Community Centre, Tasmania
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FaClock size={16} />
              <span>Open: Monday - Friday, 9:00 AM – 4:00 PM</span>
            </div>
          </div>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Hall Hire</Link>
            </li>
            <li>
              <Link href="#">Membership</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">SERVICES</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Events</Link>
            </li>
            <li>
              <Link href="#">Programs</Link>
            </li>
            <li>
              <Link href="#">Venue Hire</Link>
            </li>
            <li>
              <Link href="#">Community Support</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/events/create">Create Event</Link>
            </li>
            <li>
              <Link href="/services/add">Add Service</Link>
            </li>
            <li>
              <Link href="#">Donate</Link>
            </li>
            <li>
              <Link href="#">Volunteer</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Goodwood Community Centre. All rights
        reserved.
      </div>
    </footer>
  );
}
