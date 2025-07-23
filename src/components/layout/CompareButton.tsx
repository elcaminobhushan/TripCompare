import { useNavigate, useLocation } from 'react-router-dom';
import { useCompareStore } from '../../store/useStore';
import { Scale } from 'lucide-react';

export default function CompareButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const compareList = useCompareStore((state) => state.compareList);

  const handleCompareClick = () => {
    navigate('/company-comparison');
  };

  // Don't show buttons on comparison pages
  if (location.pathname === '/company-comparison' || compareList.length < 1) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"> 
      <button
        onClick={handleCompareClick}
        className="btn-primary shadow-lg flex items-center gap-2 px-6 py-3"
      >
        <Scale className="h-5 w-5" />
        Compare Companies
      </button>
    </div>
  );
}