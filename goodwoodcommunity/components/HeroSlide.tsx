import React from "react";
import Image from "next/image";

interface SlideProps {
  slide: {
    id: number;
    bgImg: string;
    title: string;
    brief: string;
  };
  index: number;
}

const HeroSlide: React.FC<SlideProps> = ({ slide, index }) => {
  const isSplitLayout = index === 5 || index === 6;

  if (isSplitLayout) {
    return (
      <div className="relative flex flex-col-reverse lg:flex-row min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full text-white overflow-hidden">
        {/* Left: Text (1/4 width) */}
        <div className="relative z-20 w-full lg:w-1/4 flex flex-col justify-center px-6 py-8 bg-gradient-to-r from-black via-black/60 to-transparent">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {slide.title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg">{slide.brief}</p>
        </div>

        {/* Right: Image (3/4 width) */}
        <div className="relative w-full lg:w-3/4 h-full">
          <Image
            src={slide.bgImg}
            alt={slide.title}
            fill
            className="object-contain "
            priority
          />
        </div>
      </div>
    );
  }

  // All other slides: full bg with overlay
  return (
    <a
      href="#"
      className="relative flex items-center h-96 w-full text-white overflow-hidden"
      style={{
        backgroundImage: `url(${slide.bgImg || "fallback-image.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label={`View details of ${slide.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r  z-10"></div>
      <div className="relative z-20 px-6 py-8 lg:w-1/2"></div>
    </a>
  );
};

export default HeroSlide;
