import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import FeaturedPackages from '../components/home/FeaturedPackages';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Partners from '../components/home/Partners';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedDestinations />
      <FeaturedPackages />
      <Partners />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;