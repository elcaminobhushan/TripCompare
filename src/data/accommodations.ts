export interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  amenities: string[];
  image: string;
  location: string;
  description: string;
}

export const accommodations: Accommodation[] = [
  {
    id: "acc1",
    name: "Oceanic Paradise Resort & Spa",
    type: "5-Star Resort",
    rating: 5,
    amenities: ["Beachfront", "Pool", "Spa", "4 Restaurants", "Bar", "Fitness Center"],
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    location: "Bali",
    description: "Luxury beachfront resort with world-class amenities and stunning ocean views."
  }
];

export const getAccommodationById = (id: string): Accommodation | undefined => {
  return accommodations.find(accommodation => accommodation.id === id);
};