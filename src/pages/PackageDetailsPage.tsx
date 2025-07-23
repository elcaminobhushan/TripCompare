import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePackage, useRelatedPackages } from '@/hooks/usePackages';
import { Package } from '@/types';
import PackageDetails from '@/components/package/PackageDetails';
import RelatedPackages from '@/components/package/RelatedPackages';

const PackageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: foundPackage, isLoading: isPackageLoading } = usePackage(id ?? '');
  const { data: foundRelatedPackages, isLoading: isRelatedLoading } = useRelatedPackages(id ?? '', 3);

  const [packageData, setPackageData] = useState<Package | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);

  useEffect(() => {
    if (foundPackage) setPackageData(foundPackage);
  }, [foundPackage]);

  useEffect(() => {
    if (foundRelatedPackages) setRelatedPackages(foundRelatedPackages);
  }, [foundRelatedPackages]);

  if (isPackageLoading || isRelatedLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <PackageDetails packageData={packageData} />
      <RelatedPackages packages={relatedPackages} />
    </div>
  );
};

export default PackageDetailsPage;
