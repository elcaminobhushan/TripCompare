import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
      {/* Hero Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect Vacation
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Compare thousands of holiday packages to find the best deals for your dream getaway
          </p>
          
          {/* Search Option */}
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm sm:text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn-primary sm:w-auto w-full py-2.5 sm:py-3 px-4 sm:px-6 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Search Packages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;