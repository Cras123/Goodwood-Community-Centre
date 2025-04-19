// src/components/HireHall/RulesSection.tsx
import React from 'react';
import { HallRules } from '@/app/types/hallTypes'; // Import the type

interface RulesSectionProps {
  rules: HallRules | null; // Prop takes HallRules object or null
}

const RulesSection: React.FC<RulesSectionProps> = ({ rules }) => {
  if (!rules) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-6 mb-6">
       <h3 className="text-2xl font-semibold text-gray-800 mb-4">{rules.title}</h3>

       {/* Conditions of Hire Section */}
       <div className="mb-6">
         <h4 className="text-xl font-semibold text-gray-700 mb-3">Conditions of Hire</h4>
         <ul className="space-y-2 text-Sray-700 list-disc list-outside ml-5 mb-4">
           {rules.conditions.map((rule, index) => (
             <li key={index} dangerouslySetInnerHTML={{ __html: rule }}></li>
           ))}
         </ul>
       </div>

       {/* Closure Procedure Section */}
       {rules.closureProcedure && (
         <div className="mb-6 border-t pt-6">
           <h4 className="text-xl font-semibold text-gray-700 mb-2">{rules.closureProcedure.title}</h4>
           <p className="text-sm text-gray-600 italic mb-3">{rules.closureProcedure.introduction}</p>
           <ul className="space-y-2 text-gray-700 list-decimal list-outside ml-5">
             {rules.closureProcedure.steps.map((step, index) => (
               <li key={index}>{step}</li>
             ))}
           </ul>
         </div>
       )}

       {/* PDF Download Link */}
       <div className="mb-6 border-t pt-6">
         <p className="text-gray-700">
           For complete details and the official contract format, please refer to the full document:
         </p>
         <a
           href="/Hall Hire contract.pdf"
           target="_blank"
           rel="noopener noreferrer"
           download
           className="mt-2 inline-block bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 transition duration-150 ease-in-out"
         >
           Download Full Hire Contract (PDF)
         </a>
       </div>

        {/* Contact Info */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Contact for Hire Inquiries</h4>
          <p className="text-gray-700">For questions or clarification, please contact:</p>
          <p className="text-gray-700 mt-1">Email: <a href={`mailto:${rules.contact.email}`} className="text-indigo-600 hover:underline">{rules.contact.email}</a></p>
          <p className="text-gray-700">Phone: <a href={`tel:${rules.contact.phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:underline">{rules.contact.phone}</a></p>
        </div>
    </div>
  );
}

export default RulesSection;