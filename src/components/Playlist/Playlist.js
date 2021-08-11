import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export function Playlist({ name, tracks, onRemove, onNameChange }) {
  const handleNameChange = ({ value }) => onNameChange(value)

  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" onChange={handleNameChange} />
      <TrackList tracks={tracks} isRemoval={true} onRemove={onRemove} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}
