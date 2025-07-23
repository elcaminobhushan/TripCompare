import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useAccommodationsByItineraryId, useAccommodationsByItineraryIds } from '../../../hooks/useAccommodations';

interface StaysProps {
  packageData: Package;
}

const Stays: React.FC<StaysProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const { data: itinerary } = usePackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const hasAnyAccommodations = useAccommodationsByItineraryIds(itinerary.map(a => a.id));

  if (!itinerary || itinerary.length === 0) {
    return <div className="text-gray-500">No itinerary found for this package.</div>;
  }

  if (!hasAnyAccommodations) {
    return <div className="text-gray-500">The tour operator hasn't provided any stay information yet.</div>;
  }

  return (
    <div className="space-y-6">
      {itinerary.map((day) => (
        <StaysDayCard
          key={day.day}
          day={day}
          itineraryLength={itinerary.length}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};
const StaysDayCard: React.FC<{
  day: any;
  itineraryLength: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, itineraryLength, isExpanded, onToggle }) => {
  const { data: accommodations } = useAccommodationsByItineraryId(day.id);

  if (!accommodations || accommodations.length === 0) return null;

  const renderStarRating = (rating: number) => {
    if (!rating || rating <= 0) return null;
    return [...Array(Math.floor(rating))].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
    ));
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-base">
              {accommodations[0].name}
            </h3>
            <p className="text-sm text-gray-500">
              Night {day.day} of {itineraryLength}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && accommodations.map((acc) => (
        <div key={acc.id} className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <img
              src={acc.image || '/default-hotel.jpg'}
              alt={acc.name}
              className="w-full md:w-64 h-44 object-cover rounded-lg shadow"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg text-gray-800">{acc.name}</h4>
                <div className="flex">{renderStarRating(acc.rating)}</div>
              </div>
              {acc.description && (
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                  {acc.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stays;
