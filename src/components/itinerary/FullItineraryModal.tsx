import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Calendar } from 'lucide-react';
import { generateItineraryPDF } from '../../utils/pdfGenerator';
import { Package } from '../../types';
import { getPackageItinerary } from '../../data/itineraries';
import { getActivityById } from '../../data/activities';
import { getAccommodationById } from '../../data/accommodations';
import { getTransportById } from '../../data/transport';

interface FullItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: Package;
}

const FullItineraryModal: React.FC<FullItineraryModalProps> = ({ isOpen, onClose, packageData }) => {
  const itinerary = getPackageItinerary(packageData.id);

  const handleDownload = () => {
    generateItineraryPDF(packageData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-semibold">{packageData.title}</h2>
                  <p className="text-gray-600">{packageData.duration} days itinerary</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="btn-outline flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-12">
                {itinerary.map((day) => (
                  <div key={day.id} className="space-y-6">
                    <h3 className="text-xl font-semibold">Day {day.day}</h3>
                    
                    {/* Overview */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="font-medium mb-2">{day.title}</h4>
                      <p className="text-gray-600">{day.description}</p>
                    </div>

                    {/* Activities */}
                    {day.activities.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Activities</h4>
                        <div className="grid gap-4">
                          {day.activities.map((activityId) => {
                            const activity = getActivityById(activityId);
                            return activity && (
                              <div key={activityId} className="bg-white rounded-xl p-4 border border-gray-200">
                                <h5 className="font-medium">{activity.name}</h5>
                                <p className="text-gray-600 mt-1">{activity.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Accommodation */}
                    {day.accommodation && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Accommodation</h4>
                        {(() => {
                          const accommodation = getAccommodationById(day.accommodation);
                          return accommodation && (
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                              <h5 className="font-medium">{accommodation.name}</h5>
                              <p className="text-gray-600 mt-1">{accommodation.type}</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Transport */}
                    {day.transport && day.transport.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Transport</h4>
                        <div className="grid gap-4">
                          {day.transport.map((transportId) => {
                            const transport = getTransportById(transportId);
                            return transport && (
                              <div key={transportId} className="bg-white rounded-xl p-4 border border-gray-200">
                                <h5 className="font-medium">{transport.name}</h5>
                                <p className="text-gray-600 mt-1">{transport.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullItineraryModal;