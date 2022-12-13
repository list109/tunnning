import React from "react";
import { Icons } from "../Icons/Icons";
import { CurrentPlaylist } from "../CurrentPlaylist/CurrentPlaylist";
import { UserPlaylists } from "../UserPlaylists/UserPlaylists";
import "./Playlists.css";

export class Playlists extends React.Component {
  state = { isToggled: false };
  playlistsBtnRef = React.createRef();

  togglePlaylists = () => this.setState({ isToggled: !this.state.isToggled });

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
      isSaving,
      isLoading,
    } = this.props;

    const { isToggled } = this.state;

    const disableUndo =
      playlistTracks.length === 0 && playlistName === defaultName;

    return (
      <div className={`Playlists`}>
        <button
          type="button"
          className="Playlists-button"
          onClick={this.togglePlaylists}
          ref={this.playlistsBtnRef}
        >
          {Icons.get("playlists", 20)}
        </button>
        <div className="Playlists-container">
          <UserPlaylists
            isToggled={isToggled}
            playlists={userPlaylists}
            onLoad={onLoadPlaylists}
            onRenamePlaylist={onRenamePlaylist}
            isLoading={isLoading}
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
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSaving === true &&
      this.props.isSaving === false &&
      this.state.isToggled === false
    ) {
      this.playlistsBtnRef.current.click();
    }
  }
}
