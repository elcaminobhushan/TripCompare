import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, Activity, BedDouble } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useActivitiesByItineraryId } from '../../../hooks/useActivities';
import { useAccommodationsByItineraryId } from '../../../hooks/useAccommodations';

interface OverviewProps {
  packageData: Package;
}

const Overview: React.FC<OverviewProps> = ({ packageData }) => {
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
        <OverviewDayCard
          key={day.id}
          day={day}
          packageData={packageData}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};

// Separate component for each day to handle hooks properly
const OverviewDayCard: React.FC<{
  day: any;
  packageData: Package;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, isExpanded, onToggle }) => {
  const { data: activities } = useActivitiesByItineraryId(day.id);
  const { data: accommodation } = useAccommodationsByItineraryId(day.id);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg">
              {day.day}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">{day.title}</h3>
              <p className="text-sm text-gray-500">Click to see full details</p>
            </div>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`} />
      </button>
      
      {isExpanded && (
  <div className="p-6 border-t border-gray-200 space-y-10">
    {/* Overview */}
    <section>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">Today's Overview</h4>
      <p className="text-gray-600 leading-relaxed">{day.description}</p>
    </section>

    {/* Activities */}
    {activities && activities.length > 0 && (
      <section>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary-600" />
          Activities
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity?.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 transition hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h5 className="text-gray-800 font-semibold">{activity?.name}</h5>
                  {activity?.description && (
                    <p className="text-gray-500 text-sm mt-1">{activity.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Accommodation */}
    <section>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BedDouble className="h-5 w-5 text-primary-600" />
        Accommodation
      </h4>

      {accommodation && accommodation.length > 0 ? (
        <div className="space-y-6">
          {accommodation.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-5 items-start border border-gray-100 transition hover:shadow-lg"
            >
              <img
                src={acc.image}
                alt={acc.name}
                className="w-32 h-24 rounded-lg object-cover border"
              />
              <div>
                <h5 className="text-gray-800 font-semibold text-lg">{acc.name}</h5>
                {acc.rating && (
                  <p className="text-sm text-amber-500 mt-1">⭐ {acc.rating} stars</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Accommodation details not present.</p>
      )}
    </section>
  </div>
)}


    </div>
  );
};

export default Overview;