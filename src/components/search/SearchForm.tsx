import React, { useState } from 'react';
import { Search, Globe, Navigation } from 'lucide-react';
import { useDestinations } from '@/hooks/useDestinations';

interface SearchFormProps {
  onSearch: (searchParams: any) => void;
  className?: string;
  isCompact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  className = '',
  isCompact = false 
}) => {
  const [destination, setDestination] = useState('');

  const { data: destinations, error } = useDestinations();
if (error) return <p>Error loading destinations</p>;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination
    });
  };

  return (
    <div className="relative">
      <form 
        onSubmit={handleSubmit}
        className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg ${isCompact ? 'p-4' : 'p-6'} ${className} border border-gray-100`}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary-600" />
              Find Your Dream Destination
            </label>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="input pl-10 w-full appearance-none bg-gray-50/50 backdrop-blur-sm border-gray-200 focus:border-primary-300 h-12 text-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="" disabled>Where would you like to go?</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.name}>
                  {dest.name}, {dest.country}
                </option>
              ))}
            </select>
            <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className={`${isCompact ? 'mt-4 flex justify-end' : 'mt-6 text-center'}`}>
          <button 
            type="submit"
            className={`btn-primary ${isCompact ? 'px-6' : 'w-full px-8 py-3 text-lg'} transition-all duration-300 hover:scale-102 hover:shadow-lg`}
          >
            <Search className="h-5 w-5 mr-2" />
            Discover Packages
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;