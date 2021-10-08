import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export function Playlist({ name, tracks, onRemove, onNameChange, onSave, onKeyDown }) {
  const handleNameChange = ({ target }) => onNameChange(target.value)
  const handleKeyDown = ({ code }) => onKeyDown(code)

  return (
    <div className="Playlist">
      <input value={name} onChange={handleNameChange} onKeyDown={handleKeyDown} />
      <TrackList tracks={tracks} isRemoval={true} onRemove={onRemove} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}
