import React, { useState } from 'react';
import { Star, DollarSign, Clock } from 'lucide-react';

// Common amenities for filters
const amenities = [
  'Pool',
  'Spa',
  'Free WiFi',
  'All-Inclusive',
  'Airport Transfer',
  'Breakfast',
  'Ocean View',
  'Guided Tours',
  'Adventure Activities'
];

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  className?: string;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, className = '' }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [duration, setDuration] = useState<[number, number]>([1, 14]);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.id === 'price-min';
    
    setPriceRange(prev => {
      const newRange: [number, number] = [...prev] as [number, number];
      if (isMin) {
        newRange[0] = value;
      } else {
        newRange[1] = value;
      }
      return newRange;
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.id === 'duration-min';
    
    setDuration(prev => {
      const newRange: [number, number] = [...prev] as [number, number];
      if (isMin) {
        newRange[0] = value;
      } else {
        newRange[1] = value;
      }
      return newRange;
    });
  };

  const handleRatingClick = (value: number) => {
    setRating(rating === value ? null : value);
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      duration,
      rating,
      amenities: selectedAmenities
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 500000]);
    setDuration([1, 14]);
    setRating(null);
    setSelectedAmenities([]);
    onFilterChange({
      priceRange: [0, 500000],
      duration: [1, 14],
      rating: null,
      amenities: []
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h2 className="font-semibold text-xl mb-6">Filters</h2>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium flex items-center mb-3">
          <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price-min" className="sr-only">Minimum Price</label>
              <input
                type="number"
                id="price-min"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="input w-full"
                placeholder="Min"
              />
            </div>
            <div>
              <label htmlFor="price-max" className="sr-only">Maximum Price</label>
              <input
                type="number"
                id="price-max"
                min={priceRange[0]}
                max="10000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="input w-full"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Duration */}
      <div className="mb-6">
        <h3 className="font-medium flex items-center mb-3">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          Duration (Days)
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{duration[0]} {duration[0] === 1 ? 'day' : 'days'}</span>
            <span>{duration[1]} days</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration-min" className="sr-only">Minimum Duration</label>
              <input
                type="number"
                id="duration-min"
                min="1"
                max={duration[1]}
                value={duration[0]}
                onChange={handleDurationChange}
                className="input w-full"
                placeholder="Min days"
              />
            </div>
            <div>
              <label htmlFor="duration-max" className="sr-only">Maximum Duration</label>
              <input
                type="number"
                id="duration-max"
                min={duration[0]}
                max="30"
                value={duration[1]}
                onChange={handleDurationChange}
                className="input w-full"
                placeholder="Max days"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-medium flex items-center mb-3">
          <Star className="h-4 w-4 mr-1 text-gray-500" />
          Customer Rating
        </h3>
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map(value => (
            <button
              key={value}
              className={`flex items-center p-2 border rounded-md ${
                rating === value
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleRatingClick(value)}
            >
              <Star className={`h-4 w-4 mr-1 ${
                rating === value ? 'text-primary-600 fill-primary-600' : 'text-amber-400 fill-amber-400'
              }`} />
              <span>{value}+</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Amenities */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Amenities</h3>
        <div className="space-y-2">
          {amenities.map(amenity => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span className="ml-2 text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button 
          onClick={applyFilters}
          className="btn-primary"
        >
          Apply Filters
        </button>
        <button 
          onClick={resetFilters}
          className="btn-outline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;