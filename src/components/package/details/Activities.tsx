import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useActivitiesByItineraryId } from '../../../hooks/useActivities';

interface ActivitiesProps {
  packageData: Package;
}

const Activities: React.FC<ActivitiesProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const { data: itinerary } = usePackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {itinerary?.map((day) => (
        <ActivitiesDayCard
          key={day.id}
          day={day}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};

// Separate component for each day to handle hooks properly
const ActivitiesDayCard: React.FC<{
  day: any;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, isExpanded, onToggle }) => {
  const { data: activities } = useActivitiesByItineraryId(day.id);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold">{day.title}</h3>
            <p className="text-sm text-gray-500">
              {activities?.length || 0} activities planned
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && activities && activities.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div
                key={activity?.id}
                className="bg-white rounded-lg overflow-hidden"
              >
                {activity?.image && (
                  <img 
                    src={activity?.image}
                    alt={activity?.name}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;