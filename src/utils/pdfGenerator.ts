import { jsPDF } from 'jspdf';
import { Package } from '../types';
import { format } from 'date-fns';
import { getPackageItinerary } from '../data/itineraries';
import { getAccommodationById } from '../data/accommodations';
import { getTransportById } from '../data/transport';
import { getActivityById } from '../data/activities';
import { getMealById } from '../data/meals';

export const generateItineraryPDF = (packageData: Package) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;
  const lineHeight = 7;
  const margin = 20;

  // Get full data
  const itinerary = getPackageItinerary(packageData.id);
  const accommodation = packageData.accommodationId ? getAccommodationById(packageData.accommodationId) : null;
  const transport = packageData.transportId ? getTransportById(packageData.transportId) : null;

  // Helper function to add text and handle line breaks
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, yPos);
    yPos += lineHeight * lines.length;
  };

  // Add header
  addText(packageData.title, 20, true);
  yPos += 5;
  addText(typeof packageData.destination === 'string' ? packageData.destination : packageData.destination?.name ?? 'Destination not specified', 14);
  yPos += 10;

  // Add package overview
  addText('Package Overview', 16, true);
  yPos += 5;
  addText(`Duration: ${packageData.duration} days`);
  addText(`Accommodation: ${accommodation?.name ?? 'Not specified'} (${accommodation?.type ?? 'Not specified'})`);
  addText(`Transport: ${transport?.type ?? 'Not specified'}`);
  yPos += 10;

  // Add itinerary
  if (itinerary && itinerary.days) {
    addText('Detailed Itinerary', 16, true);
    yPos += 10;

    itinerary.days.forEach((day) => {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPos = 20;
      }

      addText(`Day ${day.day}: ${day.title}`, 14, true);
      addText(day.description);
      
      if (day.activityIds && day.activityIds.length > 0) {
        yPos += 5;
        addText('Activities:', 12, true);
        day.activityIds.forEach(activityId => {
          const activity = getActivityById(activityId);
          if (activity) {
            addText(`• ${activity.name}`);
          }
        });
      }

      if (day.mealIds && day.mealIds.length > 0) {
        yPos += 5;
        addText('Meals:', 12, true);
        const mealNames = day.mealIds
          .map(mealId => getMealById(mealId)?.name)
          .filter(Boolean);
        if (mealNames.length > 0) {
          addText(`• ${mealNames.join(', ')}`);
        }
      }

      yPos += 10;
    });
  }

  // Add inclusions and exclusions
  if (yPos > doc.internal.pageSize.getHeight() - 80) {
    doc.addPage();
    yPos = 20;
  }

  if (packageData.inclusions && packageData.inclusions.length > 0) {
    addText('Inclusions', 14, true);
    packageData.inclusions.forEach(inclusion => {
      addText(`• ${inclusion}`);
    });
  }

  yPos += 10;
  
  if (packageData.exclusions && packageData.exclusions.length > 0) {
    addText('Exclusions', 14, true);
    packageData.exclusions.forEach(exclusion => {
      addText(`• ${exclusion}`);
    });
  }

  // Add footer
  const today = format(new Date(), 'MMMM dd, yyyy');
  doc.setFontSize(10);
  doc.text(`Generated on ${today} by TripCompare`, margin, doc.internal.pageSize.getHeight() - 10);

  // Save the PDF
  doc.save(`${packageData.title.toLowerCase().replace(/\s+/g, '-')}-itinerary.pdf`);
};