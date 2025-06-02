import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../store/useStore';
import { Scale } from 'lucide-react';

const CompareButton: React.FC = () => {
  const navigate = useNavigate();
  const compareList = useCompareStore((state) => state.compareList);

  // Only render if there are at least 2 items to compare
  if (compareList.length < 1) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate('/compare')}
        className="btn-primary shadow-lg flex items-center gap-2 px-6 py-3 animate-[slideIn_0.3s_ease-out]"
      >
        <Scale className="h-5 w-5" />
        Compare {compareList.length} Packages
      </button>
    </div>
  );
};

export default CompareButton;