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
  const [transportGroups, setTransportGroups] = useState<Record<string, any[]>>({});

  const itineraryIds = itinerary?.map((day) => day.id) ?? [];
  const { data: transports } = useTransportByItineraryIds(itineraryIds);

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
      <div className="text-center text-gray-500">
        No transport information provided by the tour operator.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(transportGroups).map(([type, list]) => (
        <div key={type} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            {getTransportIcon(type)}
            <h3 className="text-lg font-semibold capitalize">{type}</h3>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {list.map((t, i) => (
              <li key={i}>
                {t.name ? `${t.name}: ` : ''}
                {t.source} → {t.destination}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Transport;
