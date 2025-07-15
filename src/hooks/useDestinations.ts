// Temporarily disabled - requires @tanstack/react-query
// import { useQuery } from '@tanstack/react-query';
// import { apiClient } from '@/lib/api';

export function useDestinations() {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: [], isLoading: false, error: null };
}

export function useDestination(_id: string) {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: null, isLoading: false, error: null };
}

export function usePopularDestinations(_limit: number = 6) {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: [], isLoading: false, error: null };
}