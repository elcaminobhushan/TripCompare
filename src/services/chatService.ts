import { ChatResponseData } from '../types/chat';
import { getPackageById } from '../data/packages';
import { getPackageItinerary } from '../data/itineraries';
import { getAccommodationById } from '../data/accommodations';
import { getActivityById } from '../data/activities';
import { getTransportById } from '../data/transport';
import { formatPrice } from '../utils/formatters';

export const processUserInput = (input: string): ChatResponseData => {
  // Get stored response if available
  const storedResponse = localStorage.getItem('initialAIResponse');
  let packages = [];
  let packageIds = [];

  if (storedResponse) {
    try {
      const parsedResponse = JSON.parse(storedResponse);
      if (parsedResponse.packages) {
        packages = parsedResponse.packages;
        packageIds = packages.map((p: any) => p.id);
      }
      // Clear stored response after using it
      localStorage.removeItem('initialAIResponse');
    } catch (e) {
      console.error('Error parsing stored response:', e);
    }
  }

  // Get package data
  const packageData = packages.length > 0 
    ? packages.map((pkg: any) => getPackageById(pkg.id)).filter(Boolean)
    : [getPackageById('p1')];

  const firstPackage = packageData[0];
  const packageResponse = firstPackage ? {
    packageId: firstPackage.id,
    itinerary: getPackageItinerary(firstPackage.id),
    accommodation: firstPackage.accommodationId ? getAccommodationById(firstPackage.accommodationId) : null,
    transport: firstPackage.transportIds?.map(id => getTransportById(id)).filter(Boolean) || [],
    activities: getPackageItinerary(firstPackage.id)?.reduce((acc: any[], day) => {
      const dayActivities = day.activities.map(id => getActivityById(id)).filter(Boolean);
      return [...acc, ...dayActivities];
    }, []) || []
  } : null;

  // Normalize input
  const normalizedInput = input.toLowerCase().trim();

  // Generate comparison response for multiple packages
  if (packageData.length > 1 && (normalizedInput.includes('compare') || normalizedInput.includes('difference'))) {
    const comparisonRows = packageData.map(pkg => [
      pkg.title,
      formatPrice(pkg.price),
      `${pkg.duration} days`,
      `${pkg.rating}/5 (${pkg.reviews} reviews)`,
      pkg.inclusions.length + ' inclusions'
    ]);

    return {
      type: 'composite',
      content: `Here's a comparison of ${packageData.map(p => p.title).join(' and ')}:`,
      data: {
        text: `I'll help you compare these packages based on price, duration, and features.`,
        table: {
          headers: ['Package', 'Price', 'Duration', 'Rating', 'Features'],
          rows: comparisonRows
        },
        images: packageData.map(pkg => ({
          url: pkg.image,
          caption: pkg.title
        }))
      },
      package: packageResponse
    };
  }

  // Default response with package info
  return {
    type: 'composite',
    content: packageData.length > 1 
      ? `I can help you compare these packages. What would you like to know about them?`
      : `I can help you learn more about the ${firstPackage?.title}. What would you like to know?`,
    data: {
      text: packageData.length > 1
        ? `Let me know what aspects you'd like to compare between these packages.`
        : `I can tell you about the activities, accommodation, pricing, or any other details.`,
      table: {
        headers: ['Feature', 'Details', 'Rating'],
        rows: [
          ['Package', firstPackage?.title || 'N/A', '⭐⭐⭐⭐⭐'],
          ['Price', formatPrice(firstPackage?.price || 0), '⭐⭐⭐⭐'],
          ['Duration', `${firstPackage?.duration || 0} days`, '⭐⭐⭐⭐⭐']
        ]
      }
    },
    package: packageResponse
  };
};