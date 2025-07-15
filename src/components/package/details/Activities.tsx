import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { getPackageItinerary } from '../../../data/itineraries';
import { getActivityById } from '../../../data/activities';

interface ActivitiesProps {
  packageData: Package;
}

const Activities: React.FC<ActivitiesProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const itinerary = getPackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {itinerary.map((day) => {
        const activities = day.activities.map(id => getActivityById(id)).filter(Boolean);
        
        return (
          <div 
            key={day.id}
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
                  <h3 className="font-semibold">{day.title}</h3>
                  <p className="text-sm text-gray-500">
                    {activities.length} activities planned
                  </p>
                </div>
              </div>
              {expandedDays.includes(day.day) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedDays.includes(day.day) && activities.length > 0 && (
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
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Activity className="h-5 w-5 text-primary-600 mt-1" />
                          <div>
                            <h4 className="font-medium">{activity?.name}</h4>
                            <p className="text-sm text-gray-500">{activity?.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {activity?.duration} hours
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                                {activity?.difficulty}
                              </span>
                              {activity?.included && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                  Included
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Activities;