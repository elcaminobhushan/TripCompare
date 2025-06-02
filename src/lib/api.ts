import axios from 'axios';
import { Package, Destination } from '@/types';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// API error type
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// API endpoints
export const endpoints = {
  packages: '/packages',
  destinations: '/destinations',
  bookings: '/bookings',
  user: '/user',
} as const;

// API functions
export const apiClient = {
  // Packages
  async getPackages(): Promise<ApiResponse<Package[]>> {
    try {
      const response = await api.get(endpoints.packages);
      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch packages');
    }
  },

  async getPackageById(id: string): Promise<ApiResponse<Package>> {
    try {
      const response = await api.get(`${endpoints.packages}/${id}`);
      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Package not found');
    }
  },

  // Destinations
  async getDestinations(): Promise<ApiResponse<Destination[]>> {
    try {
      const response = await api.get(endpoints.destinations);
      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch destinations');
    }
  },

  async getDestinationById(id: string): Promise<ApiResponse<Destination>> {
    try {
      const response = await api.get(`${endpoints.destinations}/${id}`);
      return response.data;
    } catch (error) {
      throw new ApiError(404, 'Destination not found');
    }
  },

  // Bookings
  async createBooking(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await api.post(endpoints.bookings, data);
      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Failed to create booking');
    }
  },

  // Contact form
  async submitContactForm(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await api.post('/contact', data);
      return response.data;
    } catch (error) {
      throw new ApiError(500, 'Failed to submit form');
    }
  },
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;