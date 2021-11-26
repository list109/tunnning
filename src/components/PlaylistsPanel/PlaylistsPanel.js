import React from 'react'
import { Icons } from '../Icons/Icons'
import './PlaylistsPanel.css'

export function PlaylistsPanel({ onToggle }) {
  return (
    <div className={'PlaylistPanel'}>
      <button type="button" className="PlaylistPanel-list" onClick={onToggle}>
        {Icons.get('playlists', 20)}
      </button>
    </div>
  )
}
