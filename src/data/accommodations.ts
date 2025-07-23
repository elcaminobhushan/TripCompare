import {getPackageItinerary} from './itineraries';
import { ItineraryDay } from './itineraries';

export interface Accommodation {
  id: string;
  itenaryId: string;
  name: string;
  rating: number;
  image: string;
  location: string;
  description: string;
}

export const accommodations: Accommodation[] = [
  {
    id: "acc1",
    itenaryId : "itin1_d1",
    name: "Oceanic Paradise Resort & Spa",
    rating: 4,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    location: "Bali",
    description: "Luxury beachfront resort with world-class amenities and stunning ocean views."
  },
  {
    id: "acc2",
    itenaryId : "itin1_d2",
    name: "Oceanic Paradise Resort & Spa",
    rating: 3,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    location: "Bali",
    description: "Luxury beachfront resort with world-class amenities and stunning ocean views."
  }
];

export const getAccommodationById = (id: string): Accommodation | undefined => {
  return accommodations.find(accommodation => accommodation.id === id);
};


export const getAccommodationByItenaryId = (itenaryId: string): Accommodation[] | undefined  => {
  return accommodations.filter(acc => itenaryId.includes(acc.itenaryId));
};

export const getAccommodationByItenaryIds = (itenaryIds: string[]): Accommodation[] | undefined  => {
  return accommodations.filter(acc => itenaryIds.includes(acc.itenaryId));
};

export const getAccommodationByPackageId = (packageId: string): Accommodation[]  | undefined  => {
  const itineraries = getPackageItinerary(packageId); // returns ItineraryDay[]
  const itineraryIds = itineraries.map((i: ItineraryDay) => i.id);
  return getAccommodationByItenaryIds(itineraryIds);
};
