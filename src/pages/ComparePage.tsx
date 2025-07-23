import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from '../types';
import { usePackages } from '../hooks/usePackages';
import { useDestinations } from '../hooks/useDestinations';
import { useCompareStore } from '../store/useStore';
import { usePackageRating } from '../hooks/useReviews';

import {Scale, X,Star} from "lucide-react"; 
  
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);


const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const compareList = useCompareStore((state) => state.compareList);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const { data: allPackages, isLoading: packagesLoading } = usePackages();
  const { data: destinations, isLoading: destinationsLoading } = useDestinations();
  
  
  const [packages, setPackages] = useState<Package[]>([]);
  const isLoading = packagesLoading || destinationsLoading;


  useEffect(() => {
    const selectedPackages = compareList
      .map(id => allPackages?.find(pkg => pkg.id === id))
      .filter((pkg): pkg is Package => pkg !== undefined);
    setPackages(selectedPackages);
  }, [compareList, allPackages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Scale className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">No Packages to Compare</h1>
            <p className="text-gray-600 mb-8">
              Select packages to compare by clicking the compare button on package cards.
            </p>
            <button
              onClick={() => navigate('/packages')}
              className="btn-primary"
            >
              Browse Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Scale className="h-7 w-7 text-primary-600" />
          Package Comparison
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <PackageCompareCard
              key={pkg.id}
              pkg={pkg}
              destinations={destinations || []}
              onRemove={() => removeFromCompare(pkg.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for each package card to handle hooks properly
const PackageCompareCard: React.FC<{
  pkg: Package;
  destinations: any[];
  onRemove: () => void;
}> = ({ pkg, destinations, onRemove }) => {
  const { data: rating } = usePackageRating(pkg.id);
  const destination = destinations.find(d => d.id === pkg.destinationId);
  const meals = pkg.meal ?? [];

  return (
    <div className="relative">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-600 z-10"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Package Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <img
          src={pkg.mainImage}
          alt={pkg.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
          <p className="text-gray-600 mb-3">
            {destination?.name}, {destination?.country}
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold">₹{pkg.price}</span>
            {pkg.discount && (
              <span className="text-green-600 text-sm font-medium">
                Save {pkg.discount}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-amber-500">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-medium">{rating.rating}</span>
            <span className="text-gray-500">({rating.count}+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-medium mb-4">Meals Included</h4>
        {meals.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {meals.map((meal, i) => (
              <span
                key={i}
                className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm"
              >
                {meal}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No meals included</p>
        )}
      </div>
    </div>
  );
};
export default ComparePage;