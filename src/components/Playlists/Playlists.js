import React from 'react'
import { PlaylistsPanel } from '../PlaylistsPanel/PlaylistsPanel'
import { CurrentPlaylist } from '../CurrentPlaylist/CurrentPlaylist'
import { UserPlaylists } from '../UserPlaylists/UserPlaylists'
import './Playlists.css'

export class Playlists extends React.Component {
  state = { isToggled: false }

  togglePlaylists = () => this.setState({ isToggled: !this.state.isToggled })

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
      userPlaylists,
      onLoadPlaylists,
      onRenamePlaylist,
    } = this.props

    const disableRemove = playlistTracks.length === 0
    const disableUndo = disableRemove && playlistName === defaultName

    return (
      <div className={`Playlists`}>
        <PlaylistsPanel onToggle={this.togglePlaylists} />
        <UserPlaylists
          isToggled={isToggled}
          playlists={userPlaylists}
          onLoad={onLoadPlaylists}
          onRenamePlaylist={onRenamePlaylist}
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
