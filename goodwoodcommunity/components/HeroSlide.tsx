import React from "react";

interface SlideProps {
  slide: {
    bgImg: string;
    title: string;
    brief: string;
  };
}

const HeroSlide: React.FC<SlideProps> = ({ slide }) => {
  return (
    <a
      href="#"
      className="relative flex items-end bg-cover bg-center h-64 md:h-80 lg:h-96 p-6 text-white"
      style={{ backgroundImage: `url(${slide.bgImg || "fallback-image.jpg"})` }} // Add a fallback image here
      aria-label={`View details of ${slide.title}`} // Accessible label
    >
      <div className="bg-opacity-50 p-4 rounded-md">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
          {slide.title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          {slide.brief}
        </p>
      </div>
    </a>
  );
};

export default HeroSlide;
