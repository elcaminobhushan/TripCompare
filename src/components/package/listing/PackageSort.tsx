import React from 'react';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'duration-short' | 'duration-long';

interface PackageSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  compareCount: number;
}

const PackageSort: React.FC<PackageSortProps> = ({
  sortOption,
  onSortChange,
  compareCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center">
        <span className="text-gray-700 mr-2">Sort by:</span>
        <select
          className="select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating</option>
          <option value="duration-short">Duration (Shortest)</option>
          <option value="duration-long">Duration (Longest)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm ${compareCount > 0 ? 'text-primary-600' : 'text-gray-500'}`}>
          {compareCount} package{compareCount !== 1 ? 's' : ''} selected
        </span>
      </div>
    </div>
  );
};

export default PackageSort;