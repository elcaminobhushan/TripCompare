import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { packages, getPackageById } from '../data/packages';
import { destinations } from '../data/destinations';
import { Package } from '../types';
import { useCompare } from '../hooks/useCompare';

// Components
import SearchBar from '../components/package/listing/SearchBar';
import DestinationPills from '../components/package/listing/DestinationPills';
import TrendingDestinations from '../components/package/listing/TrendingDestinations';
import PackageFilters from '../components/package/listing/PackageFilters';
import PackageSort from '../components/package/listing/PackageSort';
import PackageCard from '../components/package/PackageCard';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'duration-short' | 'duration-long';

interface FilterState {
  priceRange: [number, number];
  duration: [number, number];
  rating: number | null;
  amenities: string[];
  travelTheme: string[];
  inclusions: string[];
}

const trendingDestinations = [
  {
    name: "Bali",
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    searches: 1250
  },
  {
    name: "Swiss Alps",
    image: "https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg",
    searches: 980
  },
  {
    name: "Maldives",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
    searches: 875
  }
];

const PackageListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDestinationId, setActiveDestinationId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('price-low');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['price']);
  const { compareList } = useCompare();
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    duration: [1, 14],
    rating: null,
    amenities: [],
    travelTheme: [],
    inclusions: []
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const destination = queryParams.get('destination');
    
    if (destination) {
      setActiveDestinationId(destination);
    }
  }, [location.search]);

  const handleSearch = () => {
    let results = [...packages];
    
    if (activeDestinationId !== 'all') {
      results = results.filter(pkg => pkg.destinationId === activeDestinationId);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(pkg =>
        pkg.title.toLowerCase().includes(query) ||
        destinations.find(d => d.id === pkg.destinationId)?.name.toLowerCase().includes(query)
      );
    }

    results = results.filter(pkg => {
      const matchesPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
      const matchesDuration = pkg.duration >= filters.duration[0] && pkg.duration <= filters.duration[1];
      const matchesRating = !filters.rating || pkg.rating >= filters.rating;
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => pkg.amenities.includes(amenity));
      
      return matchesPrice && matchesDuration && matchesRating && matchesAmenities;
    });

    setFilteredPackages(results);
  };

  useEffect(() => {
    handleSearch();
  }, [activeDestinationId, filters, searchQuery]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleFilter = (filter: string) => {
    setExpandedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const sortPackages = (packages: Package[]): Package[] => {
    const sorted = [...packages];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'duration-short':
        return sorted.sort((a, b) => a.duration - b.duration);
      case 'duration-long':
        return sorted.sort((a, b) => b.duration - a.duration);
      default:
        return sorted;
    }
  };

  const sortedPackages = sortPackages(filteredPackages);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <SearchBar
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            onSearchChange={setSearchQuery}
            onDateChange={setSelectedDate}
          />

          <DestinationPills
            destinations={destinations}
            activeDestinationId={activeDestinationId}
            onDestinationChange={setActiveDestinationId}
          />
        </div>
      </div>

      {/* Trending Destinations */}
      <TrendingDestinations
        destinations={trendingDestinations}
        onDestinationSelect={(name) => {
          const dest = destinations.find(d => d.name === name);
          if (dest) {
            setActiveDestinationId(dest.id);
          }
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <PackageFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={() => {
                setFilters({
                  priceRange: [0, 5000],
                  duration: [1, 14],
                  rating: null,
                  amenities: [],
                  travelTheme: [],
                  inclusions: []
                });
              }}
              expandedFilters={expandedFilters}
              onToggleFilter={toggleFilter}
            />
          </div>

          {/* Package Listings */}
          <div className="col-span-12 lg:col-span-9">
            <PackageSort
              sortOption={sortOption}
              onSortChange={setSortOption}
              compareCount={compareList.length}
            />

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700">
                Showing <span className="font-medium">{sortedPackages.length}</span> packages
                {activeDestinationId !== 'all' && (
                  <> in <span className="font-medium">{destinations.find(d => d.id === activeDestinationId)?.name}</span></>
                )}
              </p>
            </div>

            {/* Package Grid */}
            {sortedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPackages.map((packageItem) => (
                  <PackageCard
                    key={packageItem.id}
                    packageData={packageItem}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to see more results.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 5000],
                      duration: [1, 14],
                      rating: null,
                      amenities: [],
                      travelTheme: [],
                      inclusions: []
                    });
                    setSearchQuery('');
                    setActiveDestinationId('all');
                  }}
                  className="btn-outline"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageListingPage;