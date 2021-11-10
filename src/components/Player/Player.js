import React from 'react'
import { Icons } from '../Icons/Icons'
import './Player.css'

export class Player extends React.Component {
  state = {
    muted: false,
    volume: 0.5,
    currentPosition: 0
  }
  playerRef = React.createRef()
  volRef = React.createRef()
  playbackRef = React.createRef()
  player = new Audio(this.props.track.preview_url)

  handleRewindClick = () => {
    const { readyState, currentTime, seeking } = this.player

    if (readyState < 1 || seeking) return

    const rewoundTime = Math.max(currentTime - 10, 0)
    this.player.currentTime = rewoundTime
  }

  handlePlayClick = () => this.props.onPlayButton()

  handleNextClick = () => this.props.onNextButton()

  handleForwardClick = () => {
    const { readyState, currentTime, seeking, duration } = this.player

    if (readyState < 1 && currentTime === 0) {
      this.player.currentTime += 10
      return
    }

    if (seeking) return

    const forwardTime = Math.min(currentTime + 10, duration)
    this.player.currentTime = forwardTime
  }

  handlePlaybackClick = e => {
    const fraction = this.getFraction(e, this.playbackRef.current)
    const currentPosition =
      (fraction < 0.02 && '0') || (fraction > 0.98 && '1') || fraction.toFixed(5)

    // first set the time and then upon the successful loading, set the position to change the width as the timeupdate event is happening

    if (this.player.readyState < 1) {
      this.player.onloadedmetadata = () => {
        this.player.currentTime = (this.player.duration * currentPosition).toFixed(5) || 0
      }

      return
    }

    this.player.currentTime = (this.player.duration * currentPosition).toFixed(5) || 0
  }

  handleMuteClick = () => {
    const isMuted = !this.state.muted
    this.setState({ muted: isMuted })
  }

  handleVolumeClick = e => {
    const fraction = this.getFraction(e, this.volRef.current)
    const volume = (fraction < 0.1 && '0') || (fraction > 0.9 && '1') || fraction.toFixed(5)
    this.setState({ volume })
  }

  handleTimeUpdate = () => {
    this.setState({ currentPosition: (this.player.currentTime / this.player.duration).toFixed(5) })
  }

  handleEnded = () => this.props.onPlayEnded()

  getFraction = ({ currentTarget: container, target, clientX }, child) => {
    if (container === target) return 1

    const { left } = container.getBoundingClientRect()

    if (clientX < left) return 0

    const clickedPoint = clientX - left

    return clickedPoint / child.offsetWidth
  }

  seconds = {
    set passed(value) {
      this._passed = Math.floor(value)
    },
    set total(value) {
      this._total = Math.floor(value)
    },
    get passed() {
      return `00 : ${this.getDoublePrecision(this._passed)}`
    },
    get total() {
      return `00 : ${this.getDoublePrecision(this._total)}`
    },

    getDoublePrecision: value => (value > 9 ? value : `0${value}`)
  }

  render() {
    const { paused, track } = this.props
    const { name: songName, artists } = track
    const { currentPosition, volume, muted } = this.state
    const { duration } = this.player

    const title = track ? `${artists[0].name} - ${songName}` : ''

    this.seconds.passed = duration * currentPosition || 0
    this.seconds.total = duration || 0

    return (
      <div className="Player" ref={this.playerRef}>
        <div className="container">
          <button className="Player-rewind" type="button" onClick={this.handleRewindClick}>
            {Icons.get('rewind', 24)}
          </button>
          <button className="Player-button" type="button" onClick={this.handlePlayClick}>
            {paused ? Icons.get('play') : Icons.get('pause')}
          </button>
          <button className="Player-next" type="button" onClick={this.handleNextClick}>
            {Icons.get('next')}
          </button>
          <button className="Player-forward" type="button" onClick={this.handleForwardClick}>
            {Icons.get('forward', 24)}
          </button>
          <div className="Player-playback" onClick={this.handlePlaybackClick}>
            <div className="Player-playback-total" ref={this.playbackRef}>
              <h2 className="Player-playback-title">{title}</h2>
              <span
                className="Player-playback-passed"
                style={{ width: currentPosition * 100 + '%' }}
              ></span>
            </div>
          </div>
          <p className="Player-time">
            <time className="Player-time-passed">{this.seconds.passed}</time>
            <time className="Player-time-duration">{this.seconds.total}</time>
          </p>
          <button className="Player-mute" type="button" onClick={this.handleMuteClick}>
            {this.state.muted ? Icons.get('mute') : Icons.get('volume')}
          </button>
          <div className="Player-volume" onClick={this.handleVolumeClick}>
            <div className="Player-volume-total" ref={this.volRef}>
              <span
                className="Player-volume-level"
                style={{ width: muted ? 0 : volume * 100 + '%' }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // canplay - playing - timeupdate - seeking - loadedmetadata - seeked - emptied
  componentDidMount() {
    setTimeout(() => (this.playerRef.current.className += ' Player-set'))

    this.player.volume = this.state.volume

    this.player.oncanplay = () => {
      if (this.props.paused) return
      this.player.play().catch(error => console.log('the play was interrupted 1'))
      console.log('canplay')
    }
    this.player.onplaying = () => {
      if (this.props.paused) return
      this.player.play().catch(error => console.log('the play was interrupted 2'))
      console.log('playing')
    }
    this.player.ontimeupdate = () => {
      this.handleTimeUpdate()
      console.log('timeupdate st')
    }
    this.player.onseeking = () => console.log('seeking')

    this.player.onseeked = () => console.log('seeked')

    this.player.onemptied = () => {
      this.setState({ currentPosition: 0 })
      console.log('emptied st')
    }
    this.player.onended = e => {
      console.log('ended st')
      this.handleEnded()
      this.setState({ currentPosition: 0 })
      this.player.currentTime = 0
    }
  }

  componentDidUpdate(prevProps) {
    const { track, paused } = this.props
    const { muted, volume } = this.state
    const current_track_url = track.preview_url
    const { preview_url: previos_track_url } = prevProps.track

    if (current_track_url !== previos_track_url) {
      this.player.onloadedmetadata = ''
      this.player.src = this.props.track.preview_url
      this.player.load()
      return
    }

    this.player.muted = muted
    this.player.volume = volume

    // if ended there will be onended event involved
    if (this.player.ended) return

    paused
      ? this.player.pause()
      : this.player.play().catch(() => console.dir('the play promise initiated was interrupted'))
  }
}
