import React, { useEffect, useState } from 'react';
import { Package } from '../../../types';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useTransportByItineraryIds } from '../../../hooks/useTransport';
import {
  Plane, Bus, Ship, Train, Car, Route,
} from 'lucide-react';

const getTransportIcon = (type: string) => {
  switch (type) {
    case 'flight': return <Plane className="h-5 w-5 text-primary-600" />;
    case 'bus':
    case 'van': return <Bus className="h-5 w-5 text-primary-600" />;
    case 'train': return <Train className="h-5 w-5 text-primary-600" />;
    case 'boat':
    case 'ferry': return <Ship className="h-5 w-5 text-primary-600" />;
    case 'car': return <Car className="h-5 w-5 text-primary-600" />;
    default: return <Route className="h-5 w-5 text-primary-600" />;
  }
};

interface TransportProps {
  packageData: Package;
}

const Transport: React.FC<TransportProps> = ({ packageData }) => {
  const { data: itinerary } = usePackageItinerary(packageData.id);
  const itineraryIds = itinerary?.map((day) => day.id) ?? [];
  const { data: transports } = useTransportByItineraryIds(itineraryIds);
  const [transportGroups, setTransportGroups] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (!transports) return;
    const grouped: Record<string, any[]> = {};
    transports.forEach((t) => {
      if (!grouped[t.type]) grouped[t.type] = [];
      grouped[t.type].push(t);
    });
    setTransportGroups(grouped);
  }, [transports]);

  if (!transports || transports.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No transport information provided by the tour operator.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {Object.entries(transportGroups).map(([type, list]) => (
        <div key={type} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            {getTransportIcon(type)}
            <h3 className="text-base font-semibold capitalize text-gray-800">{type}</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 pl-1">
            {list.map((t, i) => (
              <li key={i} className="flex items-start">
                <span className="leading-snug">
                  {t.name ? <strong>{t.name}: </strong> : ''}
                  {t.source} → {t.destination}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Transport;
