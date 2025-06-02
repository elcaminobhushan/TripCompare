export interface PackageImage {
  id: string;
  packageId: string;
  url: string;
  type: 'main' | 'gallery' | 'room' | 'activity' | 'dining' | 'amenity';
  title: string;
  description?: string;
  featured: boolean;
}

export const packageImages: PackageImage[] = [
  // Serene Beach Getaway Images
  {
    id: "img1",
    packageId: "p1",
    url: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
    type: "main",
    title: "Beachfront View",
    description: "Stunning ocean view from the resort",
    featured: true
  },
  {
    id: "img2",
    packageId: "p1",
    url: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    type: "room",
    title: "Deluxe Ocean Suite",
    description: "Spacious suite with private balcony",
    featured: false
  },
  {
    id: "img3",
    packageId: "p1",
    url: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
    type: "activity",
    title: "Sunset Yoga",
    description: "Daily yoga sessions on the beach",
    featured: false
  },
  
  // Swiss Alpine Adventure Images
  {
    id: "img4",
    packageId: "p2",
    url: "https://images.pexels.com/photos/356808/pexels-photo-356808.jpeg",
    type: "main",
    title: "Alpine Vista",
    description: "Panoramic mountain views",
    featured: true
  },
  {
    id: "img5",
    packageId: "p2",
    url: "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
    type: "room",
    title: "Mountain Chalet",
    description: "Cozy chalet interior with fireplace",
    featured: false
  },
  {
    id: "img6",
    packageId: "p2",
    url: "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg",
    type: "activity",
    title: "Ski Slopes",
    description: "Professional ski instruction available",
    featured: false
  }
];

export const getPackageImages = (packageId: string): PackageImage[] => {
  return packageImages.filter(image => image.packageId === packageId);
};

export const getPackageMainImage = (packageId: string): PackageImage | undefined => {
  return packageImages.find(image => image.packageId === packageId && image.type === 'main');
};

export const getPackageGalleryImages = (packageId: string): PackageImage[] => {
  return packageImages.filter(image => 
    image.packageId === packageId && 
    image.type !== 'main'
  );
};