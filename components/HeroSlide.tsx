import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface SlideProps {
  slide: {
    id: number;
    bgImg?: string;
    videoUrl?: string;
    title: string;
    brief: string;
  };
  index: number;
}

const HeroSlide: React.FC<SlideProps> = ({ slide, index }) => {
  const isVideoSlide = index === 0 && slide.videoUrl;

  if (isVideoSlide) {
    return (
      <div className="relative w-full min-h-[450px] text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={slide.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 w-full bg-black/60 p-6 text-center z-20">
          <h2 className={`${poppins.className} text-3xl font-bold`}>
            {slide.title}
          </h2>
          <p className="text-base mt-2">{slide.brief}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[400px] overflow-hidden">
      <Image
        src={slide.bgImg!}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="absolute bottom-0 left-0 w-full p-6 text-white text-center z-20">
        <h2 className={`${poppins.className} text-3xl font-bold`}>
          {slide.title}
        </h2>
        <p className="text-base mt-2">{slide.brief}</p>
      </div>
    </div>
  );
};

export default HeroSlide;
