import React from 'react'
import './Track.css'

export function Track({ track, isRemoval, onClick }) {
  const { name, artist, album } = track
  const handleClick = () => onClick(track)

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      <button className="Track-action" onClick={handleClick}>
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  )
}
