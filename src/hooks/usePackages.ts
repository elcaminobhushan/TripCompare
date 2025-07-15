// Temporarily disabled - requires @tanstack/react-query
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { apiClient } from '@/lib/api';

export function usePackages() {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: [], isLoading: false, error: null };
}

export function usePackage(_id: string) {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: null, isLoading: false, error: null };
}

export function useRelatedPackages(_id: string, _limit: number = 3) {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: [], isLoading: false, error: null };
}

export function useFilteredPackages(_filters: any) {
  // Temporarily disabled - requires @tanstack/react-query
  return { data: [], isLoading: false, error: null };
}