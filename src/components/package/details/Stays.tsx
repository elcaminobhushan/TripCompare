import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, BedDouble, Star, CheckCircle } from 'lucide-react';
import { getPackageItinerary } from '../../../data/itineraries';
import { getAccommodationById } from '../../../data/accommodations';

interface StaysProps {
  packageData: Package;
}

const Stays: React.FC<StaysProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const itinerary = getPackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const renderStarRating = (rating: number) => {
    if (!rating || rating <= 0) return null;
    
    return [...Array(Math.floor(rating))].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
    ));
  };

  if (!itinerary) {
    return <div className="text-gray-500">No accommodation information available.</div>;
  }

  return (
    <div className="space-y-6">
      {itinerary.map((day) => {
        const accommodation = getAccommodationById(day.accommodation);
        if (!accommodation) return null;

        return (
          <div 
            key={day.day}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => handleDayToggle(day.day)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {day.day}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{accommodation.name}</h3>
                  <p className="text-sm text-gray-500">Night {day.day} of {itinerary.length}</p>
                </div>
              </div>
              {expandedDays.includes(day.day) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedDays.includes(day.day) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={accommodation.image}
                    alt={accommodation.name}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{accommodation.name}</h4>
                      <div className="flex">
                        {renderStarRating(accommodation.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{accommodation.type}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {accommodation.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stays;