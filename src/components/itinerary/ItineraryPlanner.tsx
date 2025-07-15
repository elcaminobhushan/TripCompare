import React, { useState, useEffect } from 'react';
import { Package } from '../../types';
import { 
  Activity, Phone, Eye, Calendar, Clock, MapPinned, BedDouble, Car, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingContactForm from '../contact/FloatingContactForm';
import { getPackageItinerary } from '../../data/itineraries';
import { getActivityById } from '../../data/activities';
import { getAccommodationById } from '../../data/accommodations';
import { getTransportById } from '../../data/transport';
import FullItineraryModal from './FullItineraryModal';

interface ItineraryPlannerProps {
  packages: Package[];
}

const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ packages }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [itineraryDays, setItineraryDays] = useState<any[]>([]);
  const [isItineraryVisible, setIsItineraryVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showDayTabs, setShowDayTabs] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (packages.length > 0) {
      const newPackage = packages[0];
      const newItinerary = getPackageItinerary(newPackage.id);
      
      if (
        !currentPackage || 
        currentPackage.id !== newPackage.id ||
        !itineraryDays.length ||
        itineraryDays[0]?.packageId !== newPackage.id
      ) {
        setCurrentPackage(newPackage);
        setItineraryDays(newItinerary || []);
        setIsItineraryVisible(true);
        setActiveDay(0);
      }
    } else {
      handleClearItinerary();
    }
  }, [packages]);

  const handleClearItinerary = () => {
    setCurrentPackage(null);
    setItineraryDays([]);
    setIsItineraryVisible(false);
    setActiveDay(0);
  };

  if (!currentPackage || !isItineraryVisible || itineraryDays.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <Activity className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 text-primary-600" />
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">No Itinerary Selected</h3>
          <p className="text-gray-600 max-w-sm mx-auto text-sm md:text-base">
            AI recommended itineraries will appear here. Let me know your preferences and I'll help you find the perfect package.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 p-3 md:p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-2xl font-semibold flex items-center gap-2 truncate">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary-600 flex-shrink-0" />
              <span className="truncate">{currentPackage.title}</span>
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{currentPackage.duration} days itinerary</p>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button
              onClick={() => setShowFullItinerary(true)}
              className="btn-outline flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm"
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">View Full</span>
            </button>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="btn-primary flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm"
            >
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Request Call</span>
            </button>
          </div>
        </div>

        {/* Day Tabs */}
        {isItineraryVisible && itineraryDays.length > 0 && (
          <div className="relative">
            {isMobile ? (
              <div>
                <button
                  onClick={() => setShowDayTabs(!showDayTabs)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">Day {itineraryDays[activeDay]?.day}</span>
                  <Menu className="h-4 w-4" />
                </button>
                
                {showDayTabs && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {itineraryDays.map((day, index) => (
                      <button
                        key={`${day.id}-${index}`}
                        onClick={() => {
                          setActiveDay(index);
                          setShowDayTabs(false);
                        }}
                        className={`w-full text-left p-3 border-b border-gray-100 last:border-0 ${
                          activeDay === index ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">Day {day.day}</div>
                        <div className="text-sm text-gray-500">{day.activities.length} activities</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-6 px-2">
                <div className="flex bg-gray-50 p-1 rounded-lg shadow-sm">
                  {itineraryDays.map((day, index) => (
                    <button
                      key={`${day.id}-${index}`}
                      onClick={() => setActiveDay(index)}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap font-medium ${
                        activeDay === index
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <span>Day {day.day}</span>
                      <span className={`text-xs md:text-sm ${
                        activeDay === index ? 'text-primary-500' : 'text-gray-500'
                      }`}>
                        ({day.activities.length} activities)
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Clear Itinerary Button */}
      {isItineraryVisible && (
        <div className="bg-primary-50 border-b border-primary-100 p-2 text-center">
          <button
            onClick={handleClearItinerary}
            className="text-primary-600 hover:text-primary-700 text-xs md:text-sm font-medium"
          >
            Clear Itinerary
          </button>
        </div>
      )}

      {/* Itinerary Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6">
        <AnimatePresence mode="wait">
          {itineraryDays[activeDay] && (
            <motion.div
              key={`${itineraryDays[activeDay].id}-${activeDay}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Location */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Location</h3>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{itineraryDays[activeDay].title}</h4>
                  <p className="text-gray-600 mt-1 text-xs md:text-sm">{itineraryDays[activeDay].description}</p>
                </div>
              </div>

              {/* Accommodation */}
              {itineraryDays[activeDay].accommodation && (
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Accommodation</h3>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                    {(() => {
                      const accommodation = getAccommodationById(itineraryDays[activeDay].accommodation);
                      return accommodation ? (
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm md:text-base">{accommodation.name}</h4>
                          <p className="text-gray-600 mt-1 text-xs md:text-sm">{accommodation.type}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}

              {/* Activities */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Activities</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {itineraryDays[activeDay].activities.map((activityId: string) => {
                    const activity = getActivityById(activityId);
                    return activity ? (
                      <motion.div
                        key={activity.id}
                        layout
                        className="bg-white rounded-xl p-3 md:p-4 border border-gray-100"
                      >
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-gray-900 text-sm md:text-base">{activity.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                              <span className="text-xs md:text-sm text-gray-600">{activity.duration} hours</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Transport */}
              {itineraryDays[activeDay].transport && (
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Transport</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {itineraryDays[activeDay].transport.map((transportId: string) => {
                      const transport = getTransportById(transportId);
                      return transport ? (
                        <div key={transport.id} className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                          <h4 className="font-medium text-gray-900 text-sm md:text-base">{transport.name}</h4>
                          <p className="text-gray-600 mt-1 text-xs md:text-sm">{transport.description}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      {currentPackage && (
        <FullItineraryModal
          isOpen={showFullItinerary}
          onClose={() => setShowFullItinerary(false)}
          packageData={currentPackage}
        />
      )}

      <FloatingContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        packageTitle={currentPackage.title}
      />
    </div>
  );
};

export default ItineraryPlanner;