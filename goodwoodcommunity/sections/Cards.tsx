// src/sections/Cards.tsx
import React from "react";
import { OverviewCard as OverviewCardData } from "@/data/data"; // Adjust path as needed
import OverviewCard from "@/components/OverviewCard"; // Import the card component

const Cards: React.FC = () => {
  return (
    <section className="flex justify-around  p-6 mt-12 ">
      {OverviewCardData.map((card, index) => (
        <OverviewCard key={index} title={card.title} imageSrc={card.imageSrc} />
      ))}
    </section>
  );
};

export default Cards;
