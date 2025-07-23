import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, LogIn } from 'lucide-react';
import { useFavoritesStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import logo from '../images/logo_only.png'; // adjust path if needed


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
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
    // Check for current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
          <img
    src={logo} // path to your logo image
    alt="TripCompare Logo"
    className="h-8 w-8 object-contain"
  />
            <span className="font-bold text-2xl text-primary-600">TripCompare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
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
              Partners
            </Link>
            <Link 
              to="/about" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium hover:text-primary-600 transition-colors ${
                location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
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
              className="btn-primary px-4 py-2"
            >
              Find Packages
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 p-2"
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
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-lg max-h-screen overflow-y-auto">
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
              Partners
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/about' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center gap-2 font-medium p-2 rounded-lg ${
                location.pathname === '/contact' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Contact
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
            <Link 
              to="/packages" 
              className="btn-primary w-full text-center py-3 mt-4"
            >
              Find Packages
            </Link>
          </nav>
          {user ? (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <Link 
                to="/login"
                className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;