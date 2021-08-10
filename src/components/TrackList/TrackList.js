import React from 'react'
import { Track } from '../Track/Track'
import './TrackList.css'

export function TrackList({ tracks, isRemoval, onAdd }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track id={track.id} isRemoval={isRemoval} onClick={onAdd} />
      ))}
    </div>
  )
}
