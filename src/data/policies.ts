export interface Policy {
  id: string;
  packageId: string;
  type: 'cancellation' | 'payment' | 'booking' | 'insurance' | 'visa';
  title: string;
  description: string;
  details: string[];
  icon?: string;
}

export const policies: Policy[] = [
  // Bali Cultural Discovery (p1)
  {
    id: "pol1",
    packageId: "p1",
    type: "cancellation",
    title: "Cancellation Policy",
    description: "Flexible cancellation options available",
    details: [
      "Free cancellation up to 30 days before departure",
      "50% refund for cancellations 15-29 days before departure",
      "No refund for cancellations less than 15 days before departure"
    ]
  },
  {
    id: "pol2",
    packageId: "p1",
    type: "payment",
    title: "Payment Terms",
    description: "Secure and flexible payment options",
    details: [
      "25% deposit required to confirm booking",
      "Full payment required 30 days before departure",
      "Multiple payment methods accepted"
    ]
  },
  {
    id: "pol3",
    packageId: "p1",
    type: "booking",
    title: "Booking Conditions",
    description: "Simple and transparent booking process",
    details: [
      "Instant confirmation upon booking",
      "Minimum 2 participants required",
      "Maximum 12 participants per group"
    ]
  },
  {
    id: "pol4",
    packageId: "p1",
    type: "insurance",
    title: "Travel Insurance",
    description: "Recommended coverage for your trip",
    details: [
      "Travel insurance is recommended",
      "Must cover medical emergencies and evacuation",
      "Should include trip cancellation coverage"
    ]
  },
  {
    id: "pol5",
    packageId: "p1",
    type: "visa",
    title: "Visa Requirements",
    description: "Entry requirements for your destination",
    details: [
      "Visa on arrival available for most nationalities",
      "Passport must be valid for at least 6 months",
      "Return ticket required"
    ]
  },

  // Swiss Alpine Adventure (p2)
  {
    id: "pol6",
    packageId: "p2",
    type: "cancellation",
    title: "Cancellation Policy",
    description: "Winter season specific cancellation terms",
    details: [
      "Free cancellation up to 45 days before departure",
      "30% refund for cancellations 30-44 days before departure",
      "No refund for cancellations less than 30 days before departure"
    ]
  },
  {
    id: "pol7",
    packageId: "p2",
    type: "payment",
    title: "Payment Terms",
    description: "Secure payment schedule",
    details: [
      "30% deposit required to confirm booking",
      "Full payment required 45 days before departure",
      "Credit card and bank transfer accepted"
    ]
  }
];

export const getPackagePolicies = (packageId: string): Policy[] => {
  return policies.filter(policy => policy.packageId === packageId);
};

export const getPackagePolicyByType = (packageId: string, type: Policy['type']): Policy | undefined => {
  return policies.find(policy => policy.packageId === packageId && policy.type === type);
};