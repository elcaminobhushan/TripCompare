import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Package } from '@/types';

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => apiClient.getPackages(),
  });
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => apiClient.getPackageById(id),
    enabled: !!id,
  });
}

export function useRelatedPackages(id: string, limit: number = 3) {
  return useQuery({
    queryKey: ['relatedPackages', id],
    queryFn: async () => {
      const { data } = await apiClient.getPackages();
      const currentPackage = data.find((pkg: Package) => pkg.id === id);
      if (!currentPackage) return [];
      
      return data
        .filter((pkg: Package) => 
          pkg.id !== id && pkg.destination === currentPackage.destination
        )
        .slice(0, limit);
    },
    enabled: !!id,
  });
}

export function useFilteredPackages(filters: any) {
  return useQuery({
    queryKey: ['packages', filters],
    queryFn: async () => {
      const { data } = await apiClient.getPackages();
      return data.filter((pkg: Package) => {
        // Apply filters
        if (filters.destination && !pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
          return false;
        }
        if (filters.priceRange && (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1])) {
          return false;
        }
        if (filters.duration && (pkg.duration < filters.duration[0] || pkg.duration > filters.duration[1])) {
          return false;
        }
        if (filters.rating && pkg.rating < filters.rating) {
          return false;
        }
        if (filters.amenities?.length && !filters.amenities.every((amenity: string) => pkg.amenities.includes(amenity))) {
          return false;
        }
        return true;
      });
    },
  });
}