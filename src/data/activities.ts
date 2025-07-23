import {getPackageItinerary} from './itineraries';
import { ItineraryDay } from './itineraries';

export interface Activity {
  id: string;
  itenaryId: string;
  name: string;
  type : 
  'adventure' | 'cultural' | 'relaxation' | 'sightseeing' | 
  'water-sports' | 'winter-sports' | 'nightlife' | 'party' | 
  'island-hopping' | 'transfers';
  description: string;
  image: string;
}

export const activities: Activity[] = [
  {
    "id": "act1",
    itenaryId :"itin1_d1",
    "name": "Bangla Walking Street Visit",
    "type": "nightlife",
    "description": "Explore Patong’s famous Bangla Walking Street lined with bars, clubs, and neon lights.",
    "image": "https://images.pexels.com/photos/189994/pexels-photo-189994.jpeg"
  },
  {
    "id": "act2",
    itenaryId :"itin1_d2",
    "name": "4 Island Speedboat Tour",
    "type": "island-hopping",
    "description": "Discover Krabi’s most beautiful islands by speedboat, with stops for swimming and sunbathing.",
    "image": "",
  },
  {
    "id": "act3",
    itenaryId :"itin1_d3",
    "name": "Phi Phi Island Tour",
    "type": "island-hopping",
    "description": "Take a scenic speedboat ride to the stunning Phi Phi Islands with stops at Maya Bay and Monkey Beach.",
    "image": ""
  },
  {
    "id": "act4",
    itenaryId :"itin1_d4",
    "name": "Simon Cabaret Show",
    "type": "party",
    "description": "Watch a glamorous cabaret performance with music, dance, and dazzling costumes in Phuket.",
    "image": ""
  },
  {
    "id": "act5",
    itenaryId :"itin1_d5",
    "name": "Phuket City Tour",
    "type": "sightseeing",
    "description": "Visit Karon View Point, Big Buddha, and Wat Chalong Temple on this half-day guided city tour.",
    "image": ""
  },
  {
    "id": "act6",
    itenaryId :"itin1_d6",
    "name": "Coral Island Water Activities",
    "type": "water-sports",
    "description": "Relax or enjoy water sports like snorkeling and sea-walking at Pattaya’s Coral Island.",
    "image": ""
  },
  {
    "id": "act7",
    itenaryId :"itin1_d7",
    "name": "Bangkok City & Temple Tour",
    "type": "cultural",
    "description": "Tour Bangkok’s cultural landmarks including the Golden Buddha and Emerald Buddha temples.",
    "image": "",
  },
  {
    "id": "act8",
    itenaryId :"itin1_d8",
    "name": "Safari World & Marine Park",
    "type": "sightseeing",
    "description": "Visit Safari World to see exotic animals and enjoy shows at the Marine Park.",
    "image": ""
  },
  {
    "id": "act9",
    itenaryId :"itin2_d1",
    "name": "Arrival & Transfer Assistance",
    "type": "transfers",
    "description": "Assistance on arrival and transfer from Phuket Airport to Krabi hotel.",
    "image": ""
  },
  {
    "id": "act10",
    itenaryId :"itin2_d2",
    "name": "Flight and Transfer to Pattaya",
    "type": "transfers",
    "description": "Internal flight from Phuket to Bangkok and ground transfer to Pattaya.",
    "image": ""
  },
  {
    "id": "act11",
    itenaryId :"itin2_d3",
    "name": "Return Airport Transfer",
    "type": "transfers",
    "description": "Transfer from Bangkok hotel to airport for your return flight.",
    "image": ""
  }
];

export const getActivityById = (id: string): Activity | undefined => {
  return activities.find(activity => activity.id === id);
};

export const getActivitiesByType = (type: Activity['type']): Activity[] => {
  return activities.filter(activity => activity.type === type);
};

export const getActivitiesByItenaryId = (itenaryId: string): Activity[] | undefined  => {
  return activities.filter(activity => itenaryId.includes(activity.itenaryId));
};

export const getActivitiesByItenaryIds = (itenaryIds: string[]): Activity[] | undefined  => {
  return activities.filter(activity => itenaryIds.includes(activity.itenaryId));
};

export const getActivitiesByPackageId = (packageId: string): Activity[]  | undefined  => {
  const itineraries = getPackageItinerary(packageId); // returns ItineraryDay[]
  const itineraryIds = itineraries.map((i: ItineraryDay) => i.id);
  return getActivitiesByItenaryIds(itineraryIds);
};