import React from 'react'
import { Track } from '../Track/Track'
import './TrackList.css'

export function TrackList() {
  return (
    <div className="TrackList">
      <Track name="name" artist="artist" album="album" />
      <Track name="name" artist="artist" album="album" />
      <Track name="name" artist="artist" album="album" />
    </div>
  )
}
