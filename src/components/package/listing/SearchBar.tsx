import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  selectedDate: string;
  onSearchChange: (query: string) => void;
  onDateChange: (date: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  selectedDate,
  onSearchChange,
  onDateChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search destinations or packages"
          className="input pl-10 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <input
        type="date"
        className="input w-48"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />
      <button className="btn-primary w-48">
        <Search className="h-4 w-4 mr-2" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;