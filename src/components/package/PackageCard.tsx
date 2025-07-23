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

  const firstItineraryId = itinerary?.[0]?.id || '';
  const { data: accommodation } = useAccommodationsByItineraryId(firstItineraryId);
  const { data: transports } = useTransportByItineraryId(firstItineraryId);

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
      if (!added) alert('You can compare up to 3 packages at a time.');
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
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCardClick = () => navigate(`/package/${packageData.id}`);
  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/package/${packageData.id}`);
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition hover:shadow-lg w-full max-w-[320px] sm:max-w-sm flex-shrink-0 mx-auto ${className}`}
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
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-accent-500 text-accent-500' : 'text-gray-600'}`} />
        </button>

        {packageData.discount && (
          <div className="absolute bottom-0 left-0 bg-green-600 text-white px-2 py-1 text-xs font-medium">
            {packageData.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2 leading-tight">{packageData.title}</h3>

        {tourOperator && (
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <span>{tourOperator.name}</span>
            {tourOperator.rating && (
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-500 h-4 w-4" />
                <span className="ml-1">{tourOperator.rating}</span>
              </div>
            )}
          </div>
        )}

        <p className="text-gray-600 text-sm flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {destination?.name || 'Location not specified'}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center">
            <Star className="fill-amber-500 h-4 w-4 mr-1" />
            <span>{rating.rating.toFixed(1)} ({rating.count})</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{packageData.duration_days} {packageData.duration_days === 1 ? 'day' : 'days'}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {transports?.some(t => t.type === 'flight') && (
            <span className="badge bg-primary-50 text-primary-600 text-xs flex items-center">
              <Plane className="h-3 w-3 mr-1" /> Transport
            </span>
          )}

          {accommodation && accommodation.length > 0 && (
            <span className="badge bg-primary-50 text-primary-600 text-xs flex items-center">
              <Hotel className="h-3 w-3 mr-1" />
              {Math.max(...accommodation.map(a => a.rating))} ★
            </span>
          )}

          {packageData.inclusions?.some(i => typeof i === 'string' && i.toLowerCase().includes('breakfast')) && (
            <span className="badge bg-primary-50 text-primary-600 text-xs flex items-center">
              <Coffee className="h-3 w-3 mr-1" /> Breakfast
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-gray-900">{formatPrice(calculateFinalPrice(packageData))}</span>
            <span className="text-sm text-gray-500">per person</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadClick}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              aria-label="Download itinerary"
            >
              <Download className="h-5 w-5" />
            </button>

            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-lg transition-colors ${
                isInCompareList ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isInCompareList ? "Remove from comparison" : "Add to comparison"}
            >
              {isInCompareList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </button>

            <Link
              to={`/package/${packageData.id}`}
              onClick={handleViewDetailsClick}
              className="btn-primary px-4 py-2 text-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
