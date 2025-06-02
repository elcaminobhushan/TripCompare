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
  },
  {
    id: "acc2",
    name: "Alpine Lodge Zermatt",
    type: "4-Star Mountain Chalet",
    rating: 4.5,
    amenities: ["Ski-in/Ski-out", "Sauna", "Hot Tub", "Restaurant", "Bar", "Boot Warmers"],
    image: "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
    location: "Swiss Alps",
    description: "Traditional Swiss chalet with modern amenities and direct access to ski slopes."
  },
  {
    id: "acc3",
    name: "Kyoto Traditional Inn",
    type: "Luxury Ryokan",
    rating: 4.8,
    amenities: ["Onsen", "Tea Ceremony Room", "Garden", "Traditional Dining", "Meditation Space"],
    image: "https://images.pexels.com/photos/2624031/pexels-photo-2624031.jpeg",
    location: "Kyoto",
    description: "Authentic Japanese ryokan offering traditional hospitality and cultural experiences."
  }
];

export const getAccommodationById = (id: string): Accommodation | undefined => {
  return accommodations.find(accommodation => accommodation.id === id);
};