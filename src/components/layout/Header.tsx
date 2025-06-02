import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, PlaneLanding, Search, Package } from 'lucide-react';
import { useFavoritesStore } from '../../store/useStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const favorites = useFavoritesStore((state) => state.favorites);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PlaneLanding className="text-primary-600 h-8 w-8" />
            <span className="font-bold text-2xl text-primary-600">TripCompare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/destinations' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/packages" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/packages' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Packages
            </Link>
            <Link 
              to="/partners" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/partners' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Our Partners
            </Link>
            <Link 
              to="/about" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/favorites" 
              className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'fill-accent-500 text-accent-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="text-sm font-medium text-accent-500">{favorites.length}</span>
              )}
            </Link>
            <Link 
              to="/packages" 
              className="btn-primary"
            >
              Find Packages
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/destinations' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/packages" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/packages' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Packages
            </Link>
            <Link 
              to="/partners" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/partners' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Our Partners
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/about' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/contact' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Contact Us
            </Link>
            <Link 
              to="/favorites" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/favorites' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'fill-accent-500 text-accent-500' : ''}`} />
              Favorites {favorites.length > 0 && `(${favorites.length})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;