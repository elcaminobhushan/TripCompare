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
      name: "Hotel Breakfast",
      type: "breakfast",
      cuisine: "Continental/Thai",
      description: "Standard hotel breakfast including options like toast, eggs, fruits, and juices.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      dietary: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        halal: true,
        kosher: false
      },
      included: true
    },
    {
      id: "meal2",
      name: "Indian Lunch - Phi Phi Island Tour",
      type: "lunch",
      cuisine: "Indian",
      description: "Indian set lunch served at the beachside during the Phi Phi Island day tour.",
      image: "https://images.pexels.com/photos/1343501/pexels-photo-1343501.jpeg",
      dietary: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        halal: true,
        kosher: false
      },
      included: true
    },
    {
      id: "meal3",
      name: "Indian Lunch - 4 Island Tour",
      type: "lunch",
      cuisine: "Indian",
      description: "Fixed Indian lunch provided during the 4 Island Tour from Krabi.",
      image: "https://images.pexels.com/photos/5864728/pexels-photo-5864728.jpeg",
      dietary: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        halal: true,
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