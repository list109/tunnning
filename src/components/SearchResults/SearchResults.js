import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './SearchResults.css'

export function SearchResults({ results, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={results} isRemoval={false} onAdd={onAdd} />
    </div>
  )
}
