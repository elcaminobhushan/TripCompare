import React, { useState } from 'react';
import { seedDatabase } from '../data/seed-data';
import { Database, Loader2, CheckCircle, XCircle } from 'lucide-react';

const SeedDatabasePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const result = await seedDatabase();
      setSuccess(result.success);
      if (!result.success) {
        setError(String(result.error));
      }
    } catch (err) {
      setSuccess(false);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Database className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Seed Database</h1>
            <p className="text-gray-600 mb-8 text-center">
              This will populate your Supabase database with initial data from the local data files.
              Make sure you have connected to Supabase first.
            </p>

            {success === true && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <p className="text-green-700">Database seeded successfully!</p>
              </div>
            )}

            {success === false && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <p className="text-red-700 font-medium">Failed to seed database</p>
                </div>
                {error && <p className="text-red-600 text-sm ml-8">{error}</p>}
              </div>
            )}

            <button
              onClick={handleSeedDatabase}
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                'Seed Database'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDatabasePage;