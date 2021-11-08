import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import { Icons } from '../Icons/Icons'
import './Playlist.css'

export class Playlist extends React.Component {
  playlistRef = React.createRef()

  render() {
    const {
      name,
      defaultName,
      tracks,
      onRemove,
      onUndo,
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

    const disableRemove = tracks.length === 0
    const disableUndo = disableRemove && name === defaultName

    return (
      <div className={`Playlist${isSaving ? ' loading' : ''}`} ref={this.playlistRef}>
        <div className="Playlist-panel">
          <button
            type="button"
            className="Playlist-undo"
            onClick={() => onUndo(defaultName)}
            disabled={disableUndo}
          >
            {Icons.get('undo')}
          </button>
          <button
            type="button"
            className="Playlist-remove"
            onClick={onRemove}
            disabled={disableRemove}
          >
            {Icons.get('remove')}
          </button>
        </div>
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
    const { clientHeight, scrollHeight } = playlist

    if (prevTracks.length === this.props.tracks.length) return

    if (this.props.tracks.length > prevTracks.length) {
      if (clientHeight === scrollHeight) return
      playlist.style.height = playlist.scrollHeight + 'px'
    }

    if (this.props.tracks.length < prevTracks.length) {
      const prevHeight = playlist.offsetHeight

      playlist.style.height = 'auto'

      const height = playlist.offsetHeight

      playlist.style.height = prevHeight + 'px'
      getComputedStyle(playlist).getPropertyValue('height')
      playlist.style.height = height + 'px'
    }
  }
}
