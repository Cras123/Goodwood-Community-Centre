// src/data/hallData.ts
import { Hall, HallRules } from "@/types/hallTypes";

// Extracted information, including from Hall Hire contract.pdf [cite: 1]
export const halls: Hall[] = [
  {
    id: "main-hall",
    name: "Main Community Hall",
    // Capacity limit mentioned in user text & agreed by Glenorchy City Council/Licensing Commission [cite: 1]
    capacity: "Maximum 80 persons at one time",
    facilities: [
      "Kitchenette (fridge, microwave, sink)",
      "Projector & Screen",
      "Sound System",
      "Restrooms",
      "Accessible entrance",
      "Tables & Chairs",
    ],
    pricing: {
      // Based on Community Rates Fee Schedule 2023 [cite: 1]
      upTo4Hours: "$80 (e.g., Children's Parties, Baby Showers)",
      dayRate: "$200",
      bond: "$150 (for up to 4 hours) / $500 (for day rate)", // Reflecting PDF structure [cite: 1]
      notes:
        "Commercial rates differ. Hire fees must be paid in cash only[cite: 1]. Bond refundable subject to conditions.",
    },
    bookedDates: ["2025-04-15", "2025-04-22", "2025-05-01"],
  },
  // Add other halls if needed
];

// Updated rules incorporating user text and PDF context [cite: 1]
export const hallRules: HallRules = {
  title: "Conditions of Hire & Closure Procedure",
  pdfLink: "/Hall Hire contract.pdf", // Assuming PDF is in public folder
  contact: {
    // From PDF header [cite: 1]
    name: "Hall Bookings Coordinator",
    email: "goodwood@bigpond.net.au",
    phone: "03 6272 2560",
  },
  conditions: [
    "Hire fee and agreed bond must be paid in cash at least 3 days prior to the hire date.",
    "Cancellation requires 8 hours’ notice, otherwise the full hire fee will be charged.",
    "Key Collection/Return: Arrangements must be made with the Manager prior to the hire date for key collection for out-of-hours usage. The key must be returned on the first working day after hire.",
    "Music Curfew: NO MUSIC is to be played after 11:00 PM.",
    "Vacating Time: All cleaning must be completed, and the hall vacated by 12:00 AM (midnight).",
    "Capacity: Maximum 80 persons are permitted in the hall at one time, as agreed with Glenorchy City Council and Licensing Commission.",
    "Alcohol: No alcohol is to be consumed on site.",
    "Animals: No animals are permitted on the premises.",
    "Child Supervision: All children MUST be properly supervised at all times.",
    "Smoking: The Centre is a smoke-free zone. Smoking indoors is prohibited.",
    "Decorations: Do not use tape, nails, or staples on walls. Use designated hooks or free-standing decorations only.",
    "Furniture: FURNITURE IS NOT TO BE DRAGGED ACROSS THE FLOOR. Stack chairs and tables where found.",
  ],
  closureProcedure: {
    title: "Hall Closure Procedure Checklist",
    introduction:
      "Failure to complete all or any of the following may result in an amount being deducted from the hirer's bond. Costs for breakages, damage, or extra cleaning exceeding the bond amount will be invoiced.",
    steps: [
      "Chairs and tables restacked neatly and stably where they were found.",
      "Hall vacuumed and mopped (use correct buckets for their indicated purpose).",
      "All benches wiped down.",
      "Kitchen and toilet areas left in a hygienic and tidy manner.",
      "All power points turned off (except for the fridge).",
      "All hirer's rubbish removed completely from the Centre premises (must be taken off-site).",
      "All windows shut securely.",
      "All doors locked securely.",
    ],
  },
};
