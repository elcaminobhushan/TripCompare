import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../search/SearchForm';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (searchParams: any) => {
    const queryParams = new URLSearchParams({
      destination: searchParams.destination,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      travelers: searchParams.travelers.toString()
    });
    
    navigate(`/packages?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-[600px] md:h-[700px]">
      {/* Hero Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-[float_4s_ease-in-out_infinite]">
            Find Your Perfect Vacation
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Compare thousands of holiday packages to find the best deals for your dream getaway
          </p>
          
          {/* Search Form */}
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;