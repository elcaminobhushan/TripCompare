import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building, Star, Plane, Bus, Train, Ship, 
  Utensils, Check, X, TrendingUp, BarChart3, PieChart,
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
import { tourOperators } from '../data/tour-operators';

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

interface CompanyData {
  id: string;
  name: string;
  hotels: number;
  activities: number;
  transport: string[];
  mealsIncluded: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  reviews: number;
  price: number;
  packages: number;
  specializations: string[];
}

const companyData: CompanyData[] = [
  {
    id: 'to1',
    name: 'Paradise Voyages',
    hotels: 4.0,
    activities: 8,
    transport: ['flight', 'bus'],
    mealsIncluded: {
      breakfast: true,
      lunch: false,
      dinner: true
    },
    reviews: 4.0,
    price: 24999,
    packages: 45,
    specializations: ['Luxury Beach Resorts', 'Cultural Experiences', 'Honeymoon Packages']
  },
  {
    id: 'to2',
    name: 'Alpine Adventures',
    hotels: 3.0,
    activities: 7,
    transport: ['ship', 'bus'],
    mealsIncluded: {
      breakfast: false,
      lunch: true,
      dinner: true
    },
    reviews: 3.0,
    price: 21499,
    packages: 32,
    specializations: ['Winter Sports', 'Mountain Expeditions', 'Ski Packages']
  },
  {
    id: 'to3',
    name: 'Cultural Voyages',
    hotels: 4.5,
    activities: 6,
    transport: ['flight'],
    mealsIncluded: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    reviews: 4.0,
    price: 27000,
    packages: 38,
    specializations: ['Cultural Tours', 'Heritage Sites', 'Local Experiences']
  },
  {
    id: 'to4',
    name: 'Budget Travels',
    hotels: 3.0,
    activities: 9,
    transport: ['train', 'bus'],
    mealsIncluded: {
      breakfast: false,
      lunch: true,
      dinner: false
    },
    reviews: 2.0,
    price: 19999,
    packages: 52,
    specializations: ['Budget Tours', 'Group Travel', 'Student Packages']
  }
];

const CompanyComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState<'bar' | 'radar' | 'doughnut'>('bar');

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

  const getMealIndicator = (included: boolean, type: string) => {
    const colors = {
      breakfast: included ? 'bg-green-500' : 'bg-purple-300',
      lunch: included ? 'bg-green-500' : 'bg-gray-300',
      dinner: included ? 'bg-green-500' : 'bg-purple-300'
    };
    
    return (
      <div className={`w-8 h-8 rounded flex items-center justify-center ${colors[type as keyof typeof colors]}`}>
        <span className="text-white font-medium text-sm">
          {type.charAt(0).toUpperCase()}
        </span>
      </div>
    );
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
        data: companyData.map(company => company.activities),
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
                      <span className="text-lg font-semibold">{company.activities}/10</span>
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
                      <div className="flex items-center justify-center gap-2">
                        {getMealIndicator(company.mealsIncluded.breakfast, 'breakfast')}
                        {getMealIndicator(company.mealsIncluded.lunch, 'lunch')}
                        {getMealIndicator(company.mealsIncluded.dinner, 'dinner')}
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
                        ₹{company.price.toLocaleString()}
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
                      Budget Travels offers the most activities (9/10) at the lowest price (₹19,999)
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-medium text-green-900">Premium Experience</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Cultural Voyages provides the highest hotel rating (4.5/5) with all meals included
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                    <h4 className="font-medium text-amber-900">Balanced Option</h4>
                    <p className="text-amber-700 text-sm mt-1">
                      Paradise Voyages offers good balance across all categories with strong reviews
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
                      For budget-conscious travelers: Choose Budget Travels for maximum activities
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      For luxury seekers: Cultural Voyages offers premium accommodations and dining
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      For first-time travelers: Paradise Voyages provides reliable, well-rounded service
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