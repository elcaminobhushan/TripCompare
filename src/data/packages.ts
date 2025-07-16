import { Package } from '../types';

export const packages: Package[] = [
  // Bali Packages
  {
    id: "p1",
    title: "Thailand Full Moon Party (with Flights)",
    destinationId: "d1", 
    image: "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fd1zvcmhypeawxj.cloudfront.net%2Flocation%2FThailand%2Fblogs%2Fthailand-backpacking-trip-0d0f527b82-dzhgzk-webp-d2fd85b1ba-1752060661759.webp&w=3840&q=50",
    price: 74999,
    currency: "INR",
    duration_days: 8,
    duration_nights: 7,
    rating: 5,
    reviews: 7286,
    description: "Picture yourself dancing to the pulsating beats of a DJ along with thousands of other travelers on a beach under the full moon with a cocktail in hand. The Full Moon Party in Thailand is your destination where thousands of travelers from across the world gather every month on a full moon day and enjoy the vibrant celebration of an unforgettable night where music, dance and enjoyment seem to collide perfectly.",
    itineraryId: "itin1",
    accommodationId: "acc1",
    tourOperatorId: "to1",
    transportIds: ["trans1", "trans3"],
    inclusions: [
      "Return international flight up to INR 25,000",
      "Airport pick-up and drop at the destination city",
      "7 nights accommodation",
      "Daily breakfast (7 breakfasts)",
      "2 Indian lunches (1 at Phi Phi Island tour, 1 at 4 Island tour)",
      "Phi Phi Island day trip by speedboat with lunch",
      "4 Island tour with Indian lunch",
      "Phuket to Koh Samui transfer via bus/van and ferry",
      "Koh Samui to Koh Phangan and back via speedboat",
      "Ferry and road transfer from Koh Samui to Krabi",
      "Trip Captain from India"
    ],
    exclusions: [
      "5% GST & 5% TCS",
      "400 THB National Park Fees for Phi Phi and 4 Island tours",
      "Visa fees",
      "Full Moon Party ticket (~200 Baht)",
      "RT-PCR test (if required)",
      "Meals other than those specified in inclusions",
      "Personal and incidental expenses",
      "Any services not explicitly mentioned in inclusions"
    ],
    featured: true,
    departureLocations: ["Delhi"],
    tags: ["Full Moon Party", "Flights Included", "Group Tour"],
    itinerary : "CaptureATrip_Thailand_7N8D.pdf"
  },
  {
    "id": "p2",
    "title": "10 Days of Fantastic Thailand",
    "destinationId": "d1",
    "image": "https://api.trekpanda.in/uploads/maya%20bay%20trekpanda.jpg",
    "price": 50000,
    "currency": "INR",
    "duration_days": 10,
    "duration_nights": 9,
    "rating": 4.7,
    "reviews": 39,
    "description": "Experience Thailand like never before! From Krabi's tranquil islands and Phuket's cabaret glam to Pattaya's Coral Island and Bangkok's vibrant culture, this 10-day journey offers the perfect mix of beaches, nightlife, and iconic landmarks — ideal for your first international adventure!",
    "itineraryId": "itin2",
    "accommodationId": "acc2",
    "tourOperatorId": "to2",
    "transportIds": ["trans_air_internal", "trans_sic"],
    "inclusions": [
      "Accommodation in 3-star properties: 2N Krabi, 3N Phuket, 2N Pattaya, 2N Bangkok with breakfast",
      "All intercity and airport transfers: Airport → Krabi → Phuket → Pattaya → Bangkok → Airport",
      "All tours & activities on SIC (Seat-in-Coach) basis",
      "Krabi: 4 Island Tour by speedboat with lunch",
      "Phuket: Phi Phi Island Tour by speedboat with lunch",
      "Phuket: City Tour and Simon Cabaret Show",
      "Pattaya: Coral Island Tour with lunch",
      "Bangkok: City & Temple Tour (Golden Buddha & Wat Traimit)",
      "Bangkok: Safari World & Marine Park tour with lunch",
      "Internal flight from Phuket to Bangkok",
      "Meet-and-greet assistance at the airport",
      "Smooth hotel check-ins and local transport"
    ],
    "exclusions": [
      "Return international airfare (can be arranged on request)",
      "Personal expenses (shopping, tips, meals not included in package)",
      "National park fees",
      "5% GST & 5% TCS (as applicable)"
    ],
    "featured": true,
    "departureLocations": ["Delhi"],
    "tags": ["Group Tour", "Thailand Highlights", "Beaches", "Cabaret", "Culture"],
    "itinerary": "TrekPanda_Thailand_10D_Itinerary.pdf"
  },
  {
    "id": "p3",
    "title": "Thailand Solo & Party Group Tour",
    "destinationId": "d1",
    "image": "https://d2qa7a8q0vuocm.cloudfront.net/images/12073820231104222013.png",
    "price": 51999,
    "currency": "INR",
    "duration_days": 8,
    "duration_nights": 7,
    "rating": 4.9,
    "reviews": 87,
    "description": "Unleash your party spirit and solo adventure vibes on this epic 8-day Thailand group tour! Explore Phuket, Koh Samui, Koh Phangan and Krabi — with yacht parties, fire shows, full moon madness, and a squad of like-minded travelers.",
    "itineraryId": "itin3",
    "accommodationId": "acc3",
    "tourOperatorId": "to3",
    "transportIds": ["trans_ferry", "trans_private"],
    "inclusions": [
      "7 Nights accommodation in 4-star hotels located in city-centre",
      "Airport pickup & drop",
      "Sundowner Yacht Party",
      "Intercity transportation through ferries and private transfers",
      "All activities mentioned in the itinerary",
      "Full Moon Party access",
      "Travel Insurance",
      "Entry fees and local guide charges",
      "Experienced trip leader and local guides"
    ],
    "exclusions": [
      "International flights & Visa",
      "Personal shopping & drinks or any other expenses",
      "Meals not mentioned",
      "Scuba diving or extra water sports",
      "Entry fees/cover charges to clubs, pubs etc.",
      "Any expense due to unforeseen circumstances",
      "Any tips given to local guides, drivers etc."
    ],
    "featured": true,
    "departureLocations": ["Delhi", "Mumbai", "Bangalore"],
    "tags": [
      "Solo Travel",
      "Group Tour",
      "Beach Parties",
      "Full Moon Party",
      "Island Hopping",
      "Nightlife",
      "Indian Travelers",
      "Digital Nomads"
    ],
    "itinerary": "Thailand_Solo_Party_8D_Itinerary.pdf"
  },
  {
    "id": "p4",
    "title": "Bangkok–Krabi–Phuket Tour (8D/7N)",
    "destinationId": "d1",
    "image": "https://d2qa7a8q0vuocm.cloudfront.net/images/15489120231104222013.png",
    "price": 80000,
    "currency": "INR",
    "duration_days": 8,
    "duration_nights": 7,
    "rating": 4.8,
    "reviews": 62,
    "description": "Explore the best of Thailand in 8 days across Bangkok, Krabi, and Phuket. From cultural city tours and jungle safaris to island-hopping and thrilling shows, this all-in-one tour blends relaxation and adventure in style.",
    "itineraryId": "itin4",
    "accommodationId": "acc4",
    "tourOperatorId": "to4",
    "transportIds": ["trans_flight", "trans_private", "trans_sic"],
    "inclusions": [
      "Accommodation in 3/4 star Hotels for 7 Nights",
      "Daily buffet Breakfast & 2 Complimentary Dinners",
      "Bangkok–Hotel–Airport transfers (Private)",
      "Krabi Airport to Hotel (Private)",
      "Krabi to Phuket Hotel Transfer (Private)",
      "Phuket Hotel to Airport Transfer (Private)",
      "Chao Phraya Princess Dinner Cruise (SIC)",
      "Safari World and Marine Park with Lunch, Jungle Safari, Dolphin Show (SIC)",
      "4 Island Tour with Lunch by Long Tail / Speed Boat (SIC)",
      "Phi Phi Island Tour with Lunch by Big Boat / Speed Boat (SIC)",
      "Tiger Kingdom Phuket (Private)",
      "Dolphin Show (Private)",
      "Phuket City Tour with Big Buddha (Private)",
      "All sightseeing transfers as per itinerary"
    ],
    "exclusions": [
      "Any kind of personal expenses",
      "Anything not mentioned in the Inclusions",
      "Monument/city tax/museum entry fees",
      "Travel Insurance",
      "5% GST & 5% TCS (TCS claimable in ITR)"
    ],
    "featured": true,
    "departureLocations": ["Delhi", "Mumbai", "Bangalore"],
    "tags": [
      "International Trips",
      "Island Hopping",
      "Adventure",
      "New Year Celebrations",
      "City + Beach",
      "Family Friendly"
    ],
    "itinerary": "Thailand_Bangkok_Krabi_Phuket_8D_Itinerary.pdf"
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