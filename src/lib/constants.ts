// Site configuration
export const siteConfig = {
  name: 'TripCompare',
  description: 'Compare and book the best holiday packages',
  url: 'https://tripcompare.com',
  ogImage: 'https://tripcompare.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/tripcompare',
    github: 'https://github.com/tripcompare',
  },
};

// Navigation
export const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Destinations', href: '/destinations' },
  { title: 'Packages', href: '/packages' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
] as const;

// Filter options
export const filterOptions = {
  priceRanges: [
    { label: 'Under $1000', value: [0, 1000] },
    { label: '$1000 - $2000', value: [1000, 2000] },
    { label: '$2000 - $3000', value: [2000, 3000] },
    { label: 'Over $3000', value: [3000, Infinity] },
  ],
  durations: [
    { label: '1-3 Days', value: [1, 3] },
    { label: '4-7 Days', value: [4, 7] },
    { label: '8-14 Days', value: [8, 14] },
    { label: '15+ Days', value: [15, Infinity] },
  ],
  ratings: [
    { label: '5 Stars', value: 5 },
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
  ],
  amenities: [
    'Pool',
    'Spa',
    'WiFi',
    'Gym',
    'Restaurant',
    'Bar',
    'Beach Access',
    'Room Service',
  ],
  travelThemes: [
    'Adventure',
    'Beach',
    'Cultural',
    'Family',
    'Honeymoon',
    'Luxury',
    'Wildlife',
    'Winter Sports',
  ],
} as const;

// Contact form purposes
export const contactPurposes = [
  'Package Booking',
  'General Inquiry',
  'Customer Support',
  'Feedback',
  'Business Partnership',
  'Press Inquiry',
] as const;

// Social media links
export const socialLinks = {
  facebook: 'https://facebook.com/tripcompare',
  twitter: 'https://twitter.com/tripcompare',
  instagram: 'https://instagram.com/tripcompare',
  linkedin: 'https://linkedin.com/company/tripcompare',
} as const;

// Support contact info
export const supportContact = {
  email: 'support@tripcompare.com',
  phone: '+1 (800) 123-4567',
  hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
  address: {
    street: '123 Travel Street',
    suite: 'Suite 456',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
} as const;