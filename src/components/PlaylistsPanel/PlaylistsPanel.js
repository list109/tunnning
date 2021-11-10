import React from 'react'
import { Icons } from '../Icons/Icons'
import './PlaylistsPanel.css'

export function PlaylistsPanel({ disableUndo, onUndo, disableRemove, onRemove, onToggle }) {
  return (
    <div className={'PlaylistPanel'}>
      <button type="button" className="PlaylistPanel-list" onClick={onToggle}>
        {Icons.get('playlists', 20)}
      </button>
      <button type="button" className="PlaylistPanel-undo" onClick={onUndo} disabled={disableUndo}>
        {Icons.get('undo')}
      </button>
      <button
        type="button"
        className="PlaylistPanel-remove"
        onClick={onRemove}
        disabled={disableRemove}
      >
        {Icons.get('remove')}
      </button>
    </div>
  )
}
