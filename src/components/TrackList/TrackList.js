import React from 'react'
import { Track } from '../Track/Track'
import './TrackList.css'

export function TrackList({ tracks, isRemoval, onAdd, onRemove }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track
          id={track.id}
          track={track}
          isRemoval={isRemoval}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
