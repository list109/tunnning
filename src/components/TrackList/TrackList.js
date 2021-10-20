import React from 'react'
import { Track } from '../Track/Track'
import './TrackList.css'

export function TrackList({ tracks, isRemoval, onAdd, onRemove, onPlayButton, playingTrackID }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          isRemoval={isRemoval}
          onAdd={onAdd}
          onRemove={onRemove}
          onPlayButton={onPlayButton}
          playingTrackID={playingTrackID}
        />
      ))}
    </div>
  )
}
