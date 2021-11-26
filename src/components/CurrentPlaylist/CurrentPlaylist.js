import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './CurrentPlaylist.css'

export class CurrentPlaylist extends React.Component {
  playlistRef = React.createRef()

  render() {
    const {
      name,
      tracks,
      onRemoveTrack,
      onNameChange,
      onSave,
      onKeyDown,
      onPlayButton,
      playingTrackID,
      isSaving
    } = this.props

    const handleNameChange = ({ target }) => onNameChange(target.value)
    const handleKeyDown = ({ code }) => onKeyDown(code)

    return (
      <div className={`Playlist${isSaving ? ' loading' : ''}`} ref={this.playlistRef}>
        <input value={name} onChange={handleNameChange} onKeyDown={handleKeyDown} />
        <TrackList
          tracks={tracks}
          isRemoval={true}
          onRemove={onRemoveTrack}
          onPlayButton={onPlayButton}
          playingTrackID={playingTrackID}
        />
        <button className={`Playlist-save`} onClick={onSave}>
          {isSaving ? 'SAVING...' : 'SAVE TO SPOTIFY'}
        </button>
      </div>
    )
  }

  componentDidMount() {
    const { current: playlist } = this.playlistRef

    playlist.style.height = playlist.offsetHeight + 'px'

    playlist.ontransitionend = ({ propertyName }) => {
      if (propertyName === 'height') {
        playlist.style.height = playlist.offsetHeight + 'px'
      }
    }
  }

  componentDidUpdate({ tracks: prevTracks }) {
    const { current: playlist } = this.playlistRef
    const { tracks } = this.props
    const { clientHeight, scrollHeight } = playlist

    if (prevTracks.length === tracks.length) return

    if (tracks.length > prevTracks.length) {
      if (clientHeight === scrollHeight) return
      playlist.style.height = playlist.scrollHeight + 'px'
    }

    if (tracks.length < prevTracks.length) {
      const prevHeight = playlist.offsetHeight
      playlist.style.height = 'auto'

      const height = playlist.offsetHeight
      playlist.style.height = prevHeight + 'px'

      getComputedStyle(playlist).getPropertyValue('height')

      playlist.style.height = height + 'px'
    }
  }
}
