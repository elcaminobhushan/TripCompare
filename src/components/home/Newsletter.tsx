import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive exclusive offers, travel tips, and limited-time discounts directly to your inbox.
          </p>
          
          {subscribed ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-6 inline-block">
              <p className="text-white text-lg font-medium">
                Thanks for subscribing! 🎉 Check your inbox soon for exclusive deals.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="input px-4 py-3 flex-grow max-w-md rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="btn bg-white hover:bg-gray-100 text-primary-600 px-6 py-3 rounded-lg font-medium inline-flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-primary-100 text-sm mt-4">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;