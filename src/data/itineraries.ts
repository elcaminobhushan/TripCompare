export interface ItineraryDay {
  id: string;
  packageId: string;
  day: number;
  title: string;
  description: string;
  activities: string[]; // Activity IDs
  meals: string[]; // Meal IDs
  accommodation: string; // Accommodation ID
  transport?: string[]; // Transport IDs
  notes?: string;
}

export const itineraries: ItineraryDay[] = [
  // Bali Beach Package (p1)
  {
    id: "itin1_d1",
    packageId: "p1",
    day: 1,
    title: "Arrival in Paradise",
    description: "Begin your tropical getaway with a warm welcome and beachfront relaxation.",
    activities: ["act1"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans1", "trans3"],
    notes: "Airport meet & greet service included"
  },
    {
    id: "itin1_d1",
    packageId: "p1",
    day: 4,
    title: "Arrival in Paradise",
    description: "Begin your tropical getaway with a warm welcome and beachfront relaxation.",
    activities: ["act1"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans1", "trans3"],
    notes: "Airport meet & greet service included"
  },
    {
    id: "itin1_d1",
    packageId: "p1",
    day: 5,
    title: "Arrival in Paradise",
    description: "Begin your tropical getaway with a warm welcome and beachfront relaxation.",
    activities: ["act1"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans1", "trans3"],
    notes: "Airport meet & greet service included"
  },
    {
    id: "itin1_d1",
    packageId: "p1",
    day: 6,
    title: "Arrival in Paradise",
    description: "Begin your tropical getaway with a warm welcome and beachfront relaxation.",
    activities: ["act1"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans1", "trans3"],
    notes: "Airport meet & greet service included"
  },
  {
    id: "itin1_d2",
    packageId: "p1",
    day: 2,
    title: "Beach and Spa Day",
    description: "Enjoy a day of relaxation with beach activities and spa treatments.",
    activities: ["act1", "act4"],
    meals: ["meal1", "meal4"],
    accommodation: "acc1"
  },
  {
    id: "itin1_d3",
    packageId: "p1",
    day: 3,
    title: "Farewell to Paradise",
    description: "Final morning of relaxation before departure.",
    activities: ["act1"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans3"]
  },

  // Bali Cultural Package (p2)
  {
    id: "itin2_d1",
    packageId: "p2",
    day: 1,
    title: "Cultural Welcome",
    description: "Arrive and experience traditional Balinese welcome ceremony.",
    activities: ["act5"],
    meals: ["meal1", "meal5"],
    accommodation: "acc1",
    transport: ["trans1", "trans3"]
  },
  {
    id: "itin2_d2",
    packageId: "p2",
    day: 2,
    title: "Temple and Crafts",
    description: "Visit ancient temples and participate in traditional crafts.",
    activities: ["act6", "act7"],
    meals: ["meal1", "meal6"],
    accommodation: "acc1"
  },
  {
    id: "itin2_d3",
    packageId: "p2",
    day: 3,
    title: "Cooking and Departure",
    description: "Learn Balinese cooking before departure.",
    activities: ["act8"],
    meals: ["meal1"],
    accommodation: "acc1",
    transport: ["trans3"]
  },

  // Swiss Alps Adventure (p3)
  {
    id: "itin3_d1",
    packageId: "p3",
    day: 1,
    title: "Welcome to the Alps",
    description: "Arrive and get fitted for ski equipment.",
    activities: ["act2"],
    meals: ["meal1", "meal2"],
    accommodation: "acc2",
    transport: ["trans2"]
  },
  {
    id: "itin3_d2",
    packageId: "p3",
    day: 2,
    title: "Ski Adventure",
    description: "Full day of skiing with professional instruction.",
    activities: ["act2", "act9"],
    meals: ["meal1", "meal7", "meal2"],
    accommodation: "acc2"
  },
  {
    id: "itin3_d3",
    packageId: "p3",
    day: 3,
    title: "Final Slopes",
    description: "Morning skiing before departure.",
    activities: ["act2"],
    meals: ["meal1"],
    accommodation: "acc2",
    transport: ["trans2"]
  },

  // Swiss Luxury Retreat (p4)
  {
    id: "itin4_d1",
    packageId: "p4",
    day: 1,
    title: "Luxury Arrival",
    description: "Welcome to your mountain retreat with spa treatment.",
    activities: ["act10"],
    meals: ["meal1", "meal8"],
    accommodation: "acc2",
    transport: ["trans2"]
  },
  {
    id: "itin4_d2",
    packageId: "p4",
    day: 2,
    title: "Mountain Wellness",
    description: "Day of spa treatments and gourmet experiences.",
    activities: ["act10", "act11"],
    meals: ["meal1", "meal8", "meal2"],
    accommodation: "acc2"
  },
  {
    id: "itin4_d3",
    packageId: "p4",
    day: 3,
    title: "Farewell Relaxation",
    description: "Final morning of relaxation before departure.",
    activities: ["act10"],
    meals: ["meal1"],
    accommodation: "acc2",
    transport: ["trans2"]
  },

  // Kyoto Cultural Package (p5)
  {
    id: "itin5_d1",
    packageId: "p5",
    day: 1,
    title: "Kyoto Welcome",
    description: "Traditional welcome at a historic ryokan.",
    activities: ["act3"],
    meals: ["meal1", "meal3"],
    accommodation: "acc3",
    transport: ["trans1", "trans2"]
  },
  {
    id: "itin5_d2",
    packageId: "p5",
    day: 2,
    title: "Temple Tour",
    description: "Visit Kyoto's most famous temples and gardens.",
    activities: ["act3", "act12"],
    meals: ["meal1", "meal9", "meal3"],
    accommodation: "acc3"
  },
  {
    id: "itin5_d3",
    packageId: "p5",
    day: 3,
    title: "Cultural Farewell",
    description: "Final cultural experiences before departure.",
    activities: ["act3"],
    meals: ["meal1"],
    accommodation: "acc3",
    transport: ["trans2"]
  },

  // Kyoto Garden Package (p6)
  {
    id: "itin6_d1",
    packageId: "p6",
    day: 1,
    title: "Garden Introduction",
    description: "Begin your journey through Kyoto's finest gardens.",
    activities: ["act13"],
    meals: ["meal1", "meal3"],
    accommodation: "acc3",
    transport: ["trans1", "trans2"]
  },
  {
    id: "itin6_d2",
    packageId: "p6",
    day: 2,
    title: "Zen Gardens",
    description: "Explore peaceful Zen gardens and participate in meditation.",
    activities: ["act13", "act14"],
    meals: ["meal1", "meal9", "meal3"],
    accommodation: "acc3"
  },
  {
    id: "itin6_d3",
    packageId: "p6",
    day: 3,
    title: "Final Garden Visit",
    description: "Visit the last garden before departure.",
    activities: ["act13"],
    meals: ["meal1"],
    accommodation: "acc3",
    transport: ["trans2"]
  }
];

export const getPackageItinerary = (packageId: string): ItineraryDay[] => {
  return itineraries.filter(day => day.packageId === packageId)
    .sort((a, b) => a.day - b.day);
};

export const getItineraryDay = (packageId: string, day: number): ItineraryDay | undefined => {
  return itineraries.find(item => item.packageId === packageId && item.day === day);
};