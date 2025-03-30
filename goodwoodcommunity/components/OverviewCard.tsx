// src/components/OverviewCard.tsx
import React from "react";

interface OverviewCardProps {
  title: string;
  imageSrc: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="w-60 bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-auto rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  );
};

export default OverviewCard;
