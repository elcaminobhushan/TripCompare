import React from 'react';
import { Package } from '../../types';
import { X, Star, Check } from 'lucide-react';
import { useCompare } from '../../hooks/useCompare';
import { formatPrice, calculateFinalPrice } from '../../utils/formatters';
import { useDestinations } from '@/hooks/useDestinations';
import { useTransportByItineraryId } from '../../hooks/useTransport';
import { useAccommodationsByItineraryId } from '../../hooks/useAccommodations';
import { usePackageRating } from '../../hooks/useReviews';
import { usePackageItinerary } from '../../hooks/useItineraries';

import { Plane, Bus, Train, Ship, Car } from "lucide-react"; 

interface CompareTableProps {
  packages: Package[];
}

const CompareTable: React.FC<CompareTableProps> = ({ packages }) => {
  const { removeFromCompare } = useCompare();
  const { data: destinations, isLoading, error } = useDestinations();
  if (isLoading) return <p>Loading destinations...</p>;
  if (error) return <p>Error loading destinations</p>;

  if (packages.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Packages to Compare</h2>
        <p className="text-gray-500 mb-6">
          Add packages to your comparison list to see their features side by side.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-gray-500 font-semibold text-sm uppercase tracking-wider w-1/4">
              Feature
            </th>
            {packages.map((pkg) => {
              const destination = destinations.find(d => d.id === pkg.destinationId);
              return (
                <th key={pkg.id} className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(pkg.id)}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      aria-label="Remove from comparison"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.title}</h3>
                      <p className="text-gray-500 text-sm">{destination?.name}</p>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Price */}
          <tr>
            <td className="px-6 py-4 font-medium">Price</td>
            {packages.map((pkg) => {
              const finalPrice = calculateFinalPrice(pkg);
              
              return (
                <td key={pkg.id} className="px-6 py-4">
                  {pkg.discount ? (
                    <div>
                      <span className="text-gray-500 line-through">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="font-bold text-lg text-gray-900 ml-2">
                        {formatPrice(finalPrice)}
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                        {pkg.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-lg text-gray-900">
                      {formatPrice(pkg.price)}
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
          
          {/* Duration */}
          <tr>
            <td className="px-6 py-4 font-medium">Duration</td>
            {packages.map((pkg) => (
              <td key={pkg.id} className="px-6 py-4">
                {pkg.duration_days} {pkg.duration_days === 1 ? 'day' : 'days'}
              </td>
            ))}
          </tr>
          
          {/* Rating */}
          <tr>
            <td className="px-6 py-4 font-medium">Rating</td>
            {packages.map((pkg) => (
              <PackageRatingCell key={pkg.id} packageId={pkg.id} />
            ))}
          </tr>
          
          {/* Accommodation */}
          <tr>
            <td className="px-6 py-4 font-medium">Accommodation</td>
            {packages.map((pkg) => (
              <PackageAccommodationCell key={pkg.id} packageId={pkg.id} />
            ))}
          </tr>

          
          {/* Meals */}
          <tr>
          <td className="px-6 py-4 font-medium">Meals Included</td>
          {packages.map((pkg) => {
            const meals = pkg.meal ?? [];

            return (
              <td key={pkg.id} className="px-6 py-4">
                <div className="space-y-1">
                  {meals.includes("Breakfast") && (
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Breakfast:</span>
                      <span className="font-medium">included</span>
                    </div>
                  )}
                  {meals.includes("Lunch") && (
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Lunch:</span>
                      <span className="font-medium">included</span>
                    </div>
                  )}
                  {meals.includes("Dinner") && (
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Dinner:</span>
                      <span className="font-medium">included</span>
                    </div>
                  )}
                </div>
              </td>
            );
          })}
        </tr>

          
          {/* Transport */}

          <tr>
            <td className="px-6 py-4 font-medium">Transportation</td>
            {packages.map((pkg) => (
              <PackageTransportCell key={pkg.id} packageId={pkg.id} />
            ))}
          </tr>

          
          
          {/* Actions */}
          <tr>
            <td className="px-6 py-4 font-medium">Actions</td>
            {packages.map((pkg) => (
              <td key={pkg.id} className="px-6 py-4">
                <div className="flex flex-col space-y-2">
                  <a 
                    href={`/package/${pkg.id}`} 
                    className="btn-primary text-center"
                  >
                    View Details
                  </a>
                  <button className="btn-outline text-center">
                    Book Now
                  </button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Helper components for complex cells
const PackageRatingCell: React.FC<{ packageId: string }> = ({ packageId }) => {
  const { data: rating } = usePackageRating(packageId);
  
  return (
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="flex mr-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating.rating) 
                  ? 'text-amber-400 fill-amber-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-1">{rating.rating}</span>
        <span className="ml-1 text-gray-500">({rating.count})</span>
      </div>
    </td>
  );
};

const PackageAccommodationCell: React.FC<{ packageId: string }> = ({ packageId }) => {
  const { data: itinerary } = usePackageItinerary(packageId);
  const firstItineraryId = itinerary?.[0]?.id || '';
  const { data: accommodations } = useAccommodationsByItineraryId(firstItineraryId);
  const acc = accommodations?.[0];
  
  return (
    <td className="px-6 py-4">
      {acc && (
        <div>
          <div className="font-medium">{acc.name}</div>
        </div>
      )}
    </td>
  );
};

const PackageTransportCell: React.FC<{ packageId: string }> = ({ packageId }) => {
  const { data: itinerary } = usePackageItinerary(packageId);
  const firstItineraryId = itinerary?.[0]?.id || '';
  const { data: transports } = useTransportByItineraryId(firstItineraryId);
  const types = transports ? [...new Set(transports.map(t => t.type))] : [];
  
  return (
    <td className="px-6 py-4">
      {types.map((type, index) => (
        <div key={index} className="flex items-center mb-1">
          {getTransportIcon(type)}
          <span className="font-medium">{type}</span>
        </div>
      ))}
    </td>
  );
};

const getTransportIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "flight":
    case "plane":
      return <Plane className="h-4 w-4 mr-2 text-blue-600" />;
    case "bus":
      return <Bus className="h-4 w-4 mr-2 text-yellow-600" />;
    case "train":
      return <Train className="h-4 w-4 mr-2 text-red-600" />;
    case "ship":
    case "ferry":
      return <Ship className="h-4 w-4 mr-2 text-purple-600" />;
    case "car":
      return <Car className="h-4 w-4 mr-2 text-green-600" />;
    default:
      return <Check className="h-4 w-4 mr-2 text-gray-600" />;
  }
};

export default CompareTable;