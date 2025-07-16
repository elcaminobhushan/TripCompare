import React from 'react';
import { Package } from '../../types';
import { X, Star, Check } from 'lucide-react';
import { useCompare } from '../../hooks/useCompare';
import { formatPrice, calculateFinalPrice } from '../../utils/formatters';
import { destinations } from '../../data/destinations';
import { getPackageItinerary } from '../../data/itineraries';
import { getMealById } from '../../data/meals';
import { getAccommodationById } from '../../data/accommodations';
import { getTransportById } from '../../data/transport';

interface CompareTableProps {
  packages: Package[];
}

const CompareTable: React.FC<CompareTableProps> = ({ packages }) => {
  const { removeFromCompare } = useCompare();

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
              <td key={pkg.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(pkg.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1">{pkg.rating}</span>
                  <span className="ml-1 text-gray-500">({pkg.reviews})</span>
                </div>
              </td>
            ))}
          </tr>
          
          {/* Accommodation */}
          <tr>
            <td className="px-6 py-4 font-medium">Accommodation</td>
            {packages.map((pkg) => {
              const accommodation = getAccommodationById(pkg.accommodationId);
              return (
                <td key={pkg.id} className="px-6 py-4">
                  {accommodation && (
                    <div>
                      <div className="font-medium">{accommodation.name}</div>
                      <div className="text-sm text-gray-500">{accommodation.type}</div>
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
          
          {/* Meals */}
          <tr>
            <td className="px-6 py-4 font-medium">Meals Included</td>
            {packages.map((pkg) => {
              const itinerary = getPackageItinerary(pkg.id);
              const meals = itinerary.reduce((acc, day) => {
                (day.meals ?? []).forEach(mealId => {
                  const meal = getMealById(mealId);
                  if (meal) {
                    if (meal.type === 'breakfast') acc.breakfast++;
                    if (meal.type === 'lunch') acc.lunch++;
                    if (meal.type === 'dinner') acc.dinner++;
                  }
                });
                return acc;
              }, { breakfast: 0, lunch: 0, dinner: 0 });
              
              
              return (
                <td key={pkg.id} className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Breakfast:</span>
                      <span className="font-medium">{meals.breakfast} included</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Lunch:</span>
                      <span className="font-medium">{meals.lunch} included</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-20 text-sm">Dinner:</span>
                      <span className="font-medium">{meals.dinner} included</span>
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>
          
          {/* Transport */}
          <tr>
            <td className="px-6 py-4 font-medium">Transportation</td>
            {packages.map((pkg) => {
              const transports = pkg.transportIds.map(id => getTransportById(id)).filter(Boolean);
              return (
                <td key={pkg.id} className="px-6 py-4">
                  {transports.map((transport, index) => transport && (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <span>{transport.name}</span>
                        <p className="text-sm text-gray-500 mt-1">{transport.description}</p>
                      </div>
                    </div>
                  ))}
                </td>
              );
            })}
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

export default CompareTable;