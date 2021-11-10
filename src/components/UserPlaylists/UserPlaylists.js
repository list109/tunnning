import React from 'react'
import { Icons } from '../Icons/Icons'
import './UserPlaylists.css'

export function UserPlaylists({ toggled }) {
  return (
    <div className={`UserPlaylists${toggled ? ' animated' : ''}`}>
      <i className="UserPlaylists-icon">{Icons.get('loading')}</i>
    </div>
  )
}
