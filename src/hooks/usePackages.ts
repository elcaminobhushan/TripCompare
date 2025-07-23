import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import type { Package } from '../types';
import { packages as localPackages } from '../data/packages';
import { dataCache } from '../lib/cache';

// ✅ Utility to transform DB package into frontend-friendly type
const transformPackage = (pkg: any): Package => ({
  id: pkg.id,
  title: pkg.title,
  destinationId: pkg.destination_id,
  mainImage: pkg.main_image,
  images: pkg.images,
  price: pkg.price,
  currency: pkg.currency,
  duration_days: pkg.duration_days,
  duration_nights: pkg.duration_nights,
  description: pkg.description,
  tourOperatorId: pkg.tour_operator_id,
  inclusions: (pkg.inclusions ?? []).map((i: any) => i.description),
  exclusions: (pkg.exclusions ?? []).map((e: any) => e.description),
  featured: pkg.featured,
  discount: pkg.discount,
  departureLocations: pkg.departureLocations,
  itineraryPdf: pkg.itineraryPdf,
  meal: pkg.meal,
  tags: pkg.tags
});

export function usePackages() {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setIsLoading(true);
        
        // Check cache first
        const cacheKey = 'packages_all';
        const cachedData = dataCache.get<Package[]>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }
        
        if (!isSupabaseConnected()) {
          setData(localPackages);
          dataCache.set(cacheKey, localPackages);
          setIsLoading(false);
          return;
        }

        const { data: packages, error } = await supabase.from('packages').select('*');
        if (error) throw error;
        const transformed = packages.map(transformPackage);
        setData(transformed);
        dataCache.set(cacheKey, transformed);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(localPackages);
        dataCache.set('packages_all', localPackages);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return { data, isLoading, error };
}


export function usePackage(id: string) {
  const [data, setData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchPackage() {
      try {
        setIsLoading(true);
        
        // Check cache first
        const cacheKey = `package_${id}`;
        const cachedData = dataCache.get<Package>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }
        
        if (!isSupabaseConnected()) {
          const pkg = localPackages.find(p => p.id === id);
          setData(pkg || null);
          if (pkg) dataCache.set(cacheKey, pkg);
          setIsLoading(false);
          return;
        }

        const { data: pkg, error } = await supabase
          .from('packages')
          .select(`
            *
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setData(transformPackage(pkg));
        dataCache.set(cacheKey, transformPackage(pkg));
      } catch (err) {
        console.error('Error fetching package:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        const fallbackPkg = localPackages.find(p => p.id === id);
        if (fallbackPkg) {
          setData(fallbackPkg);
          dataCache.set(`package_${id}`, fallbackPkg);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackage();
  }, [id]);

  return { data, isLoading, error };
}

export function useRelatedPackages(id: string, limit = 3) {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelatedPackages() {
      try {
        setIsLoading(true);
        
        // Check cache first
        const cacheKey = `related_packages_${id}_${limit}`;
        const cachedData = dataCache.get<Package[]>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }

        const { data: current, error: err1 } = await supabase
          .from('packages')
          .select('destination_id')
          .eq('id', id)
          .single();

        if (err1) throw err1;

        const { data: related, error: err2 } = await supabase
          .from('packages')
          .select(`
            *
          `)
          .eq('destination_id', current.destination_id)
          .neq('id', id)
          .limit(limit);

        if (err2) throw err2;

        const transformed = related.map(transformPackage);
        setData(transformed);
        dataCache.set(cacheKey, transformed);
      } catch (err) {
        console.error('Error fetching related packages:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Fallback to local data
        const currentPkg = localPackages.find(p => p.id === id);
        if (currentPkg) {
          const related = localPackages
            .filter(p => p.id !== id && p.destinationId === currentPkg.destinationId)
            .slice(0, limit);
          setData(related);
          dataCache.set(`related_packages_${id}_${limit}`, related);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchRelatedPackages();
    }
  }, [id, limit]);

  return { data, isLoading, error };
}

export function useFilteredPackages(filters: any) {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFilteredPackages() {
      try {
        setIsLoading(true);

        let query = supabase
          .from('packages')
          .select(`
            *
          `);

        if (filters.priceRange) {
          query = query
            .gte('price', filters.priceRange[0])
            .lte('price', filters.priceRange[1]);
        }

        if (filters.duration) {
          query = query
            .gte('duration_days', filters.duration[0])
            .lte('duration_days', filters.duration[1]);
        }

        if (filters.rating) {
          query = query.gte('rating', filters.rating);
        }

        if (filters.destinationId) {
          query = query.eq('destination_id', filters.destinationId);
        }

        const { data: result, error } = await query;
        if (error) throw error;

        const transformed = result.map(transformPackage);
        setData(transformed);
      } catch (err) {
        console.error('Error fetching filtered packages:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilteredPackages();
  }, [filters]);

  return { data, isLoading, error };
}
