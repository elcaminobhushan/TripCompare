import { supabase } from '../lib/supabase';
import { destinations } from './destinations';
import { tourOperators } from './tour-operators';
import { accommodations } from './accommodations';
import { packages } from './packages';
import { activities } from './activities';
import { transport } from './transport';
import { itineraries } from './itineraries';
import { reviews } from './reviews';

export async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    // Insert destinations
    console.log('Seeding destinations...');
    for (const destination of destinations) {
      const { error } = await supabase.from('destinations').upsert({
        id: destination.id,
        name: destination.name,
        country: destination.country,
        image: destination.image,
        description: destination.description,
        popular_months: destination.popularMonths,
        climate: destination.climate,
        languages: destination.languages,
        currency: destination.currency,
        time_zone: destination.timeZone,
        trending: destination.trending,
        searches: destination.searches
      });
      
      if (error) {
        console.error('Error inserting destination:', error);
      }
    }
    
    // Insert tour operators
    console.log('Seeding tour operators...');
    for (const operator of tourOperators) {
      const { error } = await supabase.from('tour_operators').upsert({
        id: operator.id,
        name: operator.name,
        logo: operator.logo,
        description: operator.description,
        rating: operator.rating,
        reviews: operator.reviews,
        years_in_business: operator.yearsInBusiness,
        specializations: operator.specializations,
        certifications: operator.certifications
      });
      
      if (error) {
        console.error('Error inserting tour operator:', error);
      }
    }
    
    // Insert accommodations
    console.log('Seeding accommodations...');
    for (const accommodation of accommodations) {
      const { error } = await supabase.from('accommodations').upsert({
        id: accommodation.id,
        name: accommodation.name,
        type: 'hotel', // Default type since not specified in current data
        rating: accommodation.rating,
        image: accommodation.image,
        location: accommodation.location,
        description: accommodation.description
      });
      
      if (error) {
        console.error('Error inserting accommodation:', error);
      }
    }
    
    // Insert transports
    console.log('Seeding transports...');
    for (const item of transport) {
      const { error } = await supabase.from('transports').upsert({
        id: item.id,
        type: item.type,
        name: item.name,
        description: item.description
      });
      
      if (error) {
        console.error('Error inserting transport:', error);
      }
    }
    
    // Insert activities
    console.log('Seeding activities...');
    for (const activity of activities) {
      const { error } = await supabase.from('activities').upsert({
        id: activity.id,
        name: activity.name,
        type: activity.type,
        description: activity.description,
        duration: 60, // Default duration in minutes
        difficulty: 'easy', // Default difficulty
        image: activity.image || '',
        included: true, // Default to included
        price: null,
        minimum_age: null
      });
      
      if (error) {
        console.error('Error inserting activity:', error);
      }
    }
    
    // Insert meals (create basic meal entries based on package meal data)
    console.log('Seeding meals...');
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    for (const mealType of mealTypes) {
      const { error } = await supabase.from('meals').upsert({
        id: `meal_${mealType.toLowerCase()}`,
        name: mealType,
        type: mealType.toLowerCase(),
        cuisine: 'international',
        description: `${mealType} meal included in package`,
        image: '',
        included: true,
        price: null
      });
      
      if (error) {
        console.error('Error inserting meal:', error);
      }
    }
    
    // Insert packages
    console.log('Seeding packages...');
    for (const pkg of packages) {
      const { error } = await supabase.from('packages').upsert({
        id: pkg.id,
        title: pkg.title,
        destination_id: pkg.destinationId,
        image: pkg.mainImage,
        price: pkg.price,
        currency: pkg.currency,
        duration_days: pkg.duration_days,
        duration_nights: pkg.duration_nights,
        rating: 4.5, // Default rating
        reviews: 0, // Default review count
        description: pkg.description,
        accommodation_id: null, // Will be handled separately
        tour_operator_id: pkg.tourOperatorId,
        featured: pkg.featured || false,
        discount: pkg.discount || null
      });
      
      if (error) {
        console.error('Error inserting package:', error);
      }
    }
    
    // Insert itineraries
    console.log('Seeding itineraries...');
    for (const day of itineraries) {
      const { error } = await supabase.from('itinerary_days').upsert({
        id: day.id,
        package_id: day.packageId,
        day: day.day,
        title: day.title,
        description: day.description,
        notes: day.notes
      });
      
      if (error) {
        console.error('Error inserting itinerary day:', error);
      }
    }
    
    // Insert reviews
    console.log('Seeding reviews...');
    for (const review of reviews) {
      const { error } = await supabase.from('reviews').upsert({
        id: review.id,
        package_id: review.packageId,
        user_id: review.userId,
        rating: review.rating,
        title: review.title,
        content: review.content,
        date: review.date,
        likes: review.likes,
        verified: review.verified
      });
      
      if (error) {
        console.error('Error inserting review:', error);
      }
    }
    
    console.log('Database seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}