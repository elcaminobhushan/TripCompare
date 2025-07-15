import { Package } from '../types';

export const generateItineraryPDF = (packageData: Package) => {
  // PDF generation temporarily disabled - would require jsPDF library
  console.log('PDF generation for:', packageData.title);
  alert('PDF download feature will be available soon!');
};