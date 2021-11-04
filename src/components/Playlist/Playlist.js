import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export function Playlist({
  name,
  tracks,
  onRemove,
  onNameChange,
  onSave,
  onKeyDown,
  onPlayButton,
  playingTrackID,
  isSaving
}) {
  const handleNameChange = ({ target }) => onNameChange(target.value)
  const handleKeyDown = ({ code }) => onKeyDown(code)

  return (
    <div className={`Playlist ${isSaving ? 'loading' : ''}`}>
      <input value={name} onChange={handleNameChange} onKeyDown={handleKeyDown} />
      <TrackList
        tracks={tracks}
        isRemoval={true}
        onRemove={onRemove}
        onPlayButton={onPlayButton}
        playingTrackID={playingTrackID}
      />
      <button className={`Playlist-save`} onClick={onSave}>
        {isSaving ? 'SAVING...' : 'SAVE TO SPOTIFY'}
      </button>
    </div>
  )
}
