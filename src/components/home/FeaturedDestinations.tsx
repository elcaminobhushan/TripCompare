import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { destinations } from '../../data/destinations';

const FeaturedDestinations: React.FC = () => {
  const navigate = useNavigate();
  const featuredDestinations = destinations.slice(0, 6);

  const handleDestinationClick = (destinationName: string) => {
    navigate(`/packages?destination=${destinationName}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after destinations with exclusive packages and unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((destination) => (
            <div 
              key={destination.id}
              className="group cursor-pointer relative rounded-xl overflow-hidden card-hover h-64"
              onClick={() => handleDestinationClick(destination.name)}
            >
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-white text-xl font-bold">{destination.name}</h3>
                <p className="text-gray-200 text-sm">{destination.country}</p>
                
                <div className="mt-3 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Explore packages</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;