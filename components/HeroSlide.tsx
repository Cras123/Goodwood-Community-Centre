import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // you can pick which weights you want
});

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
  const isSplitLayout = index === 0 || index === 3;

  if (isSplitLayout) {
    return (
      <div className="relative w-full min-h-[450px] text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={slide.bgImg}
          alt={slide.title}
          fill
          className="object-cover"
          priority
        />

        {/* Bottom Text Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/60 p-6 text-center z-20">
          <h2
            className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold`}
          >
            {slide.title}
          </h2>
          <p className="text-sm md:text-base mt-2">{slide.brief}</p>
        </div>
      </div>
    );
  }

  // ✅ Full background layout with ONLY IMAGE (no text)
  return (
    <div className="relative w-full min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={slide.bgImg}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />

      {/* Optional soft dark overlay (if you want slight dark effect, can remove if you don't want) */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
    </div>
  );
};

export default HeroSlide;
