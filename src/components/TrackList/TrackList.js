import React from 'react'
import { Track } from '../Track/Track'
import './TrackList.css'

export function TrackList({ tracks }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track {...track} />
      ))}
    </div>
  )
}
