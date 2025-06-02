import React from 'react';
import { Star, Shield, Calendar } from 'lucide-react';
import { TourOperator as TourOperatorType } from '../../../types';

interface TourOperatorProps {
  operator: TourOperatorType;
}

const TourOperator: React.FC<TourOperatorProps> = ({ operator }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Tour Operator</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={operator.logo} 
          alt={operator.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium">{operator.name}</h3>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">{operator.rating}</span>
            <span className="text-gray-500">• Verified Partner</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Shield className="h-5 w-5 text-primary-600" />
          <span>Verified and Licensed Operator</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="h-5 w-5 text-primary-600" />
          <span>Operating Since {new Date().getFullYear() - operator.yearsInBusiness}</span>
        </div>
      </div>
    </div>
  );
};

export default TourOperator;