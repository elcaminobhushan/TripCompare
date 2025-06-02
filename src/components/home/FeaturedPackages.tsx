import React from 'react';
import { Package } from '../../types';
import PackageCard from '../package/PackageCard';
import { packages } from '../../data/packages';

const FeaturedPackages: React.FC = () => {
  // Filter featured packages
  const featuredPackages: Package[] = packages.filter(pkg => pkg.featured);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked holiday packages with the best value, experiences, and amenities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPackages.map((packageItem) => (
            <PackageCard 
              key={packageItem.id} 
              packageData={packageItem} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;