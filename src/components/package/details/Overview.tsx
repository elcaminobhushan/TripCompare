import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, Activity, BedDouble, Plane, Utensils } from 'lucide-react';
import { getPackageItinerary } from '../../../data/itineraries';
import { getActivityById } from '../../../data/activities';
import { getMealById } from '../../../data/meals';
import { getAccommodationById } from '../../../data/accommodations';
import { getTransportById } from '../../../data/transport';

interface OverviewProps {
  packageData: Package;
}

const Overview: React.FC<OverviewProps> = ({ packageData }) => {
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
        const meals = day.meals.map(id => getMealById(id)).filter(Boolean);
        const accommodation = getAccommodationById(day.accommodation);
        const transports = day.transport?.map(id => getTransportById(id)).filter(Boolean) || [];
        
        return (
          <div 
            key={day.id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              onClick={() => handleDayToggle(day.day)}
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
                expandedDays.includes(day.day) ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedDays.includes(day.day) && (
              <div className="p-6 border-t border-gray-200">
                {/* Today's Overview */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-3">Today's Overview</h4>
                  <p className="text-gray-600">{day.description}</p>
                </div>
                
                {/* Activities */}
                {activities.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Activities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Activity className="h-5 w-5 text-primary-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">{activity.name}</p>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Accommodation */}
                {accommodation && (
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <BedDouble className="h-5 w-5 text-primary-600" />
                      Accommodation
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex gap-4">
                        <img 
                          src={accommodation.image}
                          alt={accommodation.name}
                          className="w-32 h-24 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="font-medium">{accommodation.name}</h5>
                          <p className="text-gray-600">{accommodation.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Transportation */}
                {transports.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary-600" />
                      Transportation
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {transports.map((transport) => (
                        <div key={transport.id}>
                          <h5 className="font-medium">{transport.name}</h5>
                          <p className="text-gray-600">{transport.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Meals */}
                {meals.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary-600" />
                      Included Meals
                    </h4>
                    <div className="flex gap-3">
                      {meals.map((meal) => (
                        <span 
                          key={meal.id}
                          className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium capitalize"
                        >
                          {meal.type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Overview;