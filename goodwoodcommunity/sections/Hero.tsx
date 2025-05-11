"use client";

import React, { useEffect } from "react";
import { heroSlides } from "@/data/data";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeroSlide from "@/components/HeroSlide";

const Hero = () => {
  return (
    <motion.section
      id="hero-slider"
      className="bg-gray-100 relative pt-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            speed={600}
            autoplay={{
              delay: 3500,
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
            className="sliderFeaturedPosts rounded-lg shadow-lg overflow-hidden"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={slide.id} className="h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full"
                >
                  <HeroSlide slide={slide} index={index} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 z-20">
            <motion.button
              className="custom-swiper-button-prev bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
              whileHover={{ scale: 1.2, rotate: -10 }}
            >
              ❮
            </motion.button>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20">
            <motion.button
              className="custom-swiper-button-next bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              ❯
            </motion.button>
          </div>

          {/* Pagination Bullets */}
          <div className="swiper-pagination !bottom-4"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
