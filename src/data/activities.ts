export interface Activity {
  id: string;
  name: string;
  type : 
  'adventure' | 'cultural' | 'relaxation' | 'sightseeing' | 
  'water-sports' | 'winter-sports' | 'nightlife' | 'party' | 
  'island-hopping' | 'transfers';
description: string;
  duration: number; // in hours
  difficulty: 'easy' | 'moderate' | 'challenging';
  image: string;
  included: boolean;
  price?: number;
  minimumAge?: number;
  maximumParticipants?: number;
  equipment?: string[];
}

export const activities: Activity[] = [
  {
    "id": "act1",
    "name": "Bangla Walking Street Visit",
    "type": "nightlife",
    "description": "Explore Patong’s famous Bangla Walking Street lined with bars, clubs, and neon lights.",
    "duration": 2,
    "difficulty": "easy",
    "image": "https://images.pexels.com/photos/189994/pexels-photo-189994.jpeg",
    "included": true,
    "minimumAge": 18,
    "equipment": []
  },
  {
    "id": "act2",
    "name": "4 Island Speedboat Tour",
    "type": "island-hopping",
    "description": "Discover Krabi’s most beautiful islands by speedboat, with stops for swimming and sunbathing.",
    "duration": 6,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": ["life jacket", "snorkel"]
  },
  {
    "id": "act3",
    "name": "Phi Phi Island Tour",
    "type": "island-hopping",
    "description": "Take a scenic speedboat ride to the stunning Phi Phi Islands with stops at Maya Bay and Monkey Beach.",
    "duration": 8,
    "difficulty": "moderate",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": ["snorkel", "life jacket"]
  },
  {
    "id": "act4",
    "name": "Simon Cabaret Show",
    "type": "party",
    "description": "Watch a glamorous cabaret performance with music, dance, and dazzling costumes in Phuket.",
    "duration": 2,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act5",
    "name": "Phuket City Tour",
    "type": "sightseeing",
    "description": "Visit Karon View Point, Big Buddha, and Wat Chalong Temple on this half-day guided city tour.",
    "duration": 4,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act6",
    "name": "Coral Island Water Activities",
    "type": "water-sports",
    "description": "Relax or enjoy water sports like snorkeling and sea-walking at Pattaya’s Coral Island.",
    "duration": 6,
    "difficulty": "moderate",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": ["snorkel", "life jacket"]
  },
  {
    "id": "act7",
    "name": "Bangkok City & Temple Tour",
    "type": "cultural",
    "description": "Tour Bangkok’s cultural landmarks including the Golden Buddha and Emerald Buddha temples.",
    "duration": 4,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act8",
    "name": "Safari World & Marine Park",
    "type": "sightseeing",
    "description": "Visit Safari World to see exotic animals and enjoy shows at the Marine Park.",
    "duration": 6,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act9",
    "name": "Arrival & Transfer Assistance",
    "type": "transfers",
    "description": "Assistance on arrival and transfer from Phuket Airport to Krabi hotel.",
    "duration": 3,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act10",
    "name": "Flight and Transfer to Pattaya",
    "type": "transfers",
    "description": "Internal flight from Phuket to Bangkok and ground transfer to Pattaya.",
    "duration": 4,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act11",
    "name": "Return Airport Transfer",
    "type": "transfers",
    "description": "Transfer from Bangkok hotel to airport for your return flight.",
    "duration": 1,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act31",
    "name": "Chao Phraya River Dinner Cruise",
    "type": "relaxation",
    "description": "Evening cruise in Bangkok with dinner, entertainment, and night views.",
    "duration": 3,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act32",
    "name": "Safari World & Marine Park",
    "type": "adventure",
    "description": "Explore open wildlife safaris and marine animal shows including a dolphin performance.",
    "duration": 6,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act33",
    "name": "4 Island Tour",
    "type": "island-hopping",
    "description": "Visit Tup, Poda, Chicken Islands and Phra Nang Cave Beach with lunch.",
    "duration": 6,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": ["life jacket", "snorkel"]
  },
  {
    "id": "act34",
    "name": "Phi Phi Island Tour",
    "type": "island-hopping",
    "description": "Full day Phi Phi tour by speedboat or big boat with lunch and snorkeling.",
    "duration": 8,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": ["life jacket", "snorkel"]
  },
  {
    "id": "act35",
    "name": "Tiger Kingdom Phuket",
    "type": "adventure",
    "description": "Close-up experience with tigers in a safe, controlled environment.",
    "duration": 2,
    "difficulty": "moderate",
    "image": "",
    "included": true,
    "minimumAge": 12,
    "equipment": []
  },
  {
    "id": "act36",
    "name": "Dolphin Show Phuket",
    "type": "cultural",
    "description": "Live dolphin performance at a marine center in Phuket.",
    "duration": 1,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  },
  {
    "id": "act37",
    "name": "Phuket City Tour with Big Buddha",
    "type": "sightseeing",
    "description": "Explore Phuket’s landmarks including Big Buddha and Wat Chalong.",
    "duration": 4,
    "difficulty": "easy",
    "image": "",
    "included": true,
    "minimumAge": 0,
    "equipment": []
  }
];

export const getActivityById = (id: string): Activity | undefined => {
  return activities.find(activity => activity.id === id);
};

export const getActivitiesByType = (type: Activity['type']): Activity[] => {
  return activities.filter(activity => activity.type === type);
};