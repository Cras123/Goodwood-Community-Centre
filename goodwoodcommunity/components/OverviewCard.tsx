import React from "react";

interface OverviewCardProps {
  title: string;
  imageSrc: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="w-60 h-[250px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center transition-transform hover:scale-105 hover:shadow-lg">
      <div className="w-full h-[170px] overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-base font-medium text-gray-800 text-center mt-4">
        {title}
      </h3>
    </div>
  );
};

export default OverviewCard;
