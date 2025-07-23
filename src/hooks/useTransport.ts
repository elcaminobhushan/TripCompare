import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { transport as localTransport } from '../data/transport';

import type { Transport as TransportType } from '../types';

interface Transport {
  id: string;
  itenaryId: string;
  type: 'flight' | 'train' | 'bus' | 'boat' | 'car';
  name: string;
  source: string;
  destination: string;
  description: string;
}

export function useTransport() {
  const [data, setData] = useState<Transport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTransport() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localTransport);
          return;
        }
        
        const { data: transport, error } = await supabase
          .from('transport')
          .select('*');

        if (error) throw error;
        
        // Transform the data to match our Transport type
        const transformedTransport = transport.map(t => ({
          id: t.id,
          itenaryId: t.itenary_id || '',
          type: t.type,
          name: t.name,
          source : t.source,
          destination : t.destination,
          description: t.description
        }));

        setData(transformedTransport);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching transport:', err);
        // Fallback to local data on error
        setData(localTransport);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransport();
  }, []);

  return { data, isLoading, error };
}

export function useTransportByItineraryId(itenaryId: string) {
  const [data, setData] = useState<Transport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!itenaryId) return;

    async function fetchTransport() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const transport = localTransport.filter(t => 
            itenaryId.includes(t.itenaryId)
          );
          setData(transport);
          return;
        }
        
        const { data: transport, error } = await supabase
        .from('transport')
        .select('*')
        .ilike('itenary_id', `%${itenaryId}%`); // ✅ fixed spelling
      

        if (error) throw error;
        
        // Transform the data to match our Transport type
        const transformedTransport = transport.map(t => ({
          id: t.id,
          itenaryId: t.itenary_id || '',
          type: t.type,
          name: t.name,
          source : t.source,
          destination : t.destination,
          description: t.description
        }));

        setData(transformedTransport);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching transport:', err);
        // Fallback to local data on error
        const transport = localTransport.filter(t => 
          itenaryId.includes(t.itenaryId)
        );
        setData(transport);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransport();
  }, [itenaryId]);
  return { data: data as TransportType[], isLoading, error };
}

export function useTransportByItineraryIds(itineraryIds: string[]) {
  const [data, setData] = useState<TransportType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!itineraryIds || itineraryIds.length === 0) return;

    async function fetchTransport() {
      try {
        setIsLoading(true);

        // Local fallback
        if (!isSupabaseConnected()) {
          const filtered = localTransport.filter(t => itineraryIds.includes(t.itenaryId));
          setData(filtered);
          return;
        }

        const { data: transport, error } = await supabase
          .from('transport')
          .select('*')
          .in('itenary_id', itineraryIds); // ✅ use `.in()` for multiple IDs

        if (error) throw error;

        const transformed = transport.map(t => ({
          id: t.id,
          itenaryId: t.itenary_id || '',
          type: t.type,
          name: t.name,
          source: t.source,
          destination: t.destination,
          description: t.description,
        }));

        setData(transformed);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching transport:', err);

        const fallback = localTransport.filter(t => itineraryIds.includes(t.itenaryId));
        setData(fallback);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransport();
  }, [itineraryIds]);

  return { data, isLoading, error };
}