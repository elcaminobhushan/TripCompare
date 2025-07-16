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
    name: "Capture a Trip",
    logo: "https://www.captureatrip.com/icons/logo.svg",
    description: "We serve Inbound & Outbound Tourists offering best of exciting destinations & the most exclusive itineraries. We are the expertise in offering various tour packages in circle to Domestic & International tours. Our focus has always remained on every single need of travelers. We not only offer competitive prices to the customers but maximum opportunities to opt for.",
    rating: 4.7,
    reviews: 449,
    yearsInBusiness: 9,
    specializations: [
      "Group Tours",
      "Adventours Tours",
      "Young People Tours"
    ],
    certifications: ["IATA Certified", "Group Travel Specialist"]
  },
  {
    id: "to2",
    name: "Trek Panda",
    logo: "https://api.trekpanda.in/uploads/logoText.png",
    description: "Founded in 2017, TrekPanda is a community-driven travel company based in Pune, India, dedicated to offering authentic, immersive travel experiences across India and select international destinations. ",
    rating: 3.3,
    reviews: 7,
    yearsInBusiness: 8,
    specializations: [
      "Multi-day Tours",
      "Private Tours",
      "Day Trips"
    ],
    certifications: ["IATA Certified", "Mountain Guide Association"]
  },
  {
    id: "to3",
    name: "Party Passport",
    logo: "https://partypassport.travel/wp-content/uploads/2025/02/Final-Logo-11-e1740499241132.png",
    description: "Expert providers of authentic cultural experiences and heritage tours across Asia.",
    rating: 3.8,
    reviews: 156,
    yearsInBusiness: 10,
    specializations: [
      "Exclusive Festival & Party Trips",
      "Semi-Luxury Travel",
      "Handpicked Like-Minded Travelers",
      "Unforgettable Destinations"
    ],
    certifications: ["IATA Certified", "Cultural Tourism Expert"]
  },
  {
    id: "to4",
    name: "Go4Explore ",
    logo: "https://d2qa7a8q0vuocm.cloudfront.net/static/assets/logo/g4e-wide.webp",
    description: "Go4Explore is a community of avid travellers badly bitten by the travel bug who curate fun-filled community trips as per your interest and comfort. •Road trips - Sometimes the most scenic roads in life are the detours you didn't mean to take. We organize short and long weekend road trips from Delhi with like-minded people. •Himalayan treks - Walk on trails, camp under million stars, chill beside warm bonfire and gather memories on our well curated treks. •Travel meets - We love meeting new people and share mindblowing travel stories. Travel meetups packed with fun and knowledge sessions by skilled-travellers.",
    rating: 3.5,
    reviews: 88,
    yearsInBusiness: 10,
    specializations: [
      "Exclusive Festival & Party Trips",
      "Semi-Luxury Travel",
      "Handpicked Like-Minded Travelers",
      "Unforgettable Destinations"
    ],
    certifications: ["IATA Certified", "Travellers' Choice by Trip Advisor"]
  }
];