import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Shield, CalendarCheck, CreditCard, CheckCircle } from 'lucide-react';
import { getPackagePolicies, Policy } from '../../../data/policies';

interface PoliciesProps {
  packageId: string;
}

const Policies: React.FC<PoliciesProps> = ({ packageId }) => {
  const [expandedPolicies, setExpandedPolicies] = useState<string[]>([]);
  const policies = getPackagePolicies(packageId);

  const handlePolicyToggle = (policyId: string) => {
    setExpandedPolicies(prev =>
      prev.includes(policyId)
        ? prev.filter(p => p !== policyId)
        : [...prev, policyId]
    );
  };

  if (!policies.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No policy information available for this package.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {policies.map((policy) => {
        const Icon = getIconForPolicyType(policy.type);
        return (
          <div key={policy.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => handlePolicyToggle(policy.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold">{policy.title}</h3>
              </div>
              {expandedPolicies.includes(policy.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedPolicies.includes(policy.id) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 mb-4">{policy.description}</p>
                <ul className="space-y-2">
                  {policy.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 mt-1" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const getIconForPolicyType = (type: Policy['type']) => {
  switch (type) {
    case 'cancellation':
      return CalendarCheck;
    case 'payment':
      return CreditCard;
    case 'booking':
      return Shield;
    case 'insurance':
      return Shield;
    case 'visa':
      return Info;
    default:
      return Info;
  }
};

export default Policies;