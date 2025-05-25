"use client";

import React from "react";
import { hallHire } from "@/data/data";
import OverviewCard from "@/components/OverviewCard";
import Link from "next/link";

const HallHireSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Hall Hire</h2>
      <div className="flex flex-col items-center gap-6">
        <Link href="/hall-hire" className="w-full md:w-1/3">
          <OverviewCard title={hallHire.title} imageSrc={hallHire.imageUrl} />
        </Link>
      </div>
    </section>
  );
};

export default HallHireSection;
