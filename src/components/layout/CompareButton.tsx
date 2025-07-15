import { useNavigate, useLocation } from 'react-router-dom';
import { useCompareStore } from '../../store/useStore';
import { Scale, Sparkles } from 'lucide-react';
import { getPackageById } from '../../data/packages';
import { Package } from '../../types';

export default function CompareButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const compareList = useCompareStore((state) => state.compareList);

  const handleCompareClick = () => {
    navigate('/company-comparison');
  };

  const handleAskAIClick = () => {
    // Get package details
    const packages = compareList
      .map(id => getPackageById(id))
      .filter((pkg): pkg is Package => pkg !== undefined);
    
    // Store packages for AI comparison
    localStorage.setItem('initialAIResponse', JSON.stringify({
      packages,
      content: `Compare these packages: ${packages.map((pkg: Package) => pkg.title).join(' and ')}`
    }));
    
    navigate('/ai-comparison');
  };

  // Don't show buttons on comparison pages
  if (location.pathname === '/ai-comparison' || location.pathname === '/company-comparison' || compareList.length < 1) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={handleAskAIClick}
        className="btn bg-purple-600 hover:bg-purple-700 text-white shadow-lg flex items-center gap-2 px-6 py-3"
      >
        <Sparkles className="h-5 w-5" />
        Ask AI
      </button>
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