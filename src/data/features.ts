export interface Feature {
  id: string;
  type: 'inclusion' | 'exclusion';
  title: string;
  description?: string;
  icon?: string;
  packageIds: string[];
}

export const features: Feature[] = [
  {
    id: "feat1",
    type: "inclusion",
    title: "Round-trip international flights",
    description: "International flights from major airports",
    packageIds: ["p1", "p2"]
  },
  {
    id: "feat2",
    type: "inclusion",
    title: "Airport transfers",
    description: "Private airport pickup and drop-off",
    packageIds: ["p1", "p2", "p3", "p4"]
  },
  {
    id: "feat3",
    type: "inclusion",
    title: "Daily breakfast",
    description: "Buffet breakfast at hotel restaurant",
    packageIds: ["p1", "p2", "p3", "p4", "p5", "p6"]
  },
  {
    id: "feat4",
    type: "inclusion",
    title: "Welcome dinner",
    description: "Traditional welcome dinner experience",
    packageIds: ["p1", "p5", "p6"]
  },
  {
    id: "feat5",
    type: "inclusion",
    title: "Guided tours",
    description: "Professional English-speaking guides",
    packageIds: ["p1", "p2", "p5", "p6"]
  },
  {
    id: "feat6",
    type: "exclusion",
    title: "Travel insurance",
    description: "Personal travel and medical insurance",
    packageIds: ["p1", "p2", "p3", "p4", "p5", "p6"]
  },
  {
    id: "feat7",
    type: "exclusion",
    title: "Optional activities",
    description: "Additional activities not in itinerary",
    packageIds: ["p1", "p2", "p3", "p4", "p5", "p6"]
  },
  {
    id: "feat8",
    type: "exclusion",
    title: "Personal expenses",
    description: "Shopping, phone calls, laundry, etc.",
    packageIds: ["p1", "p2", "p3", "p4", "p5", "p6"]
  }
];

export const getPackageFeatures = (packageId: string): { inclusions: Feature[], exclusions: Feature[] } => {
  const packageFeatures = features.filter(feature => feature.packageIds.includes(packageId));
  return {
    inclusions: packageFeatures.filter(feature => feature.type === 'inclusion'),
    exclusions: packageFeatures.filter(feature => feature.type === 'exclusion')
  };
};

export const getFeatureById = (id: string): Feature | undefined => {
  return features.find(feature => feature.id === id);
};