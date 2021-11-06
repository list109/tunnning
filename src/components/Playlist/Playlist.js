import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import { Icons } from '../Icons/Icons'
import './Playlist.css'

export function Playlist({
  name,
  defaultName,
  tracks,
  onRemove,
  onUndo,
  onRemoveTrack,
  onNameChange,
  onSave,
  onKeyDown,
  onPlayButton,
  playingTrackID,
  isSaving
}) {
  const handleNameChange = ({ target }) => onNameChange(target.value)
  const handleKeyDown = ({ code }) => onKeyDown(code)
  const handleUndo = () => onUndo(defaultName)

  const disableRemove = tracks.length === 0
  const disableUndo = disableRemove && name === defaultName
  debugger
  return (
    <div className={`Playlist ${isSaving ? 'loading' : ''}`}>
      <div className="Playlist-panel">
        <button type="button" className="Playlist-undo" onClick={handleUndo} disabled={disableUndo}>
          {Icons.get('undo')}
        </button>
        <button
          type="button"
          className="Playlist-remove"
          onClick={onRemove}
          disabled={disableRemove}
        >
          {Icons.get('remove')}
        </button>
      </div>
      <input value={name} onChange={handleNameChange} onKeyDown={handleKeyDown} />
      <TrackList
        tracks={tracks}
        isRemoval={true}
        onRemove={onRemoveTrack}
        onPlayButton={onPlayButton}
        playingTrackID={playingTrackID}
      />
      <button className={`Playlist-save`} onClick={onSave}>
        {isSaving ? 'SAVING...' : 'SAVE TO SPOTIFY'}
      </button>
    </div>
  )
}
