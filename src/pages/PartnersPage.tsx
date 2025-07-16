import React from 'react';
import { tourOperators } from '../data/tour-operators'; 

const partners = tourOperators;

const PartnersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with the most trusted names in the travel industry to bring you the best holiday packages at competitive prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 relative">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  {partner.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{partner.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge bg-primary-50 text-primary-600">Verified Partner</span>
                  <span className="badge bg-green-50 text-green-600">Top Rated</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 bg-primary-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Partner</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our network of trusted travel partners and reach millions of potential customers looking for their next perfect vacation.
          </p>
          <button className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
            Partner with Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;