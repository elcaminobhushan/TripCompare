export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: string;
  description: string;
  image: string;
  dietary?: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
    kosher: boolean;
  };
  included: boolean;
  price?: number;
}

export const meals: Meal[] = [
  {
    id: "meal1",
    name: "International Breakfast Buffet",
    type: "breakfast",
    cuisine: "International",
    description: "Extensive buffet featuring both Western and local breakfast options.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      halal: true,
      kosher: false
    },
    included: true
  },
  {
    id: "meal2",
    name: "Alpine Fondue Dinner",
    type: "dinner",
    cuisine: "Swiss",
    description: "Traditional Swiss cheese fondue with bread and vegetables.",
    image: "https://images.pexels.com/photos/3649208/pexels-photo-3649208.jpeg",
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      halal: false,
      kosher: false
    },
    included: true
  },
  {
    id: "meal3",
    name: "Traditional Japanese Kaiseki",
    type: "dinner",
    cuisine: "Japanese",
    description: "Multi-course traditional Japanese dinner.",
    image: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      halal: false,
      kosher: false
    },
    included: true
  }
];

export const getMealById = (id: string): Meal | undefined => {
  return meals.find(meal => meal.id === id);
};

export const getMealsByType = (type: Meal['type']): Meal[] => {
  return meals.filter(meal => meal.type === type);
};