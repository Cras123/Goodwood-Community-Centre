// src/types/membershipTypes.ts (or within MembershipPage.tsx)
export interface MembershipFormData {
    name: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    phone: string;
    address: string;
    postcode: string;
    photoConsent: boolean | null; // Use null for initial unselected state if using radios
    membershipType: 'Renewal' | 'New Member' | '';
    agreeToConduct: boolean;
  }