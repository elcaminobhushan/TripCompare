import React from 'react';
import { Package } from '../../../types';
import { CheckCircle, XCircle } from 'lucide-react';
import { getPackageFeatures } from '../../../data/features';

interface InclusionsProps {
  packageData: Package;
}

const Inclusions: React.FC<InclusionsProps> = ({ packageData }) => {
  const { inclusions, exclusions } = getPackageFeatures(packageData.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          Included in Package
        </h3>
        <ul className="space-y-3">
          {inclusions.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <span className="font-medium">{item.title}</span>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-red-600">
          <XCircle className="h-5 w-5" />
          Not Included
        </h3>
        <ul className="space-y-3">
          {exclusions.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-1" />
              <div>
                <span className="font-medium">{item.title}</span>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Inclusions;