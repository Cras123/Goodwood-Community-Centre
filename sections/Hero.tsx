"use client";
import React, { useEffect } from "react";
import { heroSlides } from "@/data/data";
import { motion } from "framer-motion"; // Import Framer Motion
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeroSlide from "@/components/HeroSlide";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  return (
    // Use motion.section for dynamic animation
    <motion.section
      id="hero-slider"
      className="bg-gray-100 relative pt-10"
      initial={{ opacity: 0, y: 50 }} // start slightly down and transparent
      animate={{ opacity: 1, y: 0 }} // animate to full opacity and original position
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          speed={500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          className="sliderFeaturedPosts"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="h-full">
              <HeroSlide slide={slide} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/4 left-4 -translate-y-1/2 z-10">
          <button className="custom-swiper-button-prev bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        </div>
        <div className="absolute top-1/4 right-4 -translate-y-1/2 z-10">
          <button className="custom-swiper-button-next bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            ❯
          </button>
        </div>
        {/* Pagination Bullets */}
        <div className="swiper-pagination !bottom-8"></div>
      </div>
    </motion.section>
  );
};

export default Hero;
