import React, { useState } from 'react';
import { Activity, Calendar, Download, FileText, Heart, Home, Info, MapPin, Phone, Plane, Shield, Star } from 'lucide-react';
import { formatPrice, calculateFinalPrice } from '../../../utils/formatters';
import FloatingContactForm from '../../contact/FloatingContactForm';
import Overview from './Overview';
import Stays from './Stays';
import Activities from './Activities';
import Transport from './Transport';
import Reviews from './Reviews';
import Policies from './Policies';
import { Package } from '../../../types';
import { useFavoritesStore } from '../../../store/useStore';
import { destinations } from '../../../data/destinations';
import { getPackageReviews } from '../../../data/reviews';
import { tourOperators } from '../../../data/tour-operators';

interface PackageDetailsProps {
  packageData: Package;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFavorited = isFavorite(packageData.id);

  const finalPrice = calculateFinalPrice(packageData);
  const savedAmount = packageData.price - finalPrice;
  const destination = destinations.find((d: any) => d.id === packageData.destinationId);
  const reviews = getPackageReviews(packageData.id);
  const tourOperator = tourOperators.find((to: any) => to.id === packageData.tourOperatorId);

  const handleFavoriteClick = () => {
    toggleFavorite(packageData.id);
  };

  const handleDownloadClick = () => {
    if (!packageData.itinerary) {
      alert("No itinerary file specified.");
      return;
    }
  
    const fileUrl = `/itenaries/${packageData.itinerary}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = packageData.itinerary;
    link.target = "_blank"; // Optional: open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Side - Package Information */}
            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{destination?.name}, {destination?.country}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{packageData.rating}</span>
                    <span className="text-gray-500">({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>{packageData.duration_nights} Nights / {packageData.duration_days} Days</span>
                  </div>

                </div>

                {/* Main Image */}
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src={packageData.image} 
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Features */}
                {/* <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary-600" />
                    <span>Breakfast Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary-600" />
                    <span>Sightseeing Included</span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right Side - Tour Operator and Price */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gray-50 rounded-xl p-6">
                {/* Tour Operator Section */}
                {tourOperator && (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={tourOperator.logo}
                        alt={tourOperator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{tourOperator.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span>{tourOperator.rating}</span>
                          <span className="text-gray-500">• Verified Partner</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>Verified and Licensed Operator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Operating Since {new Date().getFullYear() - tourOperator.yearsInBusiness}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Price Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(finalPrice)}
                    </span>
                    <span className="text-gray-600 ml-2">Per Adult</span>
                  </div>
                  {packageData.discount && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 line-through">
                        {formatPrice(packageData.price)}
                      </span>
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded">
                        SAVE {formatPrice(savedAmount)}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsContactFormOpen(true)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Request Callback
                    </button>

                    <button 
                      onClick={handleFavoriteClick}
                      className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center"
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorited ? 'Saved' : 'Save Package'}
                    </button>

                    <button 
                      onClick={handleDownloadClick}
                      className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Itinerary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'overview' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FileText className="h-4 w-4" />
                  Detailed Itinerary
                </button>
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'stays' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('stays')}
                >
                  <Home className="h-4 w-4" />
                  Stays
                </button>
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'activities' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('activities')}
                >
                  <Activity className="h-4 w-4" />
                  Activities
                </button>
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'transport' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('transport')}
                >
                  <Plane className="h-4 w-4" />
                  Transport
                </button>
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'reviews' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  <Star className="h-4 w-4" />
                  Reviews
                </button>
                <button
                  className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                    activeTab === 'policies' 
                      ? 'border-primary-600 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('policies')}
                >
                  <Info className="h-4 w-4" />
                  Policies
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === 'overview' && <Overview packageData={packageData} />}
              {activeTab === 'stays' && <Stays packageData={packageData} />}
              {activeTab === 'activities' && <Activities packageData={packageData} />}
              {activeTab === 'transport' && <Transport packageData={packageData} />}
              {activeTab === 'reviews' && <Reviews reviews={reviews} />}
              {activeTab === 'policies' && <Policies packageId={packageData.id} />}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24">
              {/* Additional Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <div>
                      <span className="font-medium">Best Time to Visit</span>
                      
                const destination = getDestinationById(packageData.destinationId);
                      <p className="text-sm">
                        {destination?.popularMonths?.length
                          ? destination.popularMonths.join(', ')
                          : 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <div>
                      <span className="font-medium">Departure From</span>
                      <p className="text-sm">{packageData.departureLocations?.join(', ') || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the FloatingContactForm component */}
      <FloatingContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        packageTitle={packageData.title}
      />
    </div>
  );
};

export default PackageDetails;