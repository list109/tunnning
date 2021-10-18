import React from 'react'
import './Player.css'
import { Icons } from '../Icons/Icons'

export class Player extends React.Component {
  getStateHandler = callback => {
    return e => {
      const fraction = this.getStateFraction(e)
      const percentages = (fraction * 100).toFixed(1)
      const { firstElementChild: child } = e.currentTarget
      child.style.width = `${
        (percentages > 95 && 100) || (percentages < 5 && 0.01) || percentages
      }%`

      callback()
    }
  }

  getStateFraction = ({ currentTarget: elem, pageX }) => {
    const { left, right } = elem.getBoundingClientRect()
    const width = right - left
    const relPos = pageX - left
    return relPos / width
  }

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
            {Icons.get('replay', 24)}
          </button>
          <button className="player-button" type="button" onClick={onPauseClick}>
            {paused ? Icons.get('play') : Icons.get('pause')}
          </button>
          <button className="player-forward" type="button" onClick={onForwardClick}>
            {Icons.get('forward', 24)}
          </button>
          <div className="player-playback-total" onClick={this.getStateHandler(onPlaybackClick)}>
            <span className="player-playback-passed" style={{ width: '25%' }}></span>
          </div>
          <p className="player-time">
            <time className="player-time-passed">00:14</time>
            <time className="player-time-duration">00:31</time>
          </p>
          <button className="player-mute" type="button" onClick={onMuteClick}>
            {muted ? Icons.get('volume') : Icons.get('mute')}
          </button>
          <div className="player-volume-total" onClick={this.getStateHandler(onVolumeClick)}>
            <span className="player-volume-level" style={{ width: '25%' }}></span>
          </div>
        </div>
      </div>
    )

    return sample && player
  }
}
