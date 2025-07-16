import { Review } from '../types';

export interface PackageReview extends Review {
  packageId: string;
}

export const reviews: PackageReview[] = [
  {
    id: "rev101",
    packageId: "p1",
    userId: "u101",
    rating: 5,
    title: "Unforgettable trip with amazing vibes!",
    content: "The Full Moon Party was an absolute blast! Everything from Phi Phi Islands to Krabi's chill vibes was perfectly planned. Great accommodations, zero stress.",
    date: "2024-05-12",
    likes: 42,
    imageIds: ["img1"],
    tagIds: ["tag-party", "tag-islands"],
    verified: true,
    response: {
      from: "TripCompare Team",
      content: "We're so happy you enjoyed the energy and ease of the experience! See you on your next adventure!",
      date: "2024-05-13"
    }
  },
  {
    id: "rev102",
    packageId: "p1",
    userId: "u102",
    rating: 4,
    title: "Fun group tour with smooth planning",
    content: "It was my first time doing a group tour. The trip captain was awesome and took care of everything. Just wish we had more time at Koh Samui.",
    date: "2024-05-08",
    likes: 19,
    tagIds: ["tag-group", "tag-thailand"],
    verified: true
  },
  {
    id: "rev103",
    packageId: "p1",
    userId: "u103",
    rating: 5,
    title: "Best beach trip ever!",
    content: "The beaches were dreamy, transfers were super smooth, and the people I met on this trip made it special. Will definitely travel with TripCompare again!",
    date: "2024-05-02",
    likes: 33,
    imageIds: ["img2"],
    tagIds: ["tag-beach", "tag-solo"],
    verified: true
  },
  {
    id: "rev104",
    packageId: "p2",
    userId: "u103",
    rating: 5,
    title: "The most incredible trip",
    content: "This was my first international trip with my friends away from my family and it was one of the best experience. All the sightseeing places and especially the historic places were absolutely superb. Kudos to TrekPanda for arranging the trip in a great way. There was a season going on in vietnam and it was a bit crowded but due to the management of our experience and reliable trip leader all things were covered in proper time and we didn't miss any sightseeing place. Thank you so much trekpanda for giving me my most memorable trip. I will definitely plan our next all trips with your company and will bring my family along too.",
    date: "2024-05-02",
    likes: 3,
    imageIds: ["img7"],
    tagIds: ["tag-beach", "tag-solo"],
    verified: true
  },


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