import React from 'react';
import { Flame } from 'lucide-react';

interface TrendingDestination {
  name: string;
  image: string;
  searches: number;
}

interface TrendingDestinationsProps {
  destinations: TrendingDestination[];
  onDestinationSelect: (name: string) => void;
}

const TrendingDestinations: React.FC<TrendingDestinationsProps> = ({
  destinations,
  onDestinationSelect
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          Trending Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => onDestinationSelect(destination.name)}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-2xl text-white text-center mb-2">
                  {destination.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {destination.searches} recent searches
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingDestinations;