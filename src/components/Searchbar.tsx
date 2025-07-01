// src/components/Searchbar.tsx

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { FiSearch } from 'react-icons/fi'; // Import a search icon

interface SearchbarProps {
  onSearch: (city: string) => void;
  isSearching: boolean;
}

export default function Searchbar({ onSearch, isSearching }: SearchbarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && !isSearching) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="ENTER A CITY OR USE YOUR LOCATION"
        className="flex-grow p-3 rounded-l-md bg-white/40 text-slate-900 placeholder-slate-500 backdrop-blur-sm border border-black/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 text-xs tracking-wider"
        disabled={isSearching}
      />
      <button
        type="submit"
        className="bg-white/40 text-slate-800 p-3 rounded-r-md backdrop-blur-sm border-y border-r border-black/10 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 flex items-center justify-center w-20 disabled:opacity-50"
        disabled={isSearching}
      >
        {isSearching ? <ClipLoader size={20} color="#5e35b1" /> : <FiSearch size={20} />}
      </button>
    </form>
  );
}