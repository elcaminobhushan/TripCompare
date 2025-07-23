import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Clock, Plus, Check, Plane, Hotel, Coffee, MapPin, Download } from 'lucide-react';
import { Destination, Package } from '../../types';
import { useFavoritesStore, useCompareStore } from '../../store/useStore';
import { formatPrice, calculateFinalPrice } from '../../utils/formatters';
import { useDestinations } from '../../hooks/useDestinations'; 
import { useTourOperator } from '../../hooks/useTourOperators';
import { usePackageRating } from '../../hooks/useReviews';
import { useAccommodationsByItineraryId } from '../../hooks/useAccommodations';
import { useTransportByItineraryId } from '../../hooks/useTransport';
import { usePackageItinerary } from '../../hooks/useItineraries';

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
  
  const { data: destinations, isLoading, error } = useDestinations();

  const { data: tourOperator } = useTourOperator(packageData.tourOperatorId);
  const { data: rating } = usePackageRating(packageData.id);
  const { data: itinerary } = usePackageItinerary(packageData.id);
  
  // Get accommodations and transport for the first itinerary day
  const firstItineraryId = itinerary?.[0]?.id || '';
  const { data: accommodation } = useAccommodationsByItineraryId(firstItineraryId);
  const { data: transports } = useTransportByItineraryId(firstItineraryId);

  // Get related data
  const destination = destinations.find((d: Destination) => d.id === packageData.destinationId);

  if (isLoading) return <p>Loading destinations...</p>;
  if (error) return <p>Error loading destinations</p>;
  
  
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

  const handleDownloadClick = () => {
    if (!packageData.itineraryPdf) {
      alert("No itinerary file specified.");
      return;
    }
  
    const fileUrl = `/itenaries/${packageData.itineraryPdf}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = packageData.itineraryPdf;
    link.target = "_blank"; // Optional: open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          src={packageData.mainImage} 
          alt={packageData.title}
          className="h-40 sm:h-48 w-full object-cover"
        />
        
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${
            isFavorite ? 'fill-accent-500 text-accent-500' : 'text-gray-600'
          }`} />
        </button>
        
        {packageData.discount && (
          <div className="absolute bottom-0 left-0 bg-green-600 text-white px-2 py-1 text-xs sm:px-3 sm:text-sm font-medium">
            {packageData.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2 leading-tight">{packageData.title}</h3>
          
          {/* Tour Operator Info */}
          {tourOperator && (
            <div className="flex items-center gap-1 sm:gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">
                {tourOperator.name}
              </span>
              {tourOperator.rating && (
                <div className="flex items-center text-amber-500">
                  <Star className="fill-amber-500 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-sm ml-1">{tourOperator.rating}</span>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-600 mb-2 text-xs sm:text-sm flex items-center">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {destination?.name || 'Location not specified'}
          </p>
          
          <div className="flex items-center mb-3 text-xs sm:text-sm">
            <div className="flex items-center text-amber-500 mr-3">
              <Star className="fill-amber-500 h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{rating.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({rating.count})</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{packageData.duration_days} {packageData.duration_days === 1 ? 'day' : 'days'}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
            {transports && transports.length > 0 && transports.some(t => t.type === 'flight') && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center text-xs">
                <Plane className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                Transport
              </span>
            )}
            {accommodation && accommodation.length > 0 && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center text-xs">
                <Hotel className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {Math.max(...accommodation.map(a => a.rating))} ★
              </span>
            )}

            {packageData.inclusions?.some(
              (i) => typeof i === 'string' && i.toLowerCase().includes('breakfast')
            ) && (
              <span className="badge bg-primary-50 text-primary-600 flex items-center text-xs">
                <Coffee className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                Breakfast
              </span>
            )}

          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {formatPrice(calculateFinalPrice(packageData))}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">per person</span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleDownloadClick}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Download itinerary"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              <button 
                onClick={handleCompareClick}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  isInCompareList
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={isInCompareList ? "Remove from comparison" : "Add to comparison"}
              >
                {isInCompareList ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              <Link
                to={`/package/${packageData.id}`}
                onClick={handleViewDetailsClick}
                className="btn-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">View</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;