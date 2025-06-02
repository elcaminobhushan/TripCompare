import { Package } from '../types';

export const formatPrice = (price: number): string => {
  // Format number with commas for Indian numbering system (e.g., 1,00,000)
  const formattedPrice = price.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'decimal'
  });
  return `₹${formattedPrice}`;
};

export const formatPriceRange = (min: number, max: number): string => {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

export const calculateFinalPrice = (pkg: Package): number => {
  return pkg.discount 
    ? Math.round(pkg.price * (1 - pkg.discount / 100))
    : pkg.price;
};

export const calculateSavedAmount = (pkg: Package): number => {
  return pkg.discount 
    ? Math.round(pkg.price * (pkg.discount / 100))
    : 0;
};