import React from 'react';
import { Search, ListFilter, Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search Packages',
    description: 'Enter your destination, dates, and traveler count to find available holiday packages.',
    icon: Search,
    color: 'bg-primary-100 text-primary-600',
    animation: 'animate-bounce'
  },
  {
    id: 2,
    title: 'Compare Options',
    description: 'Use our powerful comparison tools to analyze packages side-by-side and find the best value.',
    icon: ListFilter,
    color: 'bg-primary-100 text-secondary-600',
    animation: 'animate-pulse'
  },
  {
    id: 3,
    title: 'Book Your Dream Vacation',
    description: 'Select your perfect package and complete your booking with confidence.',
    icon: Sparkles,
    color: 'bg-accent-100 text-accent-600',
    animation: 'animate-float'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding and booking your ideal vacation package is simple with our easy 3-step process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            
            return (
              <div 
                key={step.id}
                className="text-center px-6 py-8 transform hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${step.color} mx-auto mb-6 flex items-center justify-center ${step.animation}`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;