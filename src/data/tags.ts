export interface Tag {
  id: string;
  name: string;
  category: 'experience' | 'amenity' | 'feature' | 'theme';
  icon?: string;
}

export const tags: Tag[] = [
  // Experience Tags
  {
    id: "tag1",
    name: "Beach",
    category: "experience",
    icon: "umbrella"
  },
  {
    id: "tag2",
    name: "Adventure",
    category: "experience",
    icon: "mountain"
  },
  {
    id: "tag3",
    name: "Cultural",
    category: "experience",
    icon: "landmark"
  },
  
  // Amenity Tags
  {
    id: "tag4",
    name: "Pool",
    category: "amenity",
    icon: "pool"
  },
  {
    id: "tag5",
    name: "Spa",
    category: "amenity",
    icon: "spa"
  },
  {
    id: "tag6",
    name: "WiFi",
    category: "amenity",
    icon: "wifi"
  },
  
  // Feature Tags
  {
    id: "tag7",
    name: "All-Inclusive",
    category: "feature",
    icon: "check-circle"
  },
  {
    id: "tag8",
    name: "Family-Friendly",
    category: "feature",
    icon: "users"
  },
  {
    id: "tag9",
    name: "Adults-Only",
    category: "feature",
    icon: "user"
  },
  
  // Theme Tags
  {
    id: "tag10",
    name: "Honeymoon",
    category: "theme",
    icon: "heart"
  },
  {
    id: "tag11",
    name: "Luxury",
    category: "theme",
    icon: "star"
  },
  {
    id: "tag12",
    name: "Eco-Friendly",
    category: "theme",
    icon: "leaf"
  }
];

export const getTagsByCategory = (category: Tag['category']): Tag[] => {
  return tags.filter(tag => tag.category === category);
};

export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id);
};