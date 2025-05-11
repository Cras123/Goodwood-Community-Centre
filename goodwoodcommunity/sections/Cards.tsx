// src/sections/Cards.tsx
import React from "react";
import { Overviewcard } from "@/data/data"; // Correct import (small 'c')
import OverviewCard from "@/components/OverviewCard"; // Import the Card component
import Link from "next/link";

const Cards: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-around gap-4 p-6 mt-12">
      {Overviewcard.map((card, index) => (
        <Link href={card.link} key={index} className="w-full md:w-1/3">
          <OverviewCard title={card.title} imageSrc={card.imageSrc} />
        </Link>
      ))}
    </section>
  );
};

export default Cards;
