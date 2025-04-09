"use client";
import React from "react";
import { hallHire } from "@/data/data";
import OverviewCard from "@/components/OverviewCard";

const HallHireSection = () => {
  return (
    <section className="my-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Hall Hire</h2>
      <div className="flex justify-center">
        <OverviewCard title={hallHire.title} imageSrc={hallHire.imageUrl} />
      </div>
    </section>
  );
};

export default HallHireSection;
