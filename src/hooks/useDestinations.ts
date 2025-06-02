import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useDestinations() {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: () => apiClient.getDestinations(),
  });
}

export function useDestination(id: string) {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: () => apiClient.getDestinationById(id),
    enabled: !!id,
  });
}

export function usePopularDestinations(limit: number = 6) {
  return useQuery({
    queryKey: ['popularDestinations'],
    queryFn: async () => {
      const { data } = await apiClient.getDestinations();
      return data.slice(0, limit);
    },
  });
}