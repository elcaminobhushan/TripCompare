export interface ChatResponseTemplate {
  type: 'composite' | 'text' | 'comparison' | 'image-grid' | 'table';
  content: string;
  data?: {
    text?: string;
    images?: {
      url: string;
      caption: string;
    }[];
    table?: {
      headers: string[];
      rows: (string | number)[][];
    };
    icons?: {
      name: string;
      color: string;
      text?: string;
    }[];
  };
}

export const chatResponses: Record<string, ChatResponseTemplate> = {
  default: {
    type: "composite",
    content: "I've found a perfect package for you:",
    data: {
      text: "Based on your preferences, I recommend this exclusive package that offers great value and experiences.",
      icons: [
        { name: "beach", color: "blue", text: "Premium Location" },
        { name: "spa", color: "purple", text: "Luxury Amenities" },
        { name: "restaurant", color: "orange", text: "Gourmet Dining" }
      ],
      table: {
        headers: ["Feature", "Details", "Rating"],
        rows: [
          ["Package Type", "Luxury", "⭐⭐⭐⭐⭐"],
          ["Duration", "5 days", "⭐⭐⭐⭐"],
          ["Activities", "8 included", "⭐⭐⭐⭐⭐"],
          ["Value", "Excellent", "⭐⭐⭐⭐"]
        ]
      },
      images: [
        {
          url: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
          caption: "Beachfront Resort"
        },
        {
          url: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
          caption: "Luxury Suite"
        },
        {
          url: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
          caption: "Exclusive Activities"
        }
      ]
    }
  },
  
  packageRecommendation: {
    type: "composite",
    content: "Here's a package I think you'll love:",
    data: {
      text: "I've selected this package based on your preferences. It offers an excellent combination of luxury, activities, and value.",
      icons: [
        { name: "beach", color: "blue", text: "Location" },
        { name: "spa", color: "purple", text: "Amenities" },
        { name: "restaurant", color: "orange", text: "Dining" }
      ]
    }
  },
  
  comparison: {
    type: "composite",
    content: "Let's compare the key features:",
    data: {
      text: "Here's how this package stands out:",
      table: {
        headers: ["Feature", "Details", "Comparison"],
        rows: [
          ["Price", "Best in class", "⭐⭐⭐⭐⭐"],
          ["Location", "Prime spot", "⭐⭐⭐⭐"],
          ["Amenities", "Full luxury", "⭐⭐⭐⭐⭐"],
          ["Activities", "Comprehensive", "⭐⭐⭐⭐"]
        ]
      }
    }
  }
};