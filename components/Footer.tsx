"use client";

import Link from "next/link";
import Image from "next/image";
import ClientLinkWrapper from "./ClientLinkWrapper";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-30">
        {/* Logo and Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/goodwood_photos/logo.png"
              alt="Goodwood Community Centre Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="text-lg md:text-xl font leading-tight">
              Goodwood Community <br /> Centre
            </span>
          </div>
          <div className="text-sm leading-relaxed space-y-2 mt-4">
            {/* Address - clickable via Google Maps */}
            <ClientLinkWrapper
              href="https://www.google.com/maps/search/?api=1&query=20+Acton+Crescent,+Goodwood+TAS+7010"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaMapMarkerAlt size={16} />
              <span>20 Acton Crescent, Goodwood TAS 7010</span>
            </ClientLinkWrapper>

            {/* Email */}
            <ClientLinkWrapper
              href="mailto:manager@gwcc.org.au"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaEnvelope size={16} />
              <span>manager@gwcc.org.au</span>
            </ClientLinkWrapper>

            {/* Phone */}
            <ClientLinkWrapper
              href="tel:0362722560"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaPhone size={16} />
              <span>03 6272 2560</span>
            </ClientLinkWrapper>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/GoodwoodCommunityCentre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaFacebook size={16} />
              <span>Goodwood Community Centre, Tasmania</span>
            </a>

            {/* Opening Hours - optionally link to a Google Calendar or About page */}
            <a href="#" className="flex items-center gap-2 hover:text-blue-400">
              <FaClock size={16} />
              <span>Open: Monday - Friday, 9:00 AM – 4:00 PM</span>
            </a>
          </div>
        </div>
        {/* About Links */}
        {/* About Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/AboutUs">About Us</Link>
            </li>
            <li>
              <Link href="/hall-hire">Hall Hire</Link>
            </li>
            <li>
              <Link href="/membership">Membership</Link>
            </li>
            <li>
              <Link href="/Contactus">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">ACTIVITIES</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/hall-hire">hall Hire</Link>
            </li>
            <li>
              <Link href="/Donation">Community Support</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/Auth">Admin Portal</Link>
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
