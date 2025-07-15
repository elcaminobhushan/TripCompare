// Temporarily disabled - requires @tanstack/react-query
// import { useMutation } from '@tanstack/react-query';
// import { apiClient } from '@/lib/api';

export function useContactForm() {
  // Temporarily disabled - requires @tanstack/react-query
  return {
    mutate: (data: any) => {
      console.log('Contact form submitted:', data);
      // Handle form submission here
    }
  };
}