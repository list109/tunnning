import React from 'react'
import './Player.css'
import * as icons from './icons/icons'

export class Player extends React.Component {
  render() {
    const {
      paused,
      muted,
      sample,
      onReplayClick,
      onPauseClick,
      onForwardClick,
      onPlaybackClick,
      onMuteClick,
      onVolumeClick
    } = this.props

    const player = (
      <div className="player">
        <div className="container">
          <button className="player-replay" type="button" onClick={onReplayClick}>
            {icons.replay}
          </button>
          <button className="player-button" type="button" onClick={onPauseClick}>
            {paused ? icons.play : icons.pause}
          </button>
          <button className="player-forward" type="button" onClick={onForwardClick}>
            {icons.forward}
          </button>
          <div className="player-playback-total" onClick={onPlaybackClick}>
            <span className="player-playback-passed" style={{ width: '25%' }}></span>
          </div>
          <p className="player-time">
            <time className="player-passed">00:14</time>
            <time className="player-duration">00:31</time>
          </p>
          <button className="player-mute" type="button" onClick={onMuteClick}>
            {muted ? icons.mute : icons.volume}
          </button>
          <div className="player-volume-total" onClick={onVolumeClick}>
            <span className="player-volume-level" style={{ width: '25%' }}></span>
          </div>
        </div>
      </div>
    )

    return sample && player
  }
}
