import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export function Playlist() {
  return (
    <div className="Playlist">
      <input value="New Playlist" />
      <TrackList></TrackList>
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}
