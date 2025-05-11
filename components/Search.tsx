import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex items-center w-full max-w-xs">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#00855e]"
      />
    </div>
  );
};

export default Search;
