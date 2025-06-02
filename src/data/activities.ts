export interface Activity {
  id: string;
  name: string;
  type: 'adventure' | 'cultural' | 'relaxation' | 'sightseeing' | 'water-sports' | 'winter-sports';
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
    id: "act1",
    name: "Sunrise Yoga Session",
    type: "relaxation",
    description: "Start your day with a rejuvenating yoga session on the beach.",
    duration: 1.5,
    difficulty: "easy",
    image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg",
    included: true,
    minimumAge: 12,
    equipment: ["Yoga mat", "Water bottle"]
  },
  {
    id: "act2",
    name: "Guided Ski Lesson",
    type: "winter-sports",
    description: "Professional ski instruction for all skill levels.",
    duration: 3,
    difficulty: "moderate",
    image: "https://images.pexels.com/photos/257961/pexels-photo-257961.jpeg",
    included: true,
    minimumAge: 8,
    maximumParticipants: 8,
    equipment: ["Skis", "Boots", "Poles", "Helmet"]
  },
  {
    id: "act3",
    name: "Traditional Tea Ceremony",
    type: "cultural",
    description: "Experience the ancient art of Japanese tea ceremony.",
    duration: 2,
    difficulty: "easy",
    image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg",
    included: true,
    minimumAge: 10,
    maximumParticipants: 6
  }
];

export const getActivityById = (id: string): Activity | undefined => {
  return activities.find(activity => activity.id === id);
};

export const getActivitiesByType = (type: Activity['type']): Activity[] => {
  return activities.filter(activity => activity.type === type);
};