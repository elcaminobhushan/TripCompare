import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { tourOperators as localTourOperators } from '../data/tour-operators';
import type { TourOperator } from '../data/tour-operators';

export function useTourOperators() {
  const [data, setData] = useState<TourOperator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTourOperators() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localTourOperators);
          return;
        }
        
        const { data: operators, error } = await supabase
          .from('tour_operators')
          .select('*');

        if (error) throw error;
        
        // Transform the data to match our TourOperator type
        const transformedOperators = operators.map(op => ({
          id: op.id,
          name: op.name,
          logo: op.logo,
          contactInfo: op.contact_info || '',
          description: op.description,
          rating: op.rating,
          reviews: op.reviews,
          yearsInBusiness: op.years_in_business,
          specializations: op.specializations,
          certifications: op.certifications
        }));

          setData(transformedOperators);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching tour operators:', err);
        // Fallback to local data on error
        setData(localTourOperators);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTourOperators();
  }, []);

  return { data, isLoading, error };
}

export function useTourOperator(id: string) {
  const [data, setData] = useState<TourOperator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchTourOperator() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const operator = localTourOperators.find(op => op.id === id);
          if (operator) {
            setData(operator);
          }
          return;
        }
        
        const { data: operator, error } = await supabase
          .from('tour_operators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our TourOperator type
        const transformedOperator = {
          id: operator.id,
          name: operator.name,
          logo: operator.logo,
          contactInfo: operator.contact_info || '',
          description: operator.description,
          rating: operator.rating,
          reviews: operator.reviews,
          yearsInBusiness: operator.years_in_business,
          specializations: operator.specializations,
          certifications: operator.certifications
        };

        setData(transformedOperator);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching tour operator:', err);
        // Fallback to local data on error
        const operator = localTourOperators.find(op => op.id === id);
        if (operator) {
          setData(operator);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTourOperator();
  }, [id]);

  return { data, isLoading, error };
}