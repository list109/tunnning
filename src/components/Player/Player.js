import React from 'react'
import './Player.css'
import { Icons } from '../Icons/Icons'

export class Player extends React.Component {
  state = {
    muted: false
  }

  playerRef = React.createRef()

  processRangeChange = e => {
    const fraction = this.getFraction(e)
    const percentages = (fraction * 100).toFixed(1)
    const { firstElementChild: child } = e.currentTarget
    child.style.width = `${(percentages > 98 && 100) || (percentages < 2 && 0.01) || percentages}%`
  }

  getFraction = ({ currentTarget: elem, pageX }) => {
    const { left, right } = elem.getBoundingClientRect()
    const width = right - left
    const relPos = pageX - left
    return relPos / width
  }

  handleReplayClick = () => {}
  handleForwardClick = () => {}
  handlePlaybackClick = e => this.processRangeChange(e)
  handleMuteClick = () => this.setState({ muted: !this.state.muted })
  handleVolumeClick = e => this.processRangeChange(e)

  render() {
    const { paused, onPauseClick } = this.props

    return (
      <div className="player" ref={this.playerRef}>
        <div className="container">
          <button className="player-replay" type="button" onClick={this.handleReplayClick}>
            {Icons.get('replay', 24)}
          </button>
          <button className="player-button" type="button" onClick={onPauseClick}>
            {paused ? Icons.get('play') : Icons.get('pause')}
          </button>
          <button className="player-forward" type="button" onClick={this.handleForwardClick}>
            {Icons.get('forward', 24)}
          </button>
          <div className="player-playback-total" onClick={this.handlePlaybackClick}>
            <span className="player-playback-passed" style={{ width: '25%' }}></span>
          </div>
          <p className="player-time">
            <time className="player-time-passed">00:14</time>
            <time className="player-time-duration">00:31</time>
          </p>
          <button className="player-mute" type="button" onClick={this.handleMuteClick}>
            {this.state.muted ? Icons.get('mute') : Icons.get('volume')}
          </button>
          <div className="player-volume-total" onClick={this.handleVolumeClick}>
            <span className="player-volume-level" style={{ width: '25%' }}></span>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => (this.playerRef.current.className += ' player-set'))
  }
}
