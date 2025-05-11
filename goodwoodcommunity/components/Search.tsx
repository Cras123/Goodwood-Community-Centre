import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const Search: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex items-center">
      {/* Only display the search icon if the search input is closed */}
      {!isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          <FiSearch size={20} />
        </button>
      )}

      {/* Inline Expanding Search Input */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "w-36 ml-2 opacity-100" : "w-0 ml-0 opacity-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg outline-none"
        />
      </div>

      {/* Only display the close button when the search input is open */}
      {isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(false)}
          className="ml-2 text-gray-500 hover:text-red-500 transition"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};

export default Search;
