import React from 'react';
import { Package } from '../../types';
import PackageCard from './PackageCard';

interface RelatedPackagesProps {
  packages: Package[];
}

const RelatedPackages: React.FC<RelatedPackagesProps> = ({ packages }) => {
  if (packages.length === 0) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-semibold mb-6">Similar Packages You Might Like</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((packageItem) => (
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

export default RelatedPackages;