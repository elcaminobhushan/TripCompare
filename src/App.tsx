import { Routes, Route } from 'react-router-dom';
import { isSupabaseConnected } from './lib/supabase';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CompareButton from './components/layout/CompareButton';
import LoginPage from './pages/LoginPage';
import SeedDatabasePage from './pages/SeedDatabasePage';

// Pages
import HomePage from './pages/HomePage';
import PackageListingPage from './pages/PackageListingPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import DestinationsPage from './pages/DestinationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PartnersPage from './pages/PartnersPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import ComparePage from './pages/ComparePage';
import CompanyComparisonPage from './pages/CompanyComparisonPage';

function App() {
  // Check if Supabase is connected
  const supabaseConnected = isSupabaseConnected();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Supabase Connection Warning */}
      {!supabaseConnected && (
        <div className="bg-amber-50 border-b border-amber-200 p-3 text-center">
          <p className="text-amber-800 text-sm">
            Supabase is not connected. Some features may not work properly. 
            Please connect to Supabase using the "Connect to Supabase" button in the top right corner.
          </p>
        </div>
      )}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/packages" element={<PackageListingPage />} />
          <Route path="/package/:id" element={<PackageDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/company-comparison" element={<CompanyComparisonPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seed-database" element={<SeedDatabasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>        
      </main>
      <CompareButton />
      <Footer />
    </div>
  );
}

export default App;