import { Package } from '../types';

export const packages: Package[] = [
  // Bali Packages
  {
    id: "p1",
    title: "Serene Beach Getaway",
    destinationId: "d1", // Bali
    image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
    price: 1299,
    currency: "USD",
    duration: 3,
    rating: 4.8,
    reviews: 124,
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Room Service"],
    description: "Experience the ultimate relaxation in Bali with this all-inclusive beach package.",
    itineraryId: "itin1",
    accommodationId: "acc1",
    transportIds: ["trans1", "trans3"],
    inclusions: [
      "Round-trip international flights",
      "Airport transfers",
      "2 nights accommodation",
      "Daily breakfast",
      "Welcome dinner"
    ],
    exclusions: [
      "Travel insurance",
      "Optional activities",
      "Additional meals not specified"
    ],
    featured: true,
    tourOperatorId: "to1",
    tags: ["Beach", "All-Inclusive", "Luxury"],
    departureLocations: ["Mumbai", "Delhi"],
  },
  {
    id: "p2",
    title: "Bali Cultural Discovery",
    destinationId: "d1",
    image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
    price: 1499,
    currency: "USD",
    duration: 3,
    rating: 4.7,
    reviews: 98,
    amenities: ["Pool", "Spa", "WiFi"],
    description: "Immerse yourself in Balinese culture with temple visits and traditional experiences.",
    itineraryId: "itin2",
    accommodationId: "acc1",
    transportIds: ["trans1", "trans3"],
    inclusions: [
      "Round-trip flights",
      "Traditional cooking class",
      "Temple tours",
      "Cultural performances"
    ],
    exclusions: [
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    tourOperatorId: "to1",
    tags: ["Cultural", "All-Inclusive"],
    departureLocations: ["Mumbai", "Delhi"],
  },

  // Swiss Alps Packages
  {
    id: "p3",
    title: "Swiss Alpine Adventure",
    destinationId: "d2",
    image: "https://images.pexels.com/photos/356808/pexels-photo-356808.jpeg",
    price: 2499,
    currency: "USD",
    duration: 3,
    rating: 4.9,
    reviews: 156,
    amenities: ["Pool", "Fitness Center"],
    description: "Experience the thrill of skiing in the majestic Swiss Alps.",
    itineraryId: "itin3",
    accommodationId: "acc2",
    transportIds: ["trans2"],
    inclusions: [
      "Swiss Rail Pass",
      "Ski equipment",
      "Professional instruction",
      "Mountain lunch"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Additional equipment"
    ],
    featured: true,
    tourOperatorId: "to2",
    tags: ["Adventure", "Family-Friendly"],
    departureLocations: ["Mumbai", "Delhi"],
  },
  {
    id: "p4",
    title: "Luxury Swiss Retreat",
    destinationId: "d2",
    image: "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
    price: 2899,
    currency: "USD",
    duration: 3,
    rating: 4.8,
    reviews: 112,
    amenities: ["Spa", "WiFi", "Fitness Center"],
    description: "Indulge in a luxurious mountain retreat with spa treatments and gourmet dining.",
    itineraryId: "itin4",
    accommodationId: "acc2",
    transportIds: ["trans2"],
    inclusions: [
      "Luxury accommodation",
      "Spa treatments",
      "Gourmet meals",
      "Mountain activities"
    ],
    exclusions: [
      "Flights",
      "Travel insurance",
      "Additional activities"
    ],
    tourOperatorId: "to2",
    tags: ["Luxury", "All-Inclusive"],
    departureLocations: ["Mumbai", "Delhi"],
  },

  // Kyoto Packages
  {
    id: "p5",
    title: "Kyoto Cultural Immersion",
    destinationId: "d3",
    image: "https://images.pexels.com/photos/5007442/pexels-photo-5007442.jpeg",
    price: 1899,
    currency: "USD",
    duration: 3,
    rating: 4.9,
    reviews: 178,
    amenities: ["Restaurant", "Room Service"],
    description: "Discover the ancient traditions and beauty of Kyoto.",
    itineraryId: "itin5",
    accommodationId: "acc3",
    transportIds: ["trans1", "trans2"],
    inclusions: [
      "Traditional ryokan stay",
      "Tea ceremony",
      "Temple visits",
      "Cultural workshops"
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Optional activities"
    ],
    featured: true,
    departureLocations: ["Mumbai", "Delhi"],
    tourOperatorId: "to3",
    tags: ["Cultural", "Luxury"]
  },
  {
    id: "p6",
    title: "Kyoto Garden Tour",
    destinationId: "d3",
    image: "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg",
    price: 1699,
    currency: "USD",
    duration: 3,
    rating: 4.7,
    reviews: 145,
    amenities: ["Restaurant", "Room Service"],
    description: "Explore Kyoto's most beautiful gardens and peaceful temples.",
    itineraryId: "itin6",
    accommodationId: "acc3",
    transportIds: ["trans1", "trans2"],
    inclusions: [
      "Garden tours",
      "Traditional accommodation",
      "Tea ceremonies",
      "Local guide"
    ],
    exclusions: [
      "Flights",
      "Personal expenses",
      "Optional activities"
    ],
    departureLocations: ["Mumbai", "Delhi"],
    tourOperatorId: "to3",
    tags: ["Cultural", "Eco-Friendly"]
  },
  // Thailand Packages
{
  id: "p7",
  title: "Bangkok City Explorer",
  destinationId: "d4", // Thailand
  image: "https://images.pexels.com/photos/2082181/pexels-photo-2082181.jpeg",
  price: 1199,
  currency: "USD",
  duration: 3,
  rating: 4.6,
  reviews: 87,
  amenities: ["Pool", "Spa", "Restaurant"],
  description: "Dive into the vibrant city life of Bangkok with this exciting urban tour.",
  itineraryId: "itin6",
  accommodationId: "acc3",
  transportIds: ["trans1"],
  inclusions: [
    "City sightseeing tour",
    "Floating market visit",
    "2 nights hotel stay",
    "Daily breakfast",
    "Chao Phraya river cruise"
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal expenses"
  ],
  featured: true,
  departureLocations: ["Mumbai", "Delhi"],
  tourOperatorId: "to3",
  tags: ["Cultural", "All-Inclusive"]
},
{
  id: "p8",
  title: "Phuket Island Retreat",
  destinationId: "d4",
  image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
  price: 1399,
  currency: "USD",
  duration: 3,
  rating: 4.8,
  reviews: 134,
  amenities: ["Pool", "Room Service", "Fitness Center"],
  description: "Unwind on the white-sand beaches of Phuket with this relaxing island retreat.",
  itineraryId: "itin6",
  accommodationId: "acc3",
  transportIds: ["trans1", "trans3"],
  inclusions: [
    "Beach resort accommodation",
    "Island-hopping tour",
    "Welcome drink",
    "Daily breakfast and one dinner",
    "Airport transfers"
  ],
  exclusions: [
    "Travel insurance",
    "Additional meals",
    "Optional excursions"
  ],
  departureLocations: ["Mumbai", "Delhi"],
  tourOperatorId: "to3",
  tags: ["Beach", "Luxury"]
}

];

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

export const getRelatedPackages = (packageId: string, limit: number = 3): Package[] => {
  const currentPackage = packages.find(p => p.id === packageId);
  if (!currentPackage) return [];
  
  return packages
    .filter(p => 
      p.id !== packageId && 
      p.destinationId === currentPackage.destinationId
    )
    .slice(0, limit);
};