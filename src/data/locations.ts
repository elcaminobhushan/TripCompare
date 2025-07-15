export interface Location {
  id: string;
  name: string;
  type: 'city' | 'region' | 'resort-area' | 'landmark';
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image: string;
  parentLocationId?: string;
}

export const locations: Location[] = [
  {
    id: "loc1",
    name: "Nusa Dua",
    type: "resort-area",
    country: "Indonesia",
    coordinates: {
      latitude: -8.8008,
      longitude: 115.2317
    },
    description: "Luxury beach resort area in southern Bali known for pristine beaches and upscale hotels.",
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    parentLocationId: "d1" // Bali
  },
  {
    id: "loc2",
    name: "Zermatt",
    type: "city",
    country: "Switzerland",
    coordinates: {
      latitude: 46.0207,
      longitude: 7.7491
    },
    description: "Car-free mountain resort town with views of the iconic Matterhorn peak.",
    image: "https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg",
    parentLocationId: "d2" // Swiss Alps
  },
  {
    id: "loc3",
    name: "Gion District",
    type: "landmark",
    country: "Japan",
    coordinates: {
      latitude: 35.0037,
      longitude: 135.7757
    },
    description: "Historic geisha district in Kyoto with traditional architecture and tea houses.",
    image: "https://images.pexels.com/photos/5007442/pexels-photo-5007442.jpeg",
    parentLocationId: "d3" // Kyoto
  },
  {
  id: "loc4",
  name: "Bangkok",
  type: "city",
  country: "Thailand",
  coordinates: {
    latitude: 13.7563,
    longitude: 100.5018
  },
  description: "Thailand’s bustling capital known for ornate temples, vibrant street life, and rich cultural experiences.",
  image: "https://images.pexels.com/photos/2082181/pexels-photo-2082181.jpeg",
  parentLocationId: "d7" // Thailand
},
{
  id: "loc5",
  name: "Phuket",
  type: "island",
  country: "Thailand",
  coordinates: {
    latitude: 7.8804,
    longitude: 98.3923
  },
  description: "Thailand’s largest island famous for its beaches, water sports, and lively nightlife.",
  image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
  parentLocationId: "d7" // Thailand
}
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

export const getLocationsByParent = (parentId: string): Location[] => {
  return locations.filter(location => location.parentLocationId === parentId);
};