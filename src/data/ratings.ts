export interface Rating {
  id: string;
  packageId: string;
  category: 'value' | 'location' | 'amenities' | 'service' | 'cleanliness';
  score: number;
  count: number;
}

export const ratings: Rating[] = [
  // Serene Beach Getaway Ratings
  {
    id: "r1_value",
    packageId: "p1",
    category: "value",
    score: 4.7,
    count: 124
  },
  {
    id: "r1_location",
    packageId: "p1",
    category: "location",
    score: 4.9,
    count: 124
  },
  {
    id: "r1_amenities",
    packageId: "p1",
    category: "amenities",
    score: 4.8,
    count: 124
  },
  {
    id: "r1_service",
    packageId: "p1",
    category: "service",
    score: 4.9,
    count: 124
  },
  {
    id: "r1_cleanliness",
    packageId: "p1",
    category: "cleanliness",
    score: 4.8,
    count: 124
  },
  
  // Swiss Alpine Adventure Ratings
  {
    id: "r2_value",
    packageId: "p2",
    category: "value",
    score: 4.5,
    count: 98
  },
  {
    id: "r2_location",
    packageId: "p2",
    category: "location",
    score: 4.8,
    count: 98
  },
  {
    id: "r2_amenities",
    packageId: "p2",
    category: "amenities",
    score: 4.6,
    count: 98
  },
  {
    id: "r2_service",
    packageId: "p2",
    category: "service",
    score: 4.7,
    count: 98
  },
  {
    id: "r2_cleanliness",
    packageId: "p2",
    category: "cleanliness",
    score: 4.9,
    count: 98
  }
];

export const getPackageRatings = (packageId: string): Rating[] => {
  return ratings.filter(rating => rating.packageId === packageId);
};

export const getPackageAverageRating = (packageId: string): number => {
  const packageRatings = getPackageRatings(packageId);
  const totalScore = packageRatings.reduce((sum, rating) => sum + rating.score, 0);
  return packageRatings.length > 0 ? totalScore / packageRatings.length : 0;
};

export const getPackageRatingsByCategory = (packageId: string, category: Rating['category']): Rating | undefined => {
  return ratings.find(rating => rating.packageId === packageId && rating.category === category);
};