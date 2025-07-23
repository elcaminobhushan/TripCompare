import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { accommodations as localAccommodations } from '../data/accommodations';
import type { Accommodation } from '../data/accommodations';

export function useAccommodations() {
  const [data, setData] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localAccommodations);
          return;
        }
        
        const { data: accommodations, error } = await supabase
          .from('accommodations')
          .select('*');

        if (error) throw error;
        
        // Transform the data to match our Accommodation type
        const transformedAccommodations = accommodations.map(acc => ({
          id: acc.id,
          itenaryId: acc.itenary_id || '',
          name: acc.name,
          rating: acc.rating,
          image: acc.image,
          location: acc.location,
          description: acc.description
        }));

        setData(transformedAccommodations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching accommodations:', err);
        // Fallback to local data on error
        setData(localAccommodations);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccommodations();
  }, []);

  return { data, isLoading, error };
}

export function useAccommodationsByItineraryId(itenaryId: string) {
  const [data, setData] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!itenaryId) return;

    async function fetchAccommodations() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const accommodations = localAccommodations.filter(acc => 
            itenaryId.includes(acc.itenaryId)
          );
          setData(accommodations);
          return;
        }
        
        const { data: accommodations, error } = await supabase
          .from('accommodations')
          .select('*')
          .ilike('itenary_id', `%${itenaryId}%`);

        if (error) throw error;
        
        // Transform the data to match our Accommodation type
        const transformedAccommodations = accommodations.map(acc => ({
          id: acc.id,
          itenaryId: acc.itenary_id || '',
          name: acc.name,
          rating: acc.rating,
          image: acc.image,
          location: acc.location,
          description: acc.description
        }));

        setData(transformedAccommodations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching accommodations:', err);
        // Fallback to local data on error
        const accommodations = localAccommodations.filter(acc => 
          itenaryId.includes(acc.itenaryId)
        );
        setData(accommodations);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccommodations();
  }, [itenaryId]);

  return { data, isLoading, error };
}

export function useAccommodationsByItineraryIds(itenaryIds: string[]) {
  const [data, setData] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!itenaryIds || itenaryIds.length === 0) return;
  
    async function fetchAccommodations() {
      try {
        setIsLoading(true);
  
        if (!isSupabaseConnected()) {
          const accommodations = localAccommodations.filter(acc =>
            itenaryIds.includes(acc.itenaryId)
          );
          setData(accommodations);
          return;
        }
  
        const { data: accommodations, error } = await supabase
          .from('accommodations')
          .select('*')
          .in('itenary_id', itenaryIds);
  
        if (error) throw error;
  
        const transformedAccommodations = accommodations.map(acc => ({
          id: acc.id,
          itenaryId: acc.itenary_id || '',
          name: acc.name,
          rating: acc.rating,
          image: acc.image,
          location: acc.location,
          description: acc.description,
        }));
  
        setData(transformedAccommodations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching accommodations:', err);
  
        const accommodations = localAccommodations.filter(acc =>
          itenaryIds.includes(acc.itenaryId)
        );
        setData(accommodations);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchAccommodations();
  }, [itenaryIds]);
  

  return { data, isLoading, error };
}