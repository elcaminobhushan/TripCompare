export interface ChatResponseData {
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
  package?: {
    packageId: string;
    itinerary: any[];
    accommodation: any;
    transport: any[];
    activities: any[];
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  response?: ChatResponseData;
  suggestions?: string[];
}