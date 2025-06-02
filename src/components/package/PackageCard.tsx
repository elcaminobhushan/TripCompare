import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Clock, Plus, Check, Plane, Hotel, Coffee, MapPin, Download } from 'lucide-react';
import { Package } from '../../types';
import { useFavoritesStore, useCompareStore } from '../../store/useStore';
import { generateItineraryPDF } from '../../utils/pdfGenerator';
import { formatPrice, calculateFinalPrice } from '../../utils/formatters';
import { destinations } from '../../data/destinations';
import { accommodations } from '../../data/accommodations';
import { tourOperators } from '../../data/tour-operators';
import { getPackageRating } from '../../data/reviews';

interface PackageCardProps {
  packageData: Package;
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData, className = '' }) => {
  const navigate = useNavigate();
  const isFavorite = useFavoritesStore((state) => state.isFavorite(packageData.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const isInCompareList = useCompareStore((state) => state.isInCompareList(packageData.id));

  // Get related data
  const destination = destinations.find(d => d.id === packageData.destinationId);
  const accommodation = accommodations.find(a => a.id === packageData.accommodationId);
  const tourOperator = tourOperators.find(t => t.id === packageData.tourOperatorId);
  const rating = getPackageRating(packageData.id);
  
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCompareList) {
      removeFromCompare(packageData.id);
    } else {
      const added = addToCompare(packageData.id);
      if (!added) {
        alert('You can compare up to 3 packages at a time.');
      }
    }
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(packageData.id);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    generateItineraryPDF(packageData);
  };

  const handleCardClick = () => {
    navigate(`/package/${packageData.id}`);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/package/${packageData.id}`);
  };

  return (
    <div 
      className={`card card-hover cursor-pointer flex flex-col h-full ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative">
        <img 
          src={packageData.image} 
          alt={packageData.title}
          className="h-48 w-full object-cover"
        />
        
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${
            isFavorite ? 'fill-accent-500 text-accent-500' : 'text-gray-600'
          }`} />
        </button>
        
        {packageData.discount && (
          <div className="absolute bottom-0 left-0 bg-green-600 text-white px-3 py-1 font-medium">
            {packageData.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{packageData.title}</h3>
          
          {/* Tour Operator Info */}
          {tourOperator && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">
                {tourOperator.name}
              </span>
              {tourOperator.rating && (
                <div className="flex items-center text-amber-500">
                  <Star className="fill-amber-500 h-4 w-4" />
                  <span className="text-sm ml-1">{tourOperator.rating}</span>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-600 mb-2 text-sm flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {destination?.name || 'Location not specified'}
          </p>
          
          <div className="flex items-center mb-3 text-sm">
            <div className="flex items-center text-amber-500 mr-3">
              <Star className="fill-amber-500 h-4 w-4 mr-1" />
              <span>{rating.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({rating.count})</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{packageData.duration} {packageData.duration === 1 ? 'day' : 'days'}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {packageData.transportIds.length > 0 && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center">
                <Plane className="h-3 w-3 mr-1" />
                Transport
              </span>
            )}
            {accommodation && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center">
                <Hotel className="h-3 w-3 mr-1" />
                {accommodation.type}
              </span>
            )}
            {packageData.inclusions.some(i => i.toLowerCase().includes('breakfast')) && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center">
                <Coffee className="h-3 w-3 mr-1" />
                Breakfast
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(calculateFinalPrice(packageData))}
              </span>
              <span className="text-sm text-gray-500">per person</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadClick}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Download itinerary"
              >
                <Download className="h-5 w-5" />
              </button>
              
              <button 
                onClick={handleCompareClick}
                className={`p-2 rounded-lg transition-colors ${
                  isInCompareList
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={isInCompareList ? "Remove from comparison" : "Add to comparison"}
              >
                {isInCompareList ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>

              <Link
                to={`/package/${packageData.id}`}
                onClick={handleViewDetailsClick}
                className="btn-primary px-4"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;