import React from "react";
import "./SearchBar.css";

export function SearchBar({
  searchTerm,
  onChange,
  onSearch,
  onKeyDown,
  isSearching,
  validation,
}) {
  const handleChange = ({ target }) => onChange(target.value);
  const handleKeyDown = ({ code }) => onKeyDown(code);

  return (
    <div className="SearchBar">
      <div className={`SearchBox ${validation.search ? "" : " invalid"}`}>
        <input
          value={searchTerm}
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className={`SearchButton${isSearching ? " searching" : ""}`}
        onClick={onSearch}
      >
        SEARCH
      </button>
    </div>
  );
}
