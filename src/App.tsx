import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CompareButton from './components/layout/CompareButton';

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
import AIComparisonPage from './pages/AIComparisonPage';
import CompanyComparisonPage from './pages/CompanyComparisonPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
          <Route path="/ai-comparison" element={<AIComparisonPage />} />
          <Route path="/company-comparison" element={<CompanyComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <CompareButton />
      <Footer />
    </div>
  );
}

export default App;