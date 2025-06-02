export interface TourOperator {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviews: number;
  yearsInBusiness: number;
  specializations: string[];
  certifications: string[];
}

export const tourOperators: TourOperator[] = [
  {
    id: "to1",
    name: "Paradise Voyages",
    logo: "https://images.pexels.com/photos/5473944/pexels-photo-5473944.jpeg",
    description: "Leading provider of luxury beach holidays with over 15 years of experience in crafting unforgettable tropical getaways.",
    rating: 4.8,
    reviews: 1250,
    yearsInBusiness: 15,
    specializations: [
      "Luxury Beach Resorts",
      "Cultural Experiences",
      "Honeymoon Packages",
      "Wellness Retreats"
    ],
    certifications: ["IATA Certified", "Luxury Travel Specialist"]
  },
  {
    id: "to2",
    name: "Alpine Adventures",
    logo: "https://images.pexels.com/photos/5473957/pexels-photo-5473957.jpeg",
    description: "Specialists in mountain and winter sports holidays with expert local guides and premium accommodations.",
    rating: 4.7,
    reviews: 980,
    yearsInBusiness: 12,
    specializations: [
      "Winter Sports",
      "Mountain Expeditions",
      "Ski Packages",
      "Alpine Retreats"
    ],
    certifications: ["IATA Certified", "Mountain Guide Association"]
  },
  {
    id: "to3",
    name: "Cultural Voyages",
    logo: "https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg",
    description: "Expert providers of authentic cultural experiences and heritage tours across Asia.",
    rating: 4.9,
    reviews: 1560,
    yearsInBusiness: 18,
    specializations: [
      "Cultural Tours",
      "Heritage Sites",
      "Local Experiences",
      "Traditional Workshops"
    ],
    certifications: ["IATA Certified", "Cultural Tourism Expert"]
  }
];