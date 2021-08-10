import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export function Playlist({ name, tracks }) {
  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" />
      <TrackList tracks={tracks}></TrackList>
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}
