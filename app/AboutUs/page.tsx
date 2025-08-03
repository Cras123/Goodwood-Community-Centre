"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Offerings from "@/components/Offering";
interface Staff {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
}

const AboutUs: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setStaffList(data);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    fetchStaff();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7 } },
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7 } },
  };

  const cardVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    useEffect(() => {
      if (inView) controls.start("visible");
    }, [controls, inView]);
    return { ref, controls };
  };

  const heroAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();

  const joinAnimation = useScrollAnimation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <motion.div
          className="relative h-64 md:h-96 bg-cover bg-center overflow-hidden rounded-lg shadow-lg"
          style={{ backgroundImage: "url('/goodwood_photos/hero3.png')" }}
          ref={heroAnimation.ref}
          initial="hidden"
          animate={heroAnimation.controls}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
          <motion.div
            className="absolute top-6 left-6 bg-black/50 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
              Building Community, Connecting People
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* About Us Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            ref={aboutAnimation.ref}
            initial="hidden"
            animate={aboutAnimation.controls}
            variants={slideUp}
          >
            About Goodwood Community Centre
          </motion.h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              variants={slideInRight}
              initial="hidden"
              animate={aboutAnimation.controls}
            >
              At the heart of every thriving community is a place where people
              come together to share, support, and grow. Goodwood Community
              Centre is that place — a hub where neighbors become friends,
              challenges find solutions, and everyone is welcome.
            </motion.p>

            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              variants={slideInLeft}
              initial="hidden"
              animate={aboutAnimation.controls}
              transition={{ delay: 0.2 }}
            >
              Whether you're seeking support, looking to learn something new, or
              simply hoping to connect with others, Goodwood Community Centre is
              your partner in building a stronger, more compassionate community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Offerings />
      </section>

      {/* Join Us Section */}
      <section
        id="join"
        className="py-20 bg-gradient-to-r from-green-50 to-blue-50"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            ref={joinAnimation.ref}
            initial="hidden"
            animate={joinAnimation.controls}
            variants={slideInLeft}
          >
            Join Our Community
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 mb-8"
            variants={slideUp}
            initial="hidden"
            animate={joinAnimation.controls}
          >
            Be part of something bigger. Join Goodwood Community Centre and make
            a difference in your life and the lives of others.
          </motion.p>

          <motion.a
            href="/membership"
            className="inline-block bg-[#00aba9] hover:bg-[#23677c] text-white font-semibold py-3 px-8 rounded-md transition duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Member
          </motion.a>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Valued Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side: Partner descriptions */}
            <div className="space-y-6 ">
              {[
                {
                  name: "ICRC",
                  desc: "Provides humanitarian aid during conflicts worldwide.",
                  link: "https://www.icrc.org/",
                },
                {
                  name: "Beyond Blue",
                  desc: "Supports mental health and suicide prevention in Australia.",
                  link: "https://www.beyondblue.org.au/",
                },
                {
                  name: "Mission Australia",
                  desc: "Works to end homelessness and support vulnerable Australians.",
                  link: "https://www.missionaustralia.com.au/",
                },
                {
                  name: "Relationships Australia",
                  desc: "Promotes positive and respectful relationships.",
                  link: "https://relationships.org.au/",
                },
                {
                  name: "CMRC",
                  desc: "Assists migrants and refugees with settlement and integration.",
                  link: "https://www.cmrc.com.au/",
                },
                {
                  name: "Variety",
                  desc: "Helps children with disabilities or disadvantages thrive.",
                  link: "https://www.variety.org.au/",
                },
                {
                  name: "Housing Connect",
                  desc: "Offers support for secure and affordable housing.",
                  link: "https://www.homestasmania.com.au",
                },
              ].map((partner, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-[#00aba9] mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-gray-700">{partner.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Side: Partner logos */}
            <div className="bg-white rounded-lg p-6 grid grid-cols-2 gap-4 shadow-lg ">
              {[
                {
                  logo: "icrc-logo.png",
                  link: "https://www.icrc.org/",
                },
                {
                  logo: "beyond-blue-logo.png",
                  link: "https://www.beyondblue.org.au/",
                },
                {
                  logo: "mission-australia-logo.png",
                  link: "https://www.missionaustralia.com.au/",
                },
                {
                  logo: "relationships-australia-logo.png",
                  link: "https://relationships.org.au/",
                },
                {
                  logo: "variety-logo.png",
                  link: "https://www.variety.org.au/",
                },
                {
                  logo: "cmrc-logo.png",
                  link: "https://www.cmrc.com.au/",
                },
                {
                  logo: "housing-connect-logo.png",
                  link: "https://www.homestasmania.com.au",
                },
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-green-50 rounded-md hover:shadow-md transition hover:scale-105 transition-transform
"
                >
                  <img
                    src={`/partners/${partner.logo}`}
                    alt={`Partner Logo ${index}`}
                    className="max-h-16 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Child Safety Statement Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Child Safety Statement of Commitment
          </h2>
          <ul className="list-disc space-y-4 text-gray-700 pl-6">
            <li>GWCC is committed to child safety.</li>
            <li>
              We want children to be safe, happy and empowered. We support and
              respect all children, as well as our staff and volunteers.
            </li>
            <li>
              We are committed to the safety, participation and empowerment of
              all children.
            </li>
            <li>
              We have zero tolerance of child abuse, and all allegations and
              safety concerns will be treated very seriously and consistently
              with our robust policies and procedures. We have legal and moral
              obligations to contact authorities when we are worried about a
              child’s safety, which we follow rigorously.
            </li>
            <li>
              We believe children when they raise a concern or make an
              allegation.
            </li>
            <li>
              GWCC is committed to preventing child abuse and identifying risks
              early, and removing and reducing these risks. We have robust human
              resources and recruitment practices for all staff and volunteers,
              and are committed to regularly training and educating our staff
              and volunteers on child abuse risks.
            </li>
            <li>
              We support and respect all children, as well as our staff and
              volunteers. We are committed to the cultural safety of Aboriginal
              children, the cultural safety of children from culturally and/or
              linguistically diverse backgrounds, and to providing a safe
              environment for children with a disability.
            </li>
            <li>
              We have specific policies, procedures and training in place that
              support our leadership team, staff and volunteers to achieve these
              commitments.
            </li>
            <li className="font-semibold text-red-600">
              If you believe a child is at immediate risk, phone 000.
            </li>
          </ul>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Meet Our Staff
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staffList.map((staff) => (
              <Link href={`/Admin/staff/${staff._id}`} key={staff._id}>
                <motion.div
                  key={staff._id}
                  className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={staff.imageUrl}
                    alt={staff.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#00aba9]">
                    {staff.name}
                  </h3>
                  <p className="text-gray-600">{staff.role}</p>
                  <blockquote className="italic text-gray-500 mt-2">
                    "{staff.quote}"
                  </blockquote>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
