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
    amenityIds: ["amen1", "amen2", "amen3", "amen4", "amen5"],
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
    locationIds: ["loc1"],
    tourOperatorId: "to1",
    tagIds: ["tag1", "tag7", "tag11"]
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
    amenityIds: ["amen1", "amen2", "amen3"],
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
    locationIds: ["loc1"],
    tourOperatorId: "to1",
    tagIds: ["tag3", "tag7"]
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
    amenityIds: ["amen1", "amen5"],
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
    locationIds: ["loc2"],
    tourOperatorId: "to2",
    tagIds: ["tag2", "tag8"]
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
    amenityIds: ["amen2", "amen3", "amen5"],
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
    locationIds: ["loc2"],
    tourOperatorId: "to2",
    tagIds: ["tag11", "tag7"]
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
    amenityIds: ["amen3", "amen4"],
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
    locationIds: ["loc3"],
    tourOperatorId: "to3",
    tagIds: ["tag3", "tag11"]
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
    amenityIds: ["amen3", "amen4"],
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
    locationIds: ["loc3"],
    tourOperatorId: "to3",
    tagIds: ["tag3", "tag12"]
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