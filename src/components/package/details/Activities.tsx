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

const ActivitiesDayCard: React.FC<{
  day: any;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, isExpanded, onToggle }) => {
  const { data: activities } = useActivitiesByItineraryId(day.id);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 text-base">{day.title}</h3>
            <p className="text-sm text-gray-500">
              {activities?.length || 0} activities planned
            </p>
          </div>
        </div>
        {isExpanded
          ? <ChevronUp className="h-5 w-5 text-gray-400" />
          : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {isExpanded && (
  <div className="p-4 bg-gray-50 border-t border-gray-100">
    {activities && activities.length > 0 ? (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
          >
            {/* Image */}
            {activity.image && (
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full sm:w-60 h-44 sm:h-auto object-cover flex-shrink-0"
              />
            )}

            {/* Content */}
            <div className="p-4 flex flex-col justify-center gap-2">
              <h4 className="text-lg font-semibold text-gray-800">
                {activity.name}
              </h4>

              {activity.type && (
                <span className="text-xs text-primary-700 bg-primary-100 rounded-full px-2 py-0.5 w-fit">
                  {activity.type}
                </span>
              )}

              {activity.description && (
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {activity.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500">No activities listed for this day.</p>
    )}
  </div>
)}


    </div>
  );
};

export default Activities;
