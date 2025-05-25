// src/sections/Cards.tsx
import React from "react";
import { Overviewcard } from "@/data/data";
import OverviewCard from "@/components/OverviewCard";
import Link from "next/link";

const Cards: React.FC = () => {
  return (
    <section className="py-15 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Overviewcard.map((card, index) => (
            <Link href={card.link} key={index} className="block">
              <OverviewCard title={card.title} imageSrc={card.imageSrc} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
