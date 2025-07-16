import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from '../types';
import { getPackageById } from '../data/packages';
import { getDestinationById } from '../data/destinations';
import { getAccommodationById } from '../data/accommodations';
import { getPackageItinerary } from '../data/itineraries';
import { getTransportById } from '../data/transport';
import { getActivityById } from '../data/activities';
import { getMealById } from '../data/meals';
import { useCompareStore } from '../store/useStore';
import { 
  Scale, X, ArrowLeft, AlertTriangle, Star,
  BedDouble, Plane, Utensils, Activity, DollarSign, Calendar,
  Check
} from 'lucide-react';
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
import { Radar } from 'react-chartjs-2';

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

type TabType = 'overview' | 'accommodations' | 'activities' | 'transport' | 'meals' | 'analysis';

const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const compareList = useCompareStore((state) => state.compareList);
  const clearCompareList = useCompareStore((state) => state.clearCompareList);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  
  const [packages, setPackages] = useState<Package[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const selectedPackages = compareList
      .map(id => getPackageById(id))
      .filter((pkg): pkg is Package => pkg !== undefined);
    setPackages(selectedPackages);
    setIsLoading(false);
  }, [compareList]);

  const getRadarChartData = () => {
    const labels = ['Value', 'Accommodation', 'Activities', 'Transport', 'Meals'];
    const datasets = packages.map((pkg, index) => {
      const accommodation = getAccommodationById(pkg.accommodationId);
      const itinerary = getPackageItinerary(pkg.id);
      
      const valueScore = 100 - ((pkg.price / Math.max(...packages.map(p => p.price))) * 100);
      const accommodationScore = accommodation ? (accommodation.rating / 5) * 100 : 0;
      const activitiesScore = itinerary ? (itinerary.reduce((acc, day) => acc + (day.activities?.length || 0), 0) / 20) * 100 : 0;
      const transportScore = pkg.transportIds?.length ? 100 : 50;
      const mealsScore = itinerary ? (itinerary.reduce((acc, day) => acc + (day.meals?.length || 0), 0) / 15) * 100 : 0;

      const colors = [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ];

      const borderColors = [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)'
      ];

      return {
        label: pkg.title,
        data: [valueScore, accommodationScore, activitiesScore, transportScore, mealsScore],
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2
      };
    });

    return { labels, datasets };
  };

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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Scale className="h-7 w-7 text-primary-600" />
                Compare Packages
              </h1>
              <p className="text-gray-600">
                Comparing {packages.length} package{packages.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/packages')}
              className="btn-outline"
            >
              Add More
            </button>
            <button
              onClick={clearCompareList}
              className="btn-outline text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </button>
          </div>
        </div>

        {/* Warning for more than 3 packages */}
        {packages.length > 2 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <p className="text-amber-800">
              Comparing more than 2 packages might make it harder to make a decision. Consider removing some packages for a clearer comparison.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto p-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('accommodations')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'accommodations'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BedDouble className="h-4 w-4" />
                Accommodations
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'activities'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Activity className="h-4 w-4" />
                Activities
              </button>
              <button
                onClick={() => setActiveTab('transport')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'transport'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Plane className="h-4 w-4" />
                Transport
              </button>
              <button
                onClick={() => setActiveTab('meals')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'meals'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Utensils className="h-4 w-4" />
                Meals
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`pb-4 font-medium text-sm border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'analysis'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Scale className="h-4 w-4" />
                Analysis
              </button>
            </nav>
          </div>

          {/* Side by Side Comparison */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => {
                const destination = getDestinationById(pkg.destinationId);
                const accommodation = getAccommodationById(pkg.accommodationId);
                const itinerary = getPackageItinerary(pkg.id);
                const transport = pkg.transportIds?.[0] ? getTransportById(pkg.transportIds[0]) : null;

                return (
                  <div key={pkg.id} className="relative">
                    <button
                      onClick={() => removeFromCompare(pkg.id)}
                      className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Package Header */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
                        <p className="text-gray-600 mb-3">
                          {destination?.name}, {destination?.country}
                        </p>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-bold">${pkg.price}</span>
                          {pkg.discount && (
                            <span className="text-green-600 text-sm font-medium">
                              Save {pkg.discount}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-amber-500">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="font-medium">{pkg.rating}</span>
                          <span className="text-gray-500">({pkg.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-medium mb-3">Package Overview</h4>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-gray-400" />
                              <span>{pkg.duration_days} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-amber-400 fill-current" />
                              <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium text-sm mb-2">Inclusions</h5>
                              <ul className="space-y-2">
                                {pkg.inclusions.map((inclusion, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <Star className="h-4 w-4 text-green-600 mt-1" />
                                    <span>{inclusion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-sm mb-2">Exclusions</h5>
                              <ul className="space-y-2">
                                {pkg.exclusions.map((exclusion, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-600 mt-1" />
                                    <span>{exclusion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'accommodations' && accommodation && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium mb-4">Accommodation Details</h4>
                        <div className="space-y-4">
                          <img
                            src={accommodation.image}
                            alt={accommodation.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div>
                            <h5 className="font-medium">{accommodation.name}</h5>
                            <p className="text-gray-600">{accommodation.type}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Amenities</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {accommodation.amenities.map((amenity, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'activities' && itinerary && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium mb-4">Activities Included</h4>
                        <div className="space-y-3">
                          {itinerary.map((day, index) => (
                            <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                              <h5 className="font-medium mb-2">Day {day.day}</h5>
                              {day.activities && day.activities.length > 0 ? (
                                <ul className="space-y-2">
                                  {day.activities.map((activityId: string, i: number) => {
                                    const activity = getActivityById(activityId);
                                    return activity ? (
                                      <li key={i} className="flex items-center gap-2 text-sm">
                                        <Activity className="h-4 w-4 text-primary-600" />
                                        {activity.name}
                                      </li>
                                    ) : null;
                                  })}
                                </ul>
                              ) : (
                                <p className="text-gray-500 text-sm">No scheduled activities</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'transport' && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium mb-4">Transportation</h4>
                        <div className="space-y-4">
                          {transport && (
                            <div className="flex items-center gap-3">
                              <div className="bg-primary-50 p-2 rounded-full">
                                <Plane className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h5 className="font-medium">{transport.type}</h5>
                                <p className="text-sm text-gray-600">{transport.description}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            {pkg.transportIds?.length ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-600" />
                            )}
                            <span>
                              {pkg.transportIds?.length ? 'Included in package' : 'Not included'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'meals' && itinerary && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium mb-4">Included Meals</h4>
                        <div className="space-y-3">
                          {itinerary.map((day, index) => (
                            <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                              <h5 className="font-medium mb-2">Day {day.day}</h5>
                              {day.meals && day.meals.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {day.meals.map((mealId: string, i: number) => {
                                    const meal = getMealById(mealId);
                                    return meal ? (
                                      <span
                                        key={i}
                                        className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm"
                                      >
                                        {meal.type}
                                      </span>
                                    ) : null;
                                  })}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">No meals included</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'analysis' && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium mb-6">Package Analysis Overview</h4>
                        <div className="aspect-square">
                          <Radar 
                            data={getRadarChartData()} 
                            options={{
                              scales: {
                                r: {
                                  angleLines: { display: true },
                                  suggestedMin: 0,
                                  suggestedMax: 100,
                                  ticks: {
                                    display: false
                                  }
                                }
                              },
                              plugins: {
                                legend: {
                                  position: 'bottom'
                                }
                              }
                            }} 
                          />
                        </div>
                        <div className="mt-6">
                          <h5 className="font-medium mb-3">Analysis Insights</h5>
                          <ul className="space-y-2">
                            <li className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">{pkg.title}</span>: 
                              {pkg.transportIds?.length ? " Includes transportation, " : " Limited transportation, "}
                              {itinerary?.reduce((acc, day) => acc + (day.activities?.length || 0), 0)} activities, and
                              {itinerary?.reduce((acc, day) => acc + (day.meals?.length || 0), 0)} meals included.
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  className="btn-primary w-full"
                >
                  View Details
                </button>
                <button className="btn-outline w-full">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;