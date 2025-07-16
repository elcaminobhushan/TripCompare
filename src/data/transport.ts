interface Transport {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'ferry' | 'boat' | 'van' | 'car';
  name: string;
  description: string;
}

const transport: Transport[] = [
    {
      id: "trans1",
      type: "flight",
      name: "International Flight",
      description: "Round-trip international flight up to INR 25,000 included in the package"
    },
    {
      id: "trans2",
      type: "boat",
      name: "Phi Phi Island Speedboat",
      description: "Speedboat transfer for Phi Phi Island day tour"
    },
    {
      id: "trans3",
      type: "bus",
      name: "Phuket City Sightseeing Bus",
      description: "Shared transfer for half-day Phuket city tour including major landmarks"
    },
    {
      id: "trans4",
      type: "ferry",
      name: "Phuket to Koh Samui Ferry + Van",
      description: "Shared van and ferry transport from Phuket to Koh Samui"
    },
    {
      id: "trans5",
      type: "boat",
      name: "Koh Samui to Koh Phangan Speedboat",
      description: "Round-trip speedboat for Full Moon Party between Koh Samui and Koh Phangan"
    },
    {
      id: "trans6",
      type: "ferry",
      name: "Koh Samui to Krabi Transfer",
      description: "Ferry and van transfer from Koh Samui to Krabi"
    },
    {
      id: "trans7",
      type: "boat",
      name: "Krabi Four Island Speedboat",
      description: "Full-day speedboat island hopping tour from Krabi"
    },
    {
      id: "trans8",
      type: "van",
      name: "Krabi to Phuket Airport Transfer",
      description: "Private/shared road transfer from Krabi hotel to Phuket Airport"
    },
    {
      "id": "trans9",
      "type": "van",
      "name": "Phuket Airport to Krabi Transfer",
      "description": "Scenic 3-hour road transfer from Phuket Airport to Krabi hotel"
    },
    {
      "id": "trans10",
      "type": "van",
      "name": "Krabi to Phuket Hotel Transfer",
      "description": "Private/shared van transfer from Krabi to your hotel in Phuket"
    },
    {
      "id": "trans11",
      "type": "car",
      "name": "Pattaya to Bangkok Transfer",
      "description": "Private or SIC transfer from Pattaya hotel to Bangkok hotel"
    },
    {
      "id": "trans12",
      "type": "bus",
      "name": "Safari World SIC Bus",
      "description": "Shared bus transfer for full-day Safari World and Marine Park tour"
    },
    {
    "id": "trans21",
    "type": "flight",
    "name": "Bangkok to Krabi Flight",
    "description": "Domestic flight transfer from Bangkok to Krabi."
  },
  {
    "id": "trans22",
    "type": "car",
    "name": "Bangkok Airport to Hotel",
    "description": "Private transfer from Bangkok airport to your hotel."
  },
  {
    "id": "trans23",
    "type": "car",
    "name": "Bangkok Hotel to Airport",
    "description": "Private transfer from Bangkok hotel to the airport."
  },
  {
    "id": "trans24",
    "type": "car",
    "name": "Krabi Airport to Hotel",
    "description": "Private road transfer from Krabi airport to your hotel."
  },
  {
    "id": "trans25",
    "type": "car",
    "name": "Krabi to Phuket Hotel Transfer",
    "description": "Private transfer between Krabi and your Phuket hotel."
  },
  {
    "id": "trans26",
    "type": "car",
    "name": "Phuket Hotel to Airport",
    "description": "Private transfer from your Phuket hotel to the airport."
  },
  {
    "id": "trans27",
    "type": "boat",
    "name": "4 Island Tour Boat",
    "description": "Speedboat or long tail boat used for the 4 island tour from Krabi."
  },
  {
    "id": "trans28",
    "type": "boat",
    "name": "Phi Phi Island Boat Tour",
    "description": "Speedboat or big boat used for the Phi Phi island tour from Phuket."
  }
  
];

export const getTransportById = (id: string): Transport | undefined => {
  return transport.find(t => t.id === id);
};