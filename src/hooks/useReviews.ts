import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import { reviews as localReviews } from '../data/reviews';
import type { PackageReview } from '../data/reviews';

export function useReviews() {
  const [data, setData] = useState<PackageReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localReviews);
          return;
        }
        
        const { data: reviews, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our PackageReview type
        const transformedReviews = reviews.map(review => ({
          id: review.id,
          packageId: review.package_id,
          userId: review.user_id,
          rating: review.rating,
          title: review.title,
          content: review.content,
          date: review.date,
          likes: review.likes,
          verified: review.verified,
          imageIds: review.image_ids || undefined,
          response: review.response || undefined
        }));

        setData(transformedReviews);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching reviews:', err);
        // Fallback to local data on error
        setData(localReviews);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return { data, isLoading, error };
}

export function usePackageReviews(packageId: string) {
  const [data, setData] = useState<PackageReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!packageId) return;

    async function fetchPackageReviews() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const packageReviews = localReviews.filter(review => review.packageId === packageId);
          setData(packageReviews);
          return;
        }
        
        const { data: reviews, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('package_id', packageId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform the data to match our PackageReview type
        const transformedReviews = reviews.map(review => ({
          id: review.id,
          packageId: review.package_id,
          userId: review.user_id,
          rating: review.rating,
          title: review.title,
          content: review.content,
          date: review.date,
          likes: review.likes,
          verified: review.verified,
          imageIds: review.image_ids || undefined,
          response: review.response || undefined
        }));

        setData(transformedReviews);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching package reviews:', err);
        // Fallback to local data on error
        const packageReviews = localReviews.filter(review => review.packageId === packageId);
        setData(packageReviews);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackageReviews();
  }, [packageId]);

  return { data, isLoading, error };
}

export function usePackageRating(packageId: string) {
  const [data, setData] = useState<{ rating: number; count: number }>({ rating: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!packageId) return;

    async function fetchPackageRating() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const packageReviews = localReviews.filter(review => review.packageId === packageId);
          const totalRating = packageReviews.reduce((sum, review) => sum + review.rating, 0);
          const rating = packageReviews.length > 0 ? totalRating / packageReviews.length : 0;
          setData({ rating, count: packageReviews.length });
          return;
        }
        
        const { data: reviews, error } = await supabase
          .from('reviews')
          .select('rating')
          .eq('package_id', packageId);

        if (error) throw error;
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const rating = reviews.length > 0 ? totalRating / reviews.length : 0;
        
        setData({ rating, count: reviews.length });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching package rating:', err);
        // Fallback to local data on error
        const packageReviews = localReviews.filter(review => review.packageId === packageId);
        const totalRating = packageReviews.reduce((sum, review) => sum + review.rating, 0);
        const rating = packageReviews.length > 0 ? totalRating / packageReviews.length : 0;
        setData({ rating, count: packageReviews.length });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackageRating();
  }, [packageId]);

  return { data, isLoading, error };
}