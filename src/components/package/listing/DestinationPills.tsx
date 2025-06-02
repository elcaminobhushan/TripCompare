import React from 'react';
import { Destination } from '../../../types';

interface DestinationPillsProps {
  destinations: Destination[];
  activeDestinationId: string;
  onDestinationChange: (id: string) => void;
}

const DestinationPills: React.FC<DestinationPillsProps> = ({
  destinations,
  activeDestinationId,
  onDestinationChange
}) => {
  return (
    <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-2">
      <button
        className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
          activeDestinationId === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onDestinationChange('all')}
      >
        All Destinations
      </button>
      {destinations.map((destination) => (
        <button
          key={destination.id}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeDestinationId === destination.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onDestinationChange(destination.id)}
        >
          {destination.name}
        </button>
      ))}
    </div>
  );
};

export default DestinationPills;