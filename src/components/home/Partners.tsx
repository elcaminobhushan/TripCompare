import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Award, Shield } from 'lucide-react';

const partners = [
  {
    name: "SkyWings Travel",
    logo: "https://images.pexels.com/photos/5473957/pexels-photo-5473957.jpeg",
    description: "Leading provider of luxury travel experiences worldwide."
  },
  {
    name: "Adventure Quest",
    logo: "https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg",
    description: "Specialists in adventure and outdoor holiday packages."
  },
  {
    name: "Paradise Holidays",
    logo: "https://images.pexels.com/photos/5473944/pexels-photo-5473944.jpeg",
    description: "Expert in beach and island vacation packages."
  }
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with the most reputable travel companies to ensure you get the best experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        <div className="text-center">
          <Link to="/partners" className="btn-primary">
            View All Partners
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;