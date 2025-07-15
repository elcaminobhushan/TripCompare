import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building, Star, Plane, Bus, Train, Ship, 
  Utensils, TrendingUp, BarChart3, PieChart,
  Hotel, Activity, Car, DollarSign
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from 'chart.js';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
import { useCompareStore } from '../store/useStore';
import { getPackageById } from '../data/packages';
import { tourOperators } from '../data/tour-operators';
import { getPackageItinerary } from '../data/itineraries';
import { getAccommodationById } from '../data/accommodations';
import { getActivityById } from '../data/activities';
import { getMealById } from '../data/meals';
import { getPackageReviews } from '../data/reviews';
import { formatPrice } from '../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement
);


const CompanyComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const compareList = useCompareStore((state) => state.compareList);
  const [activeChart, setActiveChart] = useState<'bar' | 'radar' | 'doughnut'>('bar');

  // Get selected packages and their companies
  const selectedPackages = compareList
    .map(id => getPackageById(id))
    .filter(Boolean);
  
  // Get unique companies from selected packages
  const uniqueCompanies = Array.from(
    new Set(selectedPackages.map(pkg => pkg?.tourOperatorId))
  ).map(operatorId => {
    const operator = tourOperators.find((op: any) => op.id === operatorId);
    const operatorPackages = selectedPackages.filter(pkg => pkg?.tourOperatorId === operatorId);
    return { operator, packages: operatorPackages };
  }).filter(item => item.operator);

  // If no packages selected or less than 2 companies, show message
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">No Packages Selected</h1>
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

  if (uniqueCompanies.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Need Multiple Companies</h1>
            <p className="text-gray-600 mb-8">
              Select packages from at least 2 different tour operators to compare companies.
            </p>
            <button
              onClick={() => navigate('/packages')}
              className="btn-primary"
            >
              Browse More Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Create company data from selected packages
  const companyData = uniqueCompanies.map(({ operator, packages }) => {
    if (!operator) return null;
    
    // Get all itineraries for this company's packages
    const allItineraries = packages.map(pkg => pkg ? getPackageItinerary(pkg.id) : []).flat();
    
    // Get all accommodations
    const accommodations = packages.map(pkg => pkg ? getAccommodationById(pkg.accommodationId) : null).filter(Boolean);
    const avgHotelRating = accommodations.length > 0 
      ? accommodations.reduce((sum, acc) => sum + (acc?.rating || 0), 0) / accommodations.length 
      : 0;
    
    // Get all unique activities
    const allActivities = allItineraries.reduce((acc, day) => {
      const dayActivities = day.activities.map(id => getActivityById(id)).filter(Boolean);
      return [...acc, ...dayActivities];
    }, [] as any[]);
    const uniqueActivities = allActivities.filter((activity, index, self) => 
      index === self.findIndex(a => a.id === activity.id)
    );
    
    // Get all unique meals
    const allMeals = allItineraries.reduce((acc, day) => {
      const dayMeals = day.meals.map(id => getMealById(id)).filter(Boolean);
      return [...acc, ...dayMeals];
    }, [] as any[]);
    const uniqueMeals = allMeals.filter((meal, index, self) => 
      index === self.findIndex(m => m.id === meal.id)
    );
    
    // Get reviews for all packages
    const allReviews = packages.map(pkg => pkg ? getPackageReviews(pkg.id) : []).flat();
    const avgReviewRating = allReviews.length > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length 
      : 0;
    
    // Calculate average price
    const avgPrice = packages.reduce((sum, pkg) => sum + (pkg?.price || 0), 0) / packages.length;
    
    return {
      id: operator.id,
      name: operator.name,
      hotels: avgHotelRating,
      activities: uniqueActivities,
      transport: ['flight', 'bus'], // Simulated data
      mealsIncluded: uniqueMeals,
      reviews: avgReviewRating,
      price: Math.round(avgPrice),
      packages: packages.length,
      specializations: operator.specializations,
      selectedPackages: packages,
      reviewCount: allReviews.length
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case 'flight': return <Plane className="h-5 w-5 text-blue-500" />;
      case 'bus': return <Bus className="h-5 w-5 text-green-500" />;
      case 'train': return <Train className="h-5 w-5 text-purple-500" />;
      case 'ship': return <Ship className="h-5 w-5 text-cyan-500" />;
      default: return <Car className="h-5 w-5 text-gray-500" />;
    }
  };



  // Chart data
  const barChartData = {
    labels: companyData.map(company => company.name),
    datasets: [
      {
        label: 'Hotel Rating',
        data: companyData.map(company => company.hotels),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Activities Score',
        data: companyData.map(company => company.activities.length),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: 'Review Rating',
        data: companyData.map(company => company.reviews),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1,
      }
    ]
  };

  const radarChartData = {
    labels: ['Hotels', 'Activities', 'Transport Options', 'Meal Inclusion', 'Reviews', 'Value'],
    datasets: companyData.map((company, index) => {
      const colors = [
        'rgba(59, 130, 246, 0.2)',
        'rgba(16, 185, 129, 0.2)',
        'rgba(245, 158, 11, 0.2)',
        'rgba(239, 68, 68, 0.2)'
      ];
      const borderColors = [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)'
      ];

      const mealScore = Object.values(company.mealsIncluded).filter(Boolean).length;
      const valueScore = 5 - (company.price / 10000); // Inverse price for value

      return {
        label: company.name,
        data: [
          company.hotels,
          company.activities,
          company.transport.length * 2,
          mealScore,
          company.reviews,
          Math.max(1, valueScore)
        ],
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 2,
      };
    })
  };

  const doughnutChartData = {
    labels: companyData.map(company => company.name),
    datasets: [
      {
        label: 'Package Count',
        data: companyData.map(company => company.packages),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Building className="h-7 w-7 text-primary-600" />
                  Company Comparison
                </h1>
                <p className="text-gray-600">
                  Compare tour operators across different categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  {companyData.map((company) => (
                    <th key={company.id} className="px-6 py-4 text-center font-semibold min-w-[200px]">
                      {company.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Hotels Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    Hotels
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {renderStars(company.hotels)}
                        <span className="ml-2 text-gray-600">({company.hotels}/5)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Activities Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    Activities
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4 text-center">
                      <div className="space-y-1">
                        {company.activities.map((activity: any, index: number) => (
                          <div key={index} className="text-sm">
                            • {activity.name}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Transport Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <Car className="h-5 w-5 text-purple-600" />
                    Transport
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {company.transport.map((transport, index) => (
                          <div key={index}>
                            {getTransportIcon(transport)}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Meals Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-600" />
                    Meals Included
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4">
                      <div className="space-y-1">
                        {company.mealsIncluded && (
                          <div className="text-sm capitalize">
                            • Breakfast ({1})
                          </div>
                        )}
                        {!company.mealsIncluded && (
                          <span className="text-gray-500 text-sm">No meals included</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Reviews Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-600" />
                    Reviews
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {renderStars(company.reviews)}
                        <span className="ml-2 text-gray-600">({company.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Price (₹)
                  </td>
                  {companyData.map((company) => (
                    <td key={company.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        {formatPrice(company.price)}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary-600" />
              Analysis & Insights
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveChart('bar')}
                className={`p-2 rounded-lg ${activeChart === 'bar' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <BarChart3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveChart('radar')}
                className={`p-2 rounded-lg ${activeChart === 'radar' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <TrendingUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveChart('doughnut')}
                className={`p-2 rounded-lg ${activeChart === 'doughnut' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <PieChart className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                {activeChart === 'bar' && 'Performance Comparison'}
                {activeChart === 'radar' && 'Overall Capability Analysis'}
                {activeChart === 'doughnut' && 'Package Distribution'}
              </h3>
              <div className="h-80">
                {activeChart === 'bar' && <Bar data={barChartData} options={chartOptions} />}
                {activeChart === 'radar' && <Radar data={radarChartData} options={radarOptions} />}
                {activeChart === 'doughnut' && <Doughnut data={doughnutChartData} />}
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-medium text-blue-900">Best Overall Value</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      {companyData.reduce((best, company) => 
                        company.price < best.price ? company : best
                      ).name} offers competitive pricing with good activity selection
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-medium text-green-900">Premium Experience</h4>
                    <p className="text-green-700 text-sm mt-1">
                      {companyData.reduce((best, company) => 
                        company.hotels > best.hotels ? company : best
                      ).name} provides the highest hotel rating with quality accommodations
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                    <h4 className="font-medium text-amber-900">Balanced Option</h4>
                    <p className="text-amber-700 text-sm mt-1">
                      {companyData.reduce((best, company) => 
                        company.reviews > best.reviews ? company : best
                      ).name} offers good balance across all categories with strong reviews
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Compare packages directly by clicking on them in the table above
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Consider both company reputation and specific package features
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Review customer ratings and included amenities before deciding
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyComparisonPage;