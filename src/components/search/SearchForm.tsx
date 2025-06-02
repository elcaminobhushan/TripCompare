import React, { useState } from 'react';
import { Search, Sparkles, Globe, Navigation } from 'lucide-react';
import { destinations } from '../../data/destinations';

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
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated AI recommendations
  const aiRecommendations = [
    { name: "Bali", reason: "Based on your interest in beach destinations" },
    { name: "Swiss Alps", reason: "Matches your adventure travel preferences" },
    { name: "Kyoto", reason: "Aligns with your cultural exploration history" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination
    });
  };

  const handleAIRecommend = () => {
    setIsLoading(true);
    setShowAIRecommendations(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
            <button
              type="button"
              onClick={handleAIRecommend}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              AI Recommend
            </button>
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

      {/* AI Recommendations */}
      {showAIRecommendations && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <h3 className="font-medium">AI Recommendations</h3>
              </div>
              <div className="space-y-2">
                {aiRecommendations.map((rec, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDestination(rec.name);
                      setShowAIRecommendations(false);
                    }}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="font-medium">{rec.name}</div>
                    <div className="text-sm text-gray-600">{rec.reason}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;