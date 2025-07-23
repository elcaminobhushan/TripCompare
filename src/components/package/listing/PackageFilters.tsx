import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterState {
  priceRange: [number, number];
  duration: [number, number];
  rating: number | null;
  travelTheme: string[];
  inclusions: string[];
}

interface PackageFiltersProps {
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: any) => void;
  onReset: () => void;
  expandedFilters: string[];
  onToggleFilter: (filter: string) => void;
}

const PackageFilters: React.FC<PackageFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  expandedFilters,
  onToggleFilter
}) => {
  const travelThemes = [
    'Full Moon Party', 
    'Flights Included', 
    'Group Tour', 
    'Thailand Highlights', 
    'Beaches', 
    'Cabaret', 
    'Culture',
    'Solo Travel',
    'Beach Parties',
    'Island Hopping',
    'Nightlife',
    'Indian Travelers',
    'Digital Nomads',
    'International Trips',
    'Adventure',
    'New Year Celebrations',
    'City + Beach',
    'Family Friendly'
  ];
  
  const inclusions = [
    'Return international flight',
    'Airport pick-up and drop',
    'accommodation',
    'Daily breakfast',
    'Indian lunches',
    'Phi Phi Island day trip',
    'Island tour',
    'Transfer',
    'Trip Captain',
    'Speedboat',
    'Simon Cabaret Show',
    'City Tour',
    'Safari World',
    'Marine Park',
    'Coral Island Tour',
    'Temple Tour',
    'Travel Insurance',
    'Entry fees',
    'Local guide'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-[144px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-base sm:text-lg">Filters</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Price Range */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6">
          <button
            className="flex items-center justify-between w-full mb-3 sm:mb-4"
            onClick={() => onToggleFilter('price')}
          >
            <span className="font-medium text-sm sm:text-base">Price Range</span>
            {expandedFilters.includes('price') ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {expandedFilters.includes('price') && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6">
          <button
            className="flex items-center justify-between w-full mb-3 sm:mb-4"
            onClick={() => onToggleFilter('duration')}
          >
            <span className="font-medium text-sm sm:text-base">Duration</span>
            {expandedFilters.includes('duration') ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {expandedFilters.includes('duration') && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.duration[0]} days</span>
                <span>{filters.duration[1]} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={filters.duration[1]}
                onChange={(e) => onFilterChange('duration', [filters.duration[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Travel Theme */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6">
          <button
            className="flex items-center justify-between w-full mb-3 sm:mb-4"
            onClick={() => onToggleFilter('theme')}
          >
            <span className="font-medium text-sm sm:text-base">Travel Theme</span>
            {expandedFilters.includes('theme') ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {expandedFilters.includes('theme') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {travelThemes.map((theme) => (
                <label key={theme} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                    checked={filters.travelTheme.includes(theme)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange('travelTheme', [...filters.travelTheme, theme]);
                      } else {
                        onFilterChange('travelTheme', filters.travelTheme.filter(t => t !== theme));
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{theme}</span>
                </label>
              ))}
            </div>
          )}
        </div>


        {/* Inclusions */}
        <div>
          <button
            className="flex items-center justify-between w-full mb-3 sm:mb-4"
            onClick={() => onToggleFilter('inclusions')}
          >
            <span className="font-medium text-sm sm:text-base">Inclusions</span>
            {expandedFilters.includes('inclusions') ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {expandedFilters.includes('inclusions') && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {inclusions.map((inclusion) => (
                <label key={inclusion} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300"
                    checked={filters.inclusions.includes(inclusion)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange('inclusions', [...filters.inclusions, inclusion]);
                      } else {
                        onFilterChange('inclusions', filters.inclusions.filter(i => i !== inclusion));
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{inclusion}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 sm:pt-4">
          <button
            onClick={onReset}
            className="btn-outline w-full py-2 text-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageFilters;