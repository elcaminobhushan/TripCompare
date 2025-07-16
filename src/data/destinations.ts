export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularMonths: string[];
  climate: string;
  languages: string[];
  currency: string;
  timeZone: string;
  trending : Boolean;
  searches : number;
}

export const destinations: Destination[] = [
  {
    id: "d1",
    name: "Phuket/Krabi",
    country: "Thailand",
    image: "https://images.ctfassets.net/wv75stsetqy3/DaKdXY2tkQGWeVQiCbSx7/ac01166282697e4e0cafb99180d35cd1/Thailand_Featured.jpg?q=60&fit=fill&fm=webp",
    description: "Thailand blends stunning beaches, ancient temples, delicious street food, and bustling cities. From the party island of Phuket to the cultural charm of Chiang Mai and the vibrant streets of Bangkok, Thailand offers something for every traveler.",
    popularMonths: ["November - February"],
    climate: "Tropical with three seasons: hot, rainy, and cool",
    languages: ["Thai", "English (widely spoken in tourist areas)"],
    currency: "Thai Baht (THB)",
    timeZone: "UTC+7",
    trending : true,
    searches : 100
    // topAttractions: ["Phuket", "Chiang Mai", "Krabi", "Bangkok", "Full Moon Party (Koh Phangan)"],
    // idealFor: ["Budget travelers", "Solo travelers", "Nightlife seekers", "Cultural explorers"]
  }, 
  {
    id: "d2",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    description: "Bali, the Island of the Gods, is a tropical paradise known for its breathtaking beaches, lush rice terraces, spiritual temples, and vibrant nightlife. It's perfect for both relaxation and adventure, with world-class surfing, yoga retreats, and cultural heritage sites like Uluwatu and Tanah Lot.",
    popularMonths: ["June - September"],
    climate: "Tropical with wet and dry seasons",
    languages: ["Indonesian", "Balinese", "English"],
    currency: "Indonesian Rupiah (IDR)",
    timeZone: "UTC+8",
    trending : false,
    searches : 100
  },

  {
    id: "d3",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    image: "https://www.travelseasons.in/tour_images/vietnam-tour.jpg",
    description: "Vietnam offers a diverse landscape of emerald rice paddies, limestone karsts, colonial architecture, and buzzing street markets. It's known for its motorbike adventures, mouthwatering cuisine, and breathtaking natural wonders like Ha Long Bay.",
    popularMonths: ["March - November"],
    climate: "Tropical in the south and subtropical in the north",
    languages: ["Vietnamese", "English (in tourist hubs)"],
    currency: "Vietnamese Dong (VND)",
    timeZone: "UTC+7",
    trending : false,
    searches : 100
    // topAttractions: ["Ha Long Bay", "Hoi An", "Hanoi", "Da Nang", "Ho Chi Minh City"],
    // idealFor: ["Adventure seekers", "Food lovers", "Culture enthusiasts", "Nature travelers"]
  },
  {
    id: "d4",
    name: "Leh - Ladakh",
    country: "India",
    image: "https://www.easeindiatrip.com/blog/wp-content/uploads/2024/12/ladakh-pangong-tso-03.jpg",
    description: "Ladakh, often called the 'Land of High Passes,' is a remote and stunning region in the Himalayas. Famous for its stark landscapes, crystal-clear lakes like Pangong Tso, and ancient monasteries, it's a dream for bikers, trekkers, and spiritual seekers.",
    popularMonths: ["June - September"],
    climate: "Cold desert climate with dry summers and freezing winters",
    languages: ["Ladakhi", "Hindi", "English"],
    currency: "Indian Rupee (INR)",
    timeZone: "UTC+5:30",
    trending : false,
    searches : 100
    // topAttractions: ["Pangong Lake", "Nubra Valley", "Leh Palace", "Magnetic Hill", "Khardung La Pass"],
    // idealFor: ["Adventure bikers", "Trekking groups", "Nature lovers", "Spiritual travelers"]
  }
  
  
  
  
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};