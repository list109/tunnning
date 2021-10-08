import React from 'react'
import './SearchBar.css'

export function SearchBar({ searchTerm, onChange, onSearch, onKeyDown }) {
  const handleChange = ({ target }) => onChange(target.value)
  const handleKeyDown = ({ code }) => onKeyDown(code)

  return (
    <div className="SearchBar">
      <input
        value={searchTerm}
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="SearchButton" onClick={onSearch}>
        SEARCH
      </button>
    </div>
  )
}
