import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Globe, MapPin, Calendar, DollarSign } from 'lucide-react';
import { processUserInput } from '../../services/chatService';

interface TravelPreferences {
  destination?: string;
  budget: number;
  duration: number;
  travelType: string;
  interests: string[];
  accommodation: string;
}

const TravelPreferencesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TravelPreferences>({
    budget: 2000,
    duration: 7,
    travelType: '',
    interests: [],
    accommodation: ''
  });

  const handleSubmit = () => {
    // Generate a natural language query from preferences
    const query = `I'm looking for a ${preferences.travelType} vacation${
      preferences.destination ? ` in ${preferences.destination}` : ''
    } for ${preferences.duration} days with a budget of ₹${preferences.budget}${
      preferences.interests.length > 0 ? `. I'm interested in ${preferences.interests.join(', ')}` : ''
    }. Please recommend the best package.`;
    
    // Process the query and store the response
    const initialResponse = processUserInput(query);
    localStorage.setItem('initialAIResponse', JSON.stringify({
      ...initialResponse,
      content: query // Store the original query as content
    }));
    
    // Store preferences and navigate
    localStorage.setItem('travelPreferences', JSON.stringify(preferences));
    navigate('/ai-comparison');
  };

  const questions = [
    {
      title: "Where would you like to go?",
      icon: Globe,
      options: ['Bali', 'Swiss Alps', 'Maldives', 'Greece', 'Japan', 'Thailand'],
      field: 'destination'
    },
    {
      title: "What's your travel style?",
      icon: MapPin,
      options: ['Luxury', 'Adventure', 'Cultural', 'Beach', 'Family', 'Wellness'],
      field: 'travelType'
    },
    {
      title: "What interests you the most?",
      icon: Sparkles,
      options: ['Local Food', 'History', 'Nature', 'Shopping', 'Nightlife', 'Photography'],
      field: 'interests',
      multiple: true
    }
  ];

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
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary-600" />
                  <h2 className="text-2xl font-semibold">Let's Plan Your Dream Trip</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / (questions.length + 1)) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="min-h-[300px]">
                  {step <= questions.length ? (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        {React.createElement(questions[step - 1].icon, {
                          className: "h-5 w-5 text-primary-600"
                        })}
                        <h3 className="text-xl font-medium">{questions[step - 1].title}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {questions[step - 1].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              if (questions[step - 1].multiple) {
                                setPreferences(prev => ({
                                  ...prev,
                                  interests: prev.interests.includes(option)
                                    ? prev.interests.filter(i => i !== option)
                                    : [...prev.interests, option]
                                }));
                              } else {
                                setPreferences(prev => ({
                                  ...prev,
                                  [questions[step - 1].field]: option
                                }));
                                setStep(step + 1);
                              }
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              questions[step - 1].multiple
                                ? preferences.interests.includes(option)
                                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-gray-300'
                                : preferences[questions[step - 1].field as keyof TravelPreferences] === option
                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <label className="block text-lg font-medium">
                            How long would you like to travel?
                          </label>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={preferences.duration}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            duration: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>1 day</span>
                          <span>{preferences.duration} days</span>
                          <span>14 days</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-primary-600" />
                          <label className="block text-lg font-medium">
                            What's your budget per person?
                          </label>
                        </div>
                        <input
                          type="range"
                          min="1000"
                          max="10000"
                          step="1000"
                          value={preferences.budget}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            budget: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>₹1,000</span>
                          <span>₹{preferences.budget.toLocaleString()}</span>
                          <span>₹10,000</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={step < questions.length + 1 ? () => setStep(step + 1) : handleSubmit}
                  className="btn-primary ml-auto flex items-center gap-2"
                >
                  {step === questions.length + 1 ? (
                    <>Start AI Comparison <Sparkles className="h-4 w-4" /></>
                  ) : (
                    <>Next <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TravelPreferencesModal;