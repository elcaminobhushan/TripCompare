import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useContactForm() {
  return useMutation({
    mutationFn: (data: any) => apiClient.submitContactForm(data),
    onSuccess: () => {
      // Handle success (e.g., show success message)
    },
    onError: (error) => {
      // Handle error (e.g., show error message)
      console.error('Contact form submission failed:', error);
    },
  });
}