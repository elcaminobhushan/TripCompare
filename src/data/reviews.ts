import { Review } from '../types';

export interface PackageReview extends Review {
  packageId: string;
}

export const reviews: PackageReview[] = [
  {
    id: "rev1",
    packageId: "p1",
    userId: "u1",
    rating: 5,
    title: "Amazing cultural experience!",
    content: "The temples were breathtaking and our guide was incredibly knowledgeable. Every detail was perfectly planned.",
    date: "2024-03-15",
    likes: 24,
    imageIds: ["img1", "img2"],
    tagIds: ["tag1", "tag2"],
    verified: true,
    response: {
      from: "Paradise Voyages",
      content: "Thank you for your wonderful review! We're delighted you enjoyed the cultural experience.",
      date: "2024-03-16"
    }
  },
  {
    id: "rev2",
    packageId: "p1",
    userId: "u2",
    rating: 4,
    title: "Great tour, minor transport issues",
    content: "Beautiful locations and excellent accommodation. Only small issue was with some transport delays.",
    date: "2024-03-10",
    likes: 12,
    tagIds: ["tag3"],
    verified: true
  },
  {
    id: "rev3",
    packageId: "p2",
    userId: "u3",
    rating: 5,
    title: "Perfect winter getaway",
    content: "The ski instruction was top-notch and the accommodation was luxurious. Will definitely book again!",
    date: "2024-02-28",
    likes: 18,
    imageIds: ["img3"],
    tagIds: ["tag4", "tag5"],
    verified: true
  }
];

export const getPackageReviews = (packageId: string): PackageReview[] => {
  return reviews.filter(review => review.packageId === packageId);
};

export const getPackageRating = (packageId: string): { rating: number; count: number } => {
  const packageReviews = getPackageReviews(packageId);
  const totalRating = packageReviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    rating: packageReviews.length > 0 ? totalRating / packageReviews.length : 0,
    count: packageReviews.length
  };
};