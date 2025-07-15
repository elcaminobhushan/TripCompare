import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ChatInterface from '../components/ai/ChatInterface';
import ItineraryPlanner from '../components/itinerary/ItineraryPlanner';
import { Package } from '../types';
import { getPackageById } from '../data/packages';

const AIComparisonPage: React.FC = () => {
  const location = useLocation();
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [activeView, setActiveView] = useState<'chat' | 'itinerary'>('chat');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">AI Travel Assistant</h1>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('chat')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeView === 'chat'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveView('itinerary')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeView === 'itinerary'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Itinerary
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden">
          {activeView === 'chat' ? (
            <ChatInterface />
          ) : (
            <ItineraryPlanner packages={currentPackage ? [currentPackage] : []} />
          )}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="h-screen flex bg-gray-50">
      <div className="w-1/2 h-full border-r border-gray-200">
        <ItineraryPlanner packages={currentPackage ? [currentPackage] : []} />
      </div>
      <div className="w-1/2 h-full">
        <ChatInterface />
      </div>
    </div>
  );
};

export default AIComparisonPage;