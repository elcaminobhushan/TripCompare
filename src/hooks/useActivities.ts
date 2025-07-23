import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { activities as localActivities } from '../data/activities';
import type { Activity } from '../data/activities';

export function useActivities() {
  const [data, setData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localActivities);
          return;
        }
        
        const { data: activities, error } = await supabase
          .from('activities')
          .select('*');

        if (error) throw error;
        
        // Transform the data to match our Activity type
        const transformedActivities = activities.map(act => ({
          id: act.id,
          itenaryId: act.itenary_id || '',
          name: act.name,
          type: act.type,
          description: act.description,
          image: act.image
        }));

        setData(transformedActivities);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching activities:', err);
        // Fallback to local data on error
        setData(localActivities);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return { data, isLoading, error };
}

export function useActivitiesByItineraryId(itenaryId: string) {
  const [data, setData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!itenaryId) return;

    async function fetchActivities() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const activities = localActivities.filter(act => 
            itenaryId.includes(act.itenaryId)
          );
          setData(activities);
          return;
        }
        
        const { data: activities, error } = await supabase
          .from('activities')
          .select('*')
          .ilike('itenary_id', `%${itenaryId}%`);

        if (error) throw error;
        
        // Transform the data to match our Activity type
        const transformedActivities = activities.map(act => ({
          id: act.id,
          itenaryId: act.itenary_id || '',
          name: act.name,
          type: act.type,
          description: act.description,
          image: act.image
        }));

        setData(transformedActivities);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching activities:', err);
        // Fallback to local data on error
        const activities = localActivities.filter(act => 
          itenaryId.includes(act.itenaryId)
        );
        setData(activities);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, [itenaryId]);

  return { data, isLoading, error };
}