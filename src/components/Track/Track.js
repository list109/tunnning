import React from 'react'
import './Track.css'

export function Track({ track, isRemoval, onAdd, onRemove }) {
  const { name, artists, album } = track
  const handleClick = () => (isRemoval ? onRemove(track) : onAdd(track))

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>
          {artists[0]?.name} | {album?.name}
        </p>
      </div>
      <button type="button" className="Track-action" onClick={handleClick}>
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  )
}
