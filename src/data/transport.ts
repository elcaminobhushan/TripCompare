import {getPackageItinerary} from './itineraries';
import { ItineraryDay } from './itineraries'; 

interface Transport {
  id: string;
  itenaryId : string;
  type: 'flight' | 'train' | 'bus' |'boat' | 'car';
  name: string;
  source: string;
  destination: string;
  description: string;
}

export const transport: Transport[] = [
    {
      id: "trans1",
      itenaryId : "itin1_d1",
      type: "flight",
      name: "International Flight",
      source: "Delhi",
      destination : "Krabi",
      description: "Round-trip international flight up to INR 25,000 included in the package"
    }
  
];

export const getTransportById = (id: string): Transport | undefined => {
  return transport.find(t => t.id === id);
};

export const getTransportByItenaryId = (itenaryId: string): Transport[] | undefined  => {
  return transport.filter(acc => itenaryId.includes(acc.itenaryId));
};

export const getTransportByItenaryIds = (itenaryIds: string[]): Transport[] | undefined  => {
  return transport.filter(acc => itenaryIds.includes(acc.itenaryId));
};

export const getTransportByPackageId = (packageId: string): Transport[]  | undefined  => {
  const itineraries = getPackageItinerary(packageId); // returns ItineraryDay[]
  const itineraryIds = itineraries.map((i: ItineraryDay) => i.id);
  return getTransportByItenaryIds(itineraryIds);
};
