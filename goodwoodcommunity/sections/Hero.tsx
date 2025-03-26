"use client";
import React, { useEffect } from "react";
import { heroSlides } from "@/data/data";

import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <section id="hero-slider" className="bg-gray-100 relative">
      <div className="container mx-auto px-4 h-screen">
        {" "}
        {/* Full height */}
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
          className="sliderFeaturedPosts h-full" // Ensures full height
        >
          {heroSlides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="h-full flex items-center justify-center"
            >
              <HeroSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination Bullets */}
        <div className="swiper-pagination mt-4"></div>
        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
          <button className="custom-swiper-button-prev bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
          <button className="custom-swiper-button-next bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700">
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
