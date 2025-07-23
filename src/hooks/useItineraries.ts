import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { itineraries as localItineraries } from '../data/itineraries';
import type { ItineraryDay } from '../data/itineraries';

export function useItineraries() {
  const [data, setData] = useState<ItineraryDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchItineraries() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localItineraries);
          return;
        }
        
        const { data: itineraries, error } = await supabase
          .from('itinerary_days')
          .select('*')
          .order('day', { ascending: true });

        if (error) throw error;
        
        // Transform the data to match our ItineraryDay type
        const transformedItineraries = itineraries.map(day => ({
          id: day.id,
          packageId: day.package_id,
          day: day.day,
          title: day.title,
          description: day.description,
          notes: day.notes
        }));

        setData(transformedItineraries);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching itineraries:', err);
        // Fallback to local data on error
        setData(localItineraries);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItineraries();
  }, []);

  return { data, isLoading, error };
}

export function usePackageItinerary(packageId: string) {
  const [data, setData] = useState<ItineraryDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!packageId) return;

    async function fetchPackageItinerary() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const itinerary = localItineraries
            .filter(day => day.packageId === packageId)
            .sort((a, b) => a.day - b.day);
          setData(itinerary);
          return;
        }
        
        const { data: itinerary, error } = await supabase
          .from('itinerary_days')
          .select('*')
          .eq('package_id', packageId)
          .order('day', { ascending: true });

        if (error) throw error;
        
        // Transform the data to match our ItineraryDay type
        const transformedItinerary = itinerary.map(day => ({
          id: day.id,
          packageId: day.package_id,
          day: day.day,
          title: day.title,
          description: day.description,
          notes: day.notes
        }));

        setData(transformedItinerary);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching package itinerary:', err);
        // Fallback to local data on error
        const itinerary = localItineraries
          .filter(day => day.packageId === packageId)
          .sort((a, b) => a.day - b.day);
        setData(itinerary);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackageItinerary();
  }, [packageId]);

  return { data, isLoading, error };
}

export function useItineraryDay(packageId: string, day: number) {
  const [data, setData] = useState<ItineraryDay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!packageId || !day) return;

    async function fetchItineraryDay() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const itineraryDay = localItineraries.find(
            item => item.packageId === packageId && item.day === day
          );
          setData(itineraryDay || null);
          return;
        }
        
        const { data: itineraryDay, error } = await supabase
          .from('itinerary_days')
          .select('*')
          .eq('package_id', packageId)
          .eq('day', day)
          .single();

        if (error) throw error;
        
        // Transform the data to match our ItineraryDay type
        const transformedDay = {
          id: itineraryDay.id,
          packageId: itineraryDay.package_id,
          day: itineraryDay.day,
          title: itineraryDay.title,
          description: itineraryDay.description,
          notes: itineraryDay.notes
        };

        setData(transformedDay);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching itinerary day:', err);
        // Fallback to local data on error
        const itineraryDay = localItineraries.find(
          item => item.packageId === packageId && item.day === day
        );
        setData(itineraryDay || null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItineraryDay();
  }, [packageId, day]);

  return { data, isLoading, error };
}