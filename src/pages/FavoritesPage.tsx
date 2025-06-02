import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Package } from '../types';
import { getPackageById } from '../data/packages';
import { useFavoritesStore } from '../store/useStore';
import PackageCard from '../components/package/PackageCard';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const [favoritePackages, setFavoritePackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Fetch all packages in favorites
    const packages = favorites
      .map(id => getPackageById(id))
      .filter((pkg): pkg is Package => pkg !== undefined);
      
    setFavoritePackages(packages);
    setIsLoading(false);
  }, [favorites]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Heart className="h-7 w-7 mr-2 text-accent-500 fill-accent-500" />
            My Favorites
          </h1>
          <p className="text-gray-600">
            {favoritePackages.length > 0 
              ? 'Your saved vacation packages' 
              : 'Save your favorite packages to find them easily later'}
          </p>
        </div>
        
        {favoritePackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePackages.map((packageItem) => (
              <PackageCard
                key={packageItem.id}
                packageData={packageItem}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No favorite packages yet</h3>
            <p className="text-gray-600 mb-6">
              Start saving packages you're interested in by clicking the heart icon on any package.
            </p>
            <Link to="/packages" className="btn-primary inline-flex items-center">
              Browse Packages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;