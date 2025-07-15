export interface Amenity {
  id: string;
  name: string;
  category: 'room' | 'property' | 'wellness' | 'dining' | 'recreation' | 'service';
  description: string;
  icon: string;
  image?: string;
}

export const amenities: Amenity[] = [
  {
    id: "amen1",
    name: "Infinity Pool",
    category: "recreation",
    description: "Beachfront infinity pool with panoramic ocean views.",
    icon: "pool",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
  },
  {
    id: "amen2",
    name: "Luxury Spa",
    category: "wellness",
    description: "Full-service spa offering traditional and modern treatments.",
    icon: "spa",
    image: "https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg"
  },
  {
    id: "amen3",
    name: "Fine Dining Restaurant",
    category: "dining",
    description: "Gourmet restaurant featuring local and international cuisine.",
    icon: "utensils",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
  },
  {
    id: "amen4",
    name: "24/7 Room Service",
    category: "service",
    description: "Round-the-clock in-room dining and services.",
    icon: "room-service",
  },
  {
    id: "amen5",
    name: "Fitness Center",
    category: "wellness",
    description: "State-of-the-art gym with personal training available.",
    icon: "dumbbell",
    image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
  }
];

export const getAmenityById = (id: string): Amenity | undefined => {
  return amenities.find(amenity => amenity.id === id);
};

export const getAmenitiesByCategory = (category: Amenity['category']): Amenity[] => {
  return amenities.filter(amenity => amenity.category === category);
};