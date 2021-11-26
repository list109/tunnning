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
      onKeyDown,
      onPlayButton,
      playingTrackID,
      onUndoPlaylist,
      onSavePlaylist,
      userPlaylists,
      onLoadPlaylists,
      onRenamePlaylist,
      isSaving
    } = this.props

    const { isToggled } = this.state

    const disableUndo = playlistTracks.length === 0 && playlistName === defaultName

    return (
      <div className={`Playlists`}>
        <PlaylistsPanel onToggle={this.togglePlaylists} />
        <UserPlaylists
          isToggled={isToggled}
          playlists={userPlaylists}
          onLoad={onLoadPlaylists}
          onRenamePlaylist={onRenamePlaylist}
        />
        <CurrentPlaylist
          name={playlistName}
          tracks={playlistTracks}
          disableUndo={disableUndo}
          playingTrackID={playingTrackID}
          isSaving={isSaving}
          onNameChange={onNameChange}
          onUndo={onUndoPlaylist}
          onSave={onSavePlaylist}
          onKeyDown={onKeyDown}
          onRemoveTrack={onRemoveTrack}
          onPlayButton={onPlayButton}
        />
      </div>
    )
  }
}
