// src/components/HireHall/HallInfo.tsx
import React from 'react';
import { Hall } from '../../app/types/hallTypes';// Import the Hall type

interface HallInfoProps {
  hall: Hall | null; // Prop takes a Hall object or null
}

const HallInfo: React.FC<HallInfoProps> = ({ hall }) => {
  if (!hall) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{hall.name}</h3>
      <div className="space-y-3 text-gray-700"> {/* Increased spacing */}
        <p><strong className="font-medium text-gray-800">Capacity:</strong> {hall.capacity}</p>
        <div>
          <strong className="font-medium text-gray-800">Facilities:</strong>
          <ul className="list-disc list-inside ml-4 mt-1">
            {hall.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
        <div>
          {/* Updated Pricing Display */}
          <strong className="font-medium text-gray-800">Pricing (Community Rates - 2023):</strong>
           <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
             {hall.pricing.upTo4Hours && <li>Up to 4 Hours: {hall.pricing.upTo4Hours}</li>}
             {hall.pricing.dayRate && <li>Day Rate: {hall.pricing.dayRate}</li>}
             {hall.pricing.bond && <li>Bond: {hall.pricing.bond}</li>}
           </ul>
           {hall.pricing.notes && <p className="text-sm text-gray-600 mt-2 italic">{hall.pricing.notes}</p>}
        </div>
      </div>
    </div>
  );
}

export default HallInfo;