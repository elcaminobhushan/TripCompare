import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, Plane,Bus,Ship,Train,Car,Route, CheckCircle } from 'lucide-react';
import { getPackageItinerary } from '../../../data/itineraries';
import { getTransportById } from '../../../data/transport';

interface TransportProps {
  packageData: Package;
}

const getTransportIcon = (type: string) => {
  switch (type) {
    case "flight":
      return <Plane className="h-6 w-6 text-primary-600" />;
    case "bus":
    case "van":
      return <Bus className="h-6 w-6 text-primary-600" />;
    case "train":
      return <Train className="h-6 w-6 text-primary-600" />;
    case "boat":
    case "ferry":
      return <Ship className="h-6 w-6 text-primary-600" />;
    case "car":
      return <Car className="h-6 w-6 text-primary-600" />;
    default:
      return <Route className="h-6 w-6 text-primary-600" />;
  }
};


const Transport: React.FC<TransportProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const itinerary = getPackageItinerary(packageData.id);

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transportation information available
      </div>
    );
  }

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
        const transportsForDay = day.transport?.map((id: string) => getTransportById(id)).filter(Boolean) || [];
        
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
                  <h3 className="font-semibold">{day.title}</h3>
                  <p className="text-sm text-gray-500">
                    {transportsForDay.length} transport {transportsForDay.length === 1 ? 'option' : 'options'}
                  </p>
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
                {transportsForDay.map((transport: any, index: number) => (
                  <div key={transport.id} className={`bg-white rounded-lg p-6 ${index > 0 ? 'mt-4' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
                    {getTransportIcon(transport.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{transport.name}</h4>
                        {/* <p className="text-sm text-gray-500">Provided by {transport.provider}</p> */}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-600">{transport.details}</p>
                      
                      {transport.features && transport.features.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Features:</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {transport.features.map((feature: string, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* <div className="flex items-center gap-2">
                        {transport.included ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              Included in package
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium text-red-600">
                              Not included in package
                            </span>
                          </>
                        )}
                      </div> */}
                    </div>
                  </div>
                ))}
                
                {transportsForDay.length === 0 && (
                  <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                    No transportation scheduled for this day
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

export default Transport;