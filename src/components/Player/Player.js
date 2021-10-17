import React from 'react'
import './Player.css'
import * as icons from './icons/icons'

export function Player({ paused, muted }) {
  return (
    <div className="player">
      <div className="container">
        <button className="player-replay" type="button">
          {icons.replay}
        </button>
        <button className="player-button" type="button">
          {paused ? icons.pause : icons.play}
        </button>
        <button className="player-forward" type="button">
          {icons.forward}
        </button>
        <div className="player-playback-total">
          <div className="player-playback-passed"></div>
        </div>
        <p className="player-time">
          <time className="player-passed">00:14</time>
          <time className="player-duration">00:31</time>
        </p>
        <button className="player-volume" type="button">
          {muted ? icons.mute : icons.volume}
        </button>
        <div className="player-volume-total">
          <div className="player-volume-level"></div>
        </div>
      </div>
    </div>
  )
}
