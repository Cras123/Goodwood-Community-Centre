export const scis = [
  {
    id: 1,
    icon: "bi-facebook",
    link: "",
  },
  {
    id: 2,
    icon: "bi-twitter-x",
    link: "",
  },
  {
    id: 3,
    icon: "bi-instagram",
    link: "",
  },
];

export const heroSlides = [
  {
    id: 1,
    bgImg: "/goodwood_photos/hero1.png",
    title: "Welcome to Goodwood Community Centre of Tasmania",
    brief: ``,
  },
  {
    id: 2,
    bgImg: "/goodwood_photos/hero2.png",
    title: `OPEN
     MON – FRI
  9AM – 4PM
  Available for hire
  SAT & SUN`,
    brief: "",
  },
  {
    id: 3,
    bgImg: "/goodwood_photos/hero3.png",
    title: "",
    brief: ``,
  },
  {
    id: 4,
    bgImg: "/goodwood_photos/hero4.png",
    title: "Thanks to all the members and staff ",
    brief: ``,
  },
];

export const contact = [
  {
    id: 1,
    details: {
      name: "Example Name",
      email: "info@example.com",
      subject: "Message",
      message: `Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur`,
    },
  },
];
export const Overviewcard = [
  {
    title: "Events",
    imageSrc: "/img/events.jpg",
    link: "/events", // 👈 Add link
  },
  {
    title: "Hall Hire",
    imageSrc: "/img/hallhire.jpg",
    link: "/hall-hire", // 👈 Add link
  },
  {
    title: "Services",
    imageSrc: "/img/services.jpg",
    link: "/services", // 👈 Add link
  },
];

export const upcomingEvents = [
  {
    id: 1,
    title: "Event 1",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 2,
    title: "Event 2",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 3,
    title: "Event 3",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 4,
    title: "Event 4",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 5,
    title: "Event 5",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 6,
    title: "Event 6",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 7,
    title: "Event 7",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 8,
    title: "Event 8",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 9,
    title: "Event 9",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
  {
    id: 10,
    title: "Event 10",
    imageUrl: "/images/post-landscape-1.jpg", // Path to your image
  },
];
export const services = [
  {
    title: "Community Support",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Educational Programs",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Cultural Events",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Health & Wellness",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Legal Assistance",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Youth Development",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Senior Citizen Programs",
    imageUrl: "/img/post-potrait-1.jpg",
  },
  {
    title: "Sports & Recreation",
    imageUrl: "/img/post-potrait-1.jpg",
  },
];

export const hallHire = {
  title: "Hall Hire",
  imageUrl: "/img/hallhire.jpg",
};

// src/data/goodwoodQA.ts

export interface QnaItem {
  question: string;
  keywords: string[]; // Keywords to help match user input
  answer: string;
}

export const qnaData: QnaItem[] = [
  {
    question: "What is the Goodwood Community Centre?",
    keywords: ["what is", "about", "community centre", "purpose", "mission"],
    answer:
      "The Goodwood Community Centre is a place for the local community to connect, learn, and participate in activities. It aims to be a welcoming, progressive, safe, and sharing environment.",
  },
  {
    question: "What activities does the centre offer?",
    keywords: ["activities", "services", "offer", "programs", "do", "provide"],
    answer:
      'The centre offers a Community Garden, Playgroup, Low Impact Exercise, Walking Groups, a Learn to Drive Program, NILS Appointments, Volunteer Opportunities, and an "Eating With Friends" program.',
  },
  {
    question: "What is the Community Garden?",
    keywords: ["community garden", "garden", "gardening"],
    answer:
      "It's a space where community members can garden together, connect with nature, share tips, and enjoy the outdoors.",
  },
  {
    question: "What is the Playgroup?",
    keywords: ["playgroup", "children", "kids", "toddlers"],
    answer:
      "The Playgroup provides a space for young children to socialize and learn through play, and for parents/caregivers to connect.",
  },
  {
    question: "What is Low Impact Exercise?",
    keywords: ["low impact exercise", "exercise", "fitness", "gentle"],
    answer:
      "It's a gentle physical activity program suitable for various fitness levels, helping people stay active.",
  },
  {
    question: "What are the Walking Groups?",
    keywords: ["walking groups", "walk", "walking"],
    answer:
      "These are groups for people to explore the local area together while getting exercise and socializing.",
  },
  {
    question: "What is the Learn to Drive Program?",
    keywords: ["learn to drive", "driving lessons", "driver license"],
    answer:
      "It's a program designed to help individuals get their driver's license.",
  },
  {
    question: "What are NILS Appointments?",
    keywords: ["nils appointments", "nils", "no interest loan"],
    answer:
      "These provide access to the No Interest Loans Scheme, helping people on low incomes purchase essential items without interest charges.",
  },
  {
    question: 'What is the "Eating With Friends" program?',
    keywords: [
      "eating with friends",
      "meals",
      "social eating",
      "companionship",
    ],
    answer:
      "It's a social program focused on shared meals and companionship to foster connections.",
  },
  {
    question: "Where is the Goodwood Community Centre located?",
    keywords: ["where", "location", "address", "find you"],
    answer: "It is located at 20 Acton Crescent, Goodwood TAS 7010, Australia.",
  },
  {
    question: "How can I contact the Goodwood Community Centre?",
    keywords: ["contact", "phone", "email", "get in touch", "call"],
    answer:
      "You can call them at [03 6272 2560], email manager@goodwoodcommunitycentre.org.au, or visit in person at 20 Acton Crescent, Goodwood TAS 7010.",
  },
  {
    question: "What are the centre's opening hours?",
    keywords: ["opening hours", "open", "hours", "when open"],
    answer:
      "The centre is open for inquiries Monday to Friday, from 9 am to 4 pm.",
  },
  {
    question: "Can I hire a meeting room?",
    keywords: [
      "hire room",
      "meeting room",
      "training room",
      "book space",
      "rent space",
    ],
    answer:
      "The centre has a Meeting/Training Room mentioned, but the detailed booking information (capacity, cost) on the linked page refers to the NHT Hub in Derwent Park, not the Goodwood location itself. You should contact the Goodwood Community Centre directly at 03 6272 2560 or manager@goodwoodcommunitycentre.org.au for clarification and booking inquiries.",
  },
  {
    question: "Can I volunteer at the centre?",
    keywords: ["volunteer", "volunteering", "help out"],
    answer:
      "Yes, volunteer opportunities are available. You should contact the centre directly by phone (03 6272 2560) or email (manager@goodwoodcommunitycentre.org.au) to express your interest and find out about specific roles.",
  },
  {
    question: "Does the centre have a Facebook page?",
    keywords: ["facebook", "social media", "updates"],
    answer:
      "Yes, you can find them on Facebook at https://www.facebook.com/GoodwoodCommunityCentreTas/ to stay updated.",
  },
  {
    question: "Is there parking?",
    keywords: ["parking", "park car"],
    answer:
      "The provided information does not mention if parking is available. Please contact the centre directly at 03 6272 2560 to inquire about parking.",
  },
  {
    question: "Are there fees for programs?",
    keywords: ["fees", "cost", "charge", "price", "pay"],
    answer:
      "The provided information doesn't state whether there are fees for general programs. Please contact the centre directly at 03 6272 2560 for information on specific program costs.",
  },
  // Add more Q&A pairs based on the initial text if needed
];

export const defaultAnswer: string =
  "Sorry, I couldn't find specific information on that. You can ask about our services, location, contact details, hours, volunteering, or specific programs like the Community Garden. For other questions, please use the main contact form or call 03 6272 2560.";
