// src/types/hallTypes.ts

export interface Pricing {
    upTo4Hours?: string;
    dayRate?: string;
    bond?: string;
    notes?: string;
    // Add other potential pricing fields if needed
    hourly?: string; // From older example potentially
    weekday?: string;
    weekend?: string;
    fullDay?: string;
  }
  
  export interface Hall {
    id: string;
    name: string;
    capacity: string;
    facilities: string[];
    pricing: Pricing;
    bookedDates?: string[]; // Simple placeholder for availability
  }
  
  export interface ContactInfo {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface ClosureProcedure {
    title: string;
    introduction: string;
    steps: string[];
  }
  
  export interface HallRules {
    title: string;
    pdfLink: string;
    contact: ContactInfo;
    conditions: string[];
    closureProcedure?: ClosureProcedure; // Make optional if it might not exist
  }
  
  // Type for the Booking Form data
  export interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    hallId: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    eventType: string;
    message: string;
  }