import React from 'react';
import { useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { Sun, Cloud, Plane, DollarSign } from 'lucide-react';
import { packages } from '../data/packages';

const DestinationsPage: React.FC = () => {
  const navigate = useNavigate();

  const getDestinationStats = (destinationId: string) => {
    const destinationPackages = packages.filter(pkg => pkg.destinationId === destinationId);

    const prices = destinationPackages.map(pkg => pkg.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const companies = new Set(destinationPackages.map(pkg => pkg.tourOperatorId));

    return {
      minPrice,
      maxPrice,
      companiesCount: companies.size,
      packagesCount: destinationPackages.length
    };
  };

  const handleViewPackages = (destinationId: string) => {
    navigate(`/packages?destination=${encodeURIComponent(destinationId)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Destinations</h1>

        <div className="space-y-8">
          {destinations.map((destination) => {
            const stats = getDestinationStats(destination.id);
            
            return (
              <div key={destination.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-full">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-2">{destination.name}, {destination.country}</h2>
                    <p className="text-gray-600 mb-6">{destination.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Sun className="h-5 w-5 text-primary-600 mr-2" />
                          <h3 className="font-medium">Best Time</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {destination.popularMonths.slice(0, 2).join(", ")}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Plane className="h-5 w-5 text-primary-600 mr-2" />
                          <h3 className="font-medium">Tour Operators</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {stats.companiesCount} companies
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
                          <h3 className="font-medium">Price Range</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          ${stats.minPrice} - ${stats.maxPrice}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Cloud className="h-5 w-5 text-primary-600 mr-2" />
                          <h3 className="font-medium">Available</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {stats.packagesCount} packages
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="btn-primary mt-6"
                      onClick={() => handleViewPackages(destination.id)}
                    >
                      View Packages
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;