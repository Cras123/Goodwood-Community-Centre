// AboutUs.tsx
"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs: React.FC = () => {
  // Animation variants
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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  // Animation for scroll-triggered animations
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return { ref, controls };
  };

  // Create animation hooks for different sections
  const heroAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const joinAnimation = useScrollAnimation();
  const partnersAnimation = useScrollAnimation();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative h-64 md:h-96 bg-cover bg-center overflow-hidden rounded-lg shadow-lg"
          style={{ backgroundImage: "url('/goodwood_photos/hero3.png')" }}
          ref={heroAnimation.ref}
          initial="hidden"
          animate={heroAnimation.controls}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl text-white font-cursive font-bold text-center px-4">
              Welcome to Goodwood Community Centre
            </h1>
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.a
              href="#join"
              className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-2 px-6 rounded-md transition duration-300"
              whileHover={{ scale: 1.1, backgroundColor: "#fb923c" }}
            >
              Join Now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* About Us Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-orange-200 p-6 rounded-lg mb-8"
            ref={aboutAnimation.ref}
            initial="hidden"
            animate={aboutAnimation.controls}
            variants={slideUp}
          >
            <h2 className="text-3xl text-center font-semibold mb-4">
              About us
            </h2>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={slideInLeft}
            initial="hidden"
            animate={aboutAnimation.controls}
          >
            Welcome to Goodwood Community Centre
          </motion.h2>

          <div className="space-y-6 max-w-4xl">
            <motion.p
              className="text-lg"
              variants={slideInRight}
              initial="hidden"
              animate={aboutAnimation.controls}
            >
              At the heart of every thriving community is a place where people
              come together to share, support, and grow. Goodwood Community
              Services is that place—a haven where neighbors become friends,
              challenges find solutions, and everyone is welcome.
            </motion.p>

            <motion.p
              className="text-lg"
              variants={slideInRight}
              initial="hidden"
              animate={aboutAnimation.controls}
              transition={{ delay: 0.2 }}
            >
              From offering a helping hand in times of need to celebrating
              life's joyful moments, we are here to make a difference. Whether
              you're seeking support, looking to learn, or just hoping to
              connect with others, Goodwood Community Services is your partner
              in building a stronger, more compassionate community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6"
            ref={servicesAnimation.ref}
            initial="hidden"
            animate={servicesAnimation.controls}
            variants={slideUp}
          >
            What we offer
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerChildren}
            initial="hidden"
            animate={servicesAnimation.controls}
          >
            {[
              {
                title: "Counseling Services",
                content:
                  "We provide professional, compassionate counseling to support mental health and emotional well-being. Whether you're navigating personal challenges, seeking guidance, or simply need someone to talk to, our counselors are here to help.",
              },
              {
                title: "Food Relief Programs",
                content:
                  "To ensure no family goes hungry, we offer food relief initiatives that provide nutritious meals and essential groceries to those in need.",
              },
              {
                title: "Playgroup Activities",
                content:
                  "Our playgroups create safe, engaging spaces for children to learn, play, and socialize while fostering meaningful connections among parents and caregivers.",
              },
              {
                title: "Digital Literacy Programs",
                content:
                  "In an increasingly digital world, we help bridge the digital divide by offering workshops and resources to enhance computer skills, internet safety, and online communication.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={cardVariant}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us Section with Animations */}
      <section id="join" className="py-8">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-red-600 mb-4"
            ref={joinAnimation.ref}
            initial="hidden"
            animate={joinAnimation.controls}
            variants={slideInLeft}
          >
            Join Us
          </motion.h2>

          <div className="max-w-4xl mb-6">
            <motion.p
              className="text-lg mb-4"
              variants={slideUp}
              initial="hidden"
              animate={joinAnimation.controls}
            >
              Goodwood Community Services is more than just a place – it's a
              community. Whether you're here to access services, attend a
              program, or simply connect with others, you'll find a welcoming
              environment where everyone belongs.
            </motion.p>

            <motion.p
              className="text-lg mb-6"
              variants={slideUp}
              initial="hidden"
              animate={joinAnimation.controls}
              transition={{ delay: 0.2 }}
            >
              We look forward to seeing you soon!
            </motion.p>

            <motion.a
              href="#"
              className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-3 px-8 rounded-md inline-block transition duration-300"
              variants={slideUp}
              initial="hidden"
              animate={joinAnimation.controls}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fb923c",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              JOIN COMMUNITY
            </motion.a>
          </div>
        </div>
      </section>

      {/* Partners Section with Animation */}
      <section className="py-8 bg-green-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6"
            ref={partnersAnimation.ref}
            initial="hidden"
            animate={partnersAnimation.controls}
            variants={slideUp}
          >
            Partners
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="md:w-1/2"
              variants={slideInLeft}
              initial="hidden"
              animate={partnersAnimation.controls}
            >
              <motion.ul
                className="space-y-6"
                variants={staggerChildren}
                initial="hidden"
                animate={partnersAnimation.controls}
              >
                {[
                  {
                    name: "ICRC",
                    desc: "Provides humanitarian aid during conflicts worldwide.",
                  },
                  {
                    name: "Beyond Blue",
                    desc: "Supports mental health and suicide prevention in Australia.",
                  },
                  {
                    name: "Mission Australia",
                    desc: "Works to end homelessness and support vulnerable Australians.",
                  },
                  {
                    name: "Relationships Australia",
                    desc: "Promotes positive and respectful relationships.",
                  },
                  {
                    name: "CMRC",
                    desc: "Assists migrants and refugees with settlement and integration.",
                  },
                  {
                    name: "Variety",
                    desc: "Helps children with disabilities or disadvantages thrive.",
                  },
                  {
                    name: "Housing Connect",
                    desc: "Offers support for secure and affordable housing.",
                  },
                ].map((partner, index) => (
                  <motion.li key={index} variants={cardVariant}>
                    <h3 className="font-semibold">{partner.name}:</h3>
                    <p>{partner.desc}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="md:w-1/2 grid grid-cols-2 gap-4"
              variants={slideInRight}
              initial="hidden"
              animate={partnersAnimation.controls}
            >
              {[
                "icrc-logo.png",
                "beyond-blue-logo.png",
                "mission-australia-logo.png",
                "relationships-australia-logo.png",
                "variety-logo.png",
                "cmrc-logo.png",
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg flex items-center justify-center"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={`/partners/${logo}`}
                    alt={`Partner Logo ${index}`}
                    className="max-h-16"
                  />
                </motion.div>
              ))}
              <motion.div
                className="col-span-2 bg-white p-4 rounded-lg flex items-center justify-center"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/partners/housing-connect-logo.png"
                  alt="Housing Connect Logo"
                  className="max-h-16"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-yellow-200 p-4 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={partnersAnimation.controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.6,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                },
              },
            }}
          >
            <h3 className="text-xl font-semibold italic">
              "Working Together to Build a Better Future."
            </h3>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
