import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './SearchResults.css'

export function SearchResults({ results, onAdd, onPlayButton, playingTrackID }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList
        tracks={results}
        isRemoval={false}
        onAdd={onAdd}
        onPlayButton={onPlayButton}
    </div>
  )
}
