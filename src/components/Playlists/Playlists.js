import React from 'react'
import { PlaylistsPanel } from '../PlaylistsPanel/PlaylistsPanel'
import { CurrentPlaylist } from '../CurrentPlaylist/CurrentPlaylist'
import { UserPlaylists } from '../UserPlaylists/UserPlaylists'
import './Playlists.css'

export class Playlists extends React.Component {
  state = { toggled: false }

  togglePlaylists = () => {
    this.setState({ toggled: !this.state.toggled })
  }

  render() {
    const {
      playlistName,
      defaultName,
      playlistTracks,
      onRemoveTrack,
      onNameChange,
      onSave,
      onKeyDown,
      onPlayButton,
      playingTrackID,
      isSaving,
      onUndoPlaylist,
      onRemovePlaylist
    } = this.props

    const disableRemove = playlistTracks.length === 0
    const disableUndo = disableRemove && playlistName === defaultName

    return (
      <div className="Playlists">
        <PlaylistsPanel
          disableUndo={disableUndo}
          onUndo={onUndoPlaylist}
          disableRemove={disableRemove}
          onRemove={onRemovePlaylist}
          onToggle={this.togglePlaylists}
        />
        <UserPlaylists toggled={this.state.toggled} />
        <CurrentPlaylist
          name={playlistName}
          tracks={playlistTracks}
          onRemoveTrack={onRemoveTrack}
          onNameChange={onNameChange}
          onSave={onSave}
          onKeyDown={onKeyDown}
          onPlayButton={onPlayButton}
          playingTrackID={playingTrackID}
          isSaving={isSaving}
        />
      </div>
    )
  }
}
