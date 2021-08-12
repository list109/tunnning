import React from 'react'
import './SearchBar.css'

export function SearchBar({ searchTerm, onChange, onSearch }) {
  const handleChange = ({ target }) => onChange(target.value)

  return (
    <div className="SearchBar">
      <input
        value={searchTerm}
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleChange}
      />
      <button className="SearchButton" onClick={onSearch}>
        SEARCH
      </button>
    </div>
  )
}
