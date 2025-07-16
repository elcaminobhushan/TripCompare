export interface ItineraryDay {
  id: string;
  packageId: string;
  day: number;
  title: string;
  description: string;
  activities: string[] | null; // Activity IDs
  meals: string[] | null; // Meal IDs
  accommodation: string | null; // Accommodation ID
  transport?: string[] | null; // Transport IDs
  notes?: string;
}

export const itineraries: ItineraryDay[] = [
    {
      "id": "itin1_d1",
      "packageId": "p1",
      "day": 1,
      "title": "Arrival in Phuket & Bangla Walking Street",
      "description": "Arrive in Phuket, check-in, and explore the vibrant nightlife at Bangla Walking Street.",
      "activities": ["act1"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans1"],
      "notes": "Private airport transfer and hotel check-in included"
    },
    {
      "id": "itin1_d2",
      "packageId": "p1",
      "day": 2,
      "title": "Phi Phi Island Day Tour",
      "description": "Full-day speedboat tour to Phi Phi Islands including beach lunch and snorkeling.",
      "activities": ["act2"],
      "meals": ["meal1"],
      "accommodation": null,
      "transport": ["trans2"],
      "notes": "Return by 7 PM; nightclubs optional"
    },
    {
      "id": "itin1_d3",
      "packageId": "p1",
      "day": 3,
      "title": "Half-Day Phuket City Tour",
      "description": "Tour Patong, Karon, Kata beaches, Karon viewpoint, Wat Chalong Temple, and cashew factory.",
      "activities": ["act3"],
      "meals": ["meal2"],
      "accommodation": null,
      "transport": ["trans3"],
      "notes": ""
    },
    {
      "id": "itin1_d4",
      "packageId": "p1",
      "day": 4,
      "title": "Phuket to Koh Samui & Full Moon Party",
      "description": "Travel to Koh Samui, relax at the beach, then speedboat to Koh Phangan for Full Moon Party.",
      "activities": ["act4"],
      "meals": ["meal2"],
      "accommodation": null,
      "transport": ["trans4", "trans5"],
      "notes": "Party through the night at Haad Rin Beach"
    },
    {
      "id": "itin1_d5",
      "packageId": "p1",
      "day": 5,
      "title": "Leisure Day in Koh Samui",
      "description": "Relax or explore Lamai Beach, Fishermen Market, and fire shows at your own pace.",
      "activities": ["act5"],
      "meals": ["meal2"],
      "accommodation": null,
      "transport": [],
      "notes": "Recommended activities are optional"
    },
    {
      "id": "itin1_d6",
      "packageId": "p1",
      "day": 6,
      "title": "Koh Samui to Krabi & Local City Walk",
      "description": "Transfer to Krabi by van and ferry, followed by a cultural and shopping walk in Krabi.",
      "activities": ["act6"],
      "meals": ["meal2"],
      "accommodation": null,
      "transport": ["trans6"],
      "notes": ""
    },
    {
      "id": "itin1_d7",
      "packageId": "p1",
      "day": 7,
      "title": "Four Island Tour from Krabi",
      "description": "Island hopping tour including Koh Poda, Chicken Island, Tup Island, and Phranang Cave Beach.",
      "activities": ["act7"],
      "meals": ["meal1"],
      "accommodation": null,
      "transport": ["trans7"],
      "notes": "Includes lunch and snorkeling stops"
    },
    {
      "id": "itin1_d8",
      "packageId": "p1",
      "day": 8,
      "title": "Departure from Krabi",
      "description": "Transfer from Krabi to Phuket Airport for your return flight home.",
      "activities": ["act8"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans8"],
      "notes": "Return transfer to airport included"
    },
    {
      "id": "itin2_d1",
      "packageId": "p2",
      "day": 1,
      "title": "Arrival in Phuket & Transfer to Krabi",
      "description": "Arrive at Phuket Airport, complete immigration, and meet our representative for your transfer to Krabi. Enjoy a scenic 3-hour drive through lush tropical landscapes. Check into your hotel upon arrival and spend the rest of the day at your leisure. Overnight stay in Krabi.",
      "activities": ["act9"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans8"],
      "notes": ""
    },
    {
      "id": "itin2_d2",
      "packageId": "p2",
      "day": 2,
      "title": "4 Island Tour by Speed Boat",
      "description": "After breakfast, embark on a thrilling speedboat tour of Krabi's stunning islands. Visit Phranang Cave Beach, Tup Island, Poda Island, and Chicken Island. Enjoy time on the beautiful beaches, take in the striking limestone cliffs, and relax by the ocean. Lunch will be provided during the tour. Adventure seekers can enjoy water sports before returning to the hotel. Overnight stay in Krabi.",
      "activities": ["act2"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans7"],
      "notes": ""
    },
    {
      "id": "itin2_d3",
      "packageId": "p2",
      "day": 3,
      "title": "Transfer from Krabi to Phuket & Cabaret Show",
      "description": "After breakfast, check out and transfer to Phuket. After checking into your hotel, unwind before an evening show at the famous Simon Cabaret, where you'll enjoy a captivating cultural performance. Overnight stay in Phuket.",
      "activities": ["act4"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans8"],
      "notes": ""
    },
    {
      "id": "itin2_d4",
      "packageId": "p2",
      "day": 4,
      "title": "Phi Phi Island Tour",
      "description": "Start your day with breakfast, then head to the Phi Phi Islands by speedboat. Explore iconic spots like Maya Bay and Monkey Beach, and admire limestone cliffs and pristine beaches. A lunch stop is included on the islands before returning to Phuket. Overnight stay in Phuket.",
      "activities": ["act3"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans2"],
      "notes": ""
    },
    {
      "id": "itin2_d5",
      "packageId": "p2",
      "day": 5,
      "title": "Phuket City Tour & Evening at Leisure",
      "description": "Following breakfast, embark on a city tour to visit popular landmarks, including Karon View Point, Wat Chalong Temple, and the Big Buddha Statue. After sightseeing, the rest of the evening is yours to relax or explore. Overnight stay in Phuket.",
      "activities": ["act5"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans3"],
      "notes": ""
    },
    {
      "id": "itin2_d6",
      "packageId": "p2",
      "day": 6,
      "title": "Fly to Bangkok & Transfer to Pattaya | Free Evening",
      "description": "After breakfast, transfer to Phuket Airport for a short flight to Bangkok, where you’ll be greeted and driven to Pattaya. Check into your Pattaya hotel and later, later evening free at Pattaya.",
      "activities": ["act10"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans1"],
      "notes": ""
    },
    {
      "id": "itin2_d7",
      "packageId": "p2",
      "day": 7,
      "title": "Coral Island Tour with Lunch",
      "description": "Enjoy breakfast before a boat ride to Coral Island. Spend the day at Tawaen Beach, where you can relax or engage in activities like snorkeling and sea-walking. Return to the hotel in the evening. Overnight stay in Pattaya.",
      "activities": ["act6"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans5"],
      "notes": ""
    },
    {
      "id": "itin2_d8",
      "packageId": "p2",
      "day": 8,
      "title": "Pattaya to Bangkok & City Tour",
      "description": "After breakfast, depart for Bangkok and check into your hotel. Later, visit popular sites like the Golden Buddha Temple and Temple of the Emerald Buddha, and shop for gemstones at the Gems Gallery. Overnight stay in Bangkok.",
      "activities": ["act7"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans4"],
      "notes": ""
    },
    {
      "id": "itin2_d9",
      "packageId": "p2",
      "day": 9,
      "title": "Full Day Safari World & Marine Park",
      "description": "Following breakfast, spend the day at Safari World and Marine Park. Encounter exotic animals in the open-air zoo, see dolphins and sea lions perform, and enjoy a meal at one of the park’s dining areas. Overnight stay in Bangkok.",
      "activities": ["act8"],
      "meals": [],
      "accommodation": null,
      "transport": [],
      "notes": ""
    },
    {
      "id": "itin2_d10",
      "packageId": "p2",
      "day": 10,
      "title": "Departure",
      "description": "After breakfast, pack your bags and transfer to Bangkok Airport for your journey home, filled with wonderful memories of Thailand.",
      "activities": ["act11"],
      "meals": [],
      "accommodation": null,
      "transport": ["trans1"],
      "notes": ""
    } ,
    {
      "id": "itin4_d1",
      "packageId": "p4",
      "day": 1,
      "title": "Arrival in Bangkok & Dinner Cruise",
      "description": "Arrive in Bangkok, transfer to hotel, and enjoy the Chao Phraya Princess River Dinner Cruise in the evening.",
      "activities": ["act31"],
      "meals": ["dinner"],
      "accommodation": "acc4",
      "transport": ["trans22"],
      "notes": "Cruise pickup around 6:00 PM. Return transfer included."
    },
    {
      "id": "itin4_d2",
      "packageId": "p4",
      "day": 2,
      "title": "Safari World & Marine Park",
      "description": "Full day at Safari World and Marine Park including jungle safari and dolphin show with lunch.",
      "activities": ["act32"],
      "meals": ["breakfast", "lunch"],
      "accommodation": "acc4",
      "transport": [],
      "notes": "Transfers via SIC. Entry included."
    },
    {
      "id": "itin4_d3",
      "packageId": "p4",
      "day": 3,
      "title": "Fly to Krabi",
      "description": "Transfer to Bangkok airport, take flight to Krabi, and check-in at Krabi hotel.",
      "activities": [],
      "meals": ["breakfast"],
      "accommodation": "acc4",
      "transport": ["trans23", "trans21", "trans24"],
      "notes": "Flight time subject to availability."
    },
    {
      "id": "itin4_d4",
      "packageId": "p4",
      "day": 4,
      "title": "4 Island Tour (Krabi)",
      "description": "Enjoy the 4 Island tour by long tail or speed boat with lunch.",
      "activities": ["act33"],
      "meals": ["breakfast", "lunch"],
      "accommodation": "acc4",
      "transport": ["trans27"],
      "notes": "Bring swimwear and sunscreen."
    },
    {
      "id": "itin4_d5",
      "packageId": "p4",
      "day": 5,
      "title": "Transfer to Phuket & Tiger Kingdom Visit",
      "description": "Travel from Krabi to Phuket and enjoy a visit to Tiger Kingdom and Dolphin Show en route.",
      "activities": ["act35", "act36"],
      "meals": ["breakfast"],
      "accommodation": "acc4",
      "transport": ["trans25"],
      "notes": "Private transfer between cities with stops."
    },
    {
      "id": "itin4_d6",
      "packageId": "p4",
      "day": 6,
      "title": "Phi Phi Island Tour",
      "description": "Spend the day at Phi Phi Islands with lunch and water activities.",
      "activities": ["act34"],
      "meals": ["breakfast", "lunch"],
      "accommodation": "acc4",
      "transport": ["trans28"],
      "notes": "Speedboat/big boat depending on weather."
    },
    {
      "id": "itin4_d7",
      "packageId": "p4",
      "day": 7,
      "title": "Phuket City Tour",
      "description": "Explore Phuket landmarks including Big Buddha and Wat Chalong.",
      "activities": ["act37"],
      "meals": ["breakfast"],
      "accommodation": "acc4",
      "transport": [],
      "notes": "Private vehicle for sightseeing."
    },
    {
      "id": "itin4_d8",
      "packageId": "p4",
      "day": 8,
      "title": "Departure from Phuket",
      "description": "Check out from hotel and transfer to Phuket Airport for departure.",
      "activities": [],
      "meals": ["breakfast"],
      "accommodation": null,
      "transport": ["trans26"],
      "notes": "End of trip. Airport transfer included."
    }
];

export const getPackageItinerary = (packageId: string): ItineraryDay[] => {
  return itineraries.filter(day => day.packageId === packageId)
    .sort((a, b) => a.day - b.day);
};

export const getItineraryDay = (packageId: string, day: number): ItineraryDay | undefined => {
  return itineraries.find(item => item.packageId === packageId && item.day === day);
};