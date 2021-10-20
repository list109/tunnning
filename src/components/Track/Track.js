import React from 'react'
import { Icons } from '../Icons/Icons'
import './Track.css'

export function Track({ track, isRemoval, onAdd, onRemove, onPlayButton, playingTrackID = null }) {
  const { name, artists, album, id } = track
  const isRepeated = playingTrackID === id
  const handleMoveTrack = () => (isRemoval ? onRemove(track) : onAdd(track))
  const handlePlayButton = () => onPlayButton(track, isRepeated)
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>
          {artists[0]?.name} | {album?.name}
        </p>
      </div>
      <button type="button" className="Track-play" onClick={handlePlayButton}>
        {isRepeated ? Icons.get('pause') : Icons.get('play')}
      </button>
      <button type="button" className="Track-action" onClick={handleMoveTrack}>
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  )
}
