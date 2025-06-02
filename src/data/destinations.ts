export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularMonths: string[];
  climate: string;
  languages: string[];
  currency: string;
  timeZone: string;
}

export const destinations: Destination[] = [
  {
    id: "d1",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    description: "Experience the Island of the Gods with its pristine beaches, vibrant culture, and spiritual retreats.",
    popularMonths: ["June", "July", "August", "September"],
    climate: "Tropical",
    languages: ["Indonesian", "Balinese"],
    currency: "Indonesian Rupiah (IDR)",
    timeZone: "UTC+8"
  },
  {
    id: "d2",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg",
    description: "Discover the breathtaking beauty of the Swiss Alps with world-class skiing and charming villages.",
    popularMonths: ["December", "January", "February", "March"],
    climate: "Alpine",
    languages: ["German", "French", "Italian", "Romansh"],
    currency: "Swiss Franc (CHF)",
    timeZone: "UTC+1"
  },
  {
    id: "d3",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.pexels.com/photos/5007442/pexels-photo-5007442.jpeg",
    description: "Immerse yourself in Japan's ancient capital with its temples, gardens, and traditional culture.",
    popularMonths: ["March", "April", "October", "November"],
    climate: "Temperate",
    languages: ["Japanese"],
    currency: "Japanese Yen (JPY)",
    timeZone: "UTC+9"
  },
  {
    id: "d4",
    name: "Santorini",
    country: "Greece",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
    description: "Explore the stunning white-washed buildings and crystal-clear waters of this iconic Greek island.",
    popularMonths: ["May", "June", "July", "August", "September"],
    climate: "Mediterranean",
    languages: ["Greek", "English"],
    currency: "Euro (EUR)",
    timeZone: "UTC+2"
  },
  {
    id: "d5",
    name: "Machu Picchu",
    country: "Peru",
    image: "https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg",
    description: "Discover the ancient Incan citadel set high in the Andes Mountains.",
    popularMonths: ["May", "June", "July", "August"],
    climate: "Highland",
    languages: ["Spanish", "Quechua"],
    currency: "Peruvian Sol (PEN)",
    timeZone: "UTC-5"
  },
  {
    id: "d6",
    name: "Maldives",
    country: "Maldives",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
    description: "Experience luxury and tranquility in overwater villas surrounded by turquoise lagoons.",
    popularMonths: ["December", "January", "February", "March"],
    climate: "Tropical",
    languages: ["Dhivehi", "English"],
    currency: "Maldivian Rufiyaa (MVR)",
    timeZone: "UTC+5"
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};