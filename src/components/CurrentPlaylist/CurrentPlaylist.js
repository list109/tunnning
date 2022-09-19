import React from "react";
import { TrackList } from "../TrackList/TrackList";
import { Icons } from "../Icons/Icons";
import "./CurrentPlaylist.css";

export class CurrentPlaylist extends React.Component {
  playlistRef = React.createRef();

  render() {
    const {
      name,
      tracks,
      disableUndo,
      onUndo,
      onRemoveTrack,
      onNameChange,
      onSave,
      onKeyDown,
      onPlayButton,
      playingTrackID,
      isSaving,
    } = this.props;

    const handleNameChange = ({ target }) => onNameChange(target.value);
    const handleKeyDown = ({ code }) => onKeyDown(code);

    return (
      <div
        className={`CurrentPlaylist${isSaving ? " saving" : ""}`}
        ref={this.playlistRef}
      >
        <div className={"CurrentPlaylist-input"}>
          <input
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="CurrentPlaylist-undo"
            disabled={disableUndo}
            onClick={onUndo}
          >
            {Icons.get("undo")}
          </button>
        </div>
        <TrackList
          tracks={tracks}
          isRemoval={true}
          onRemove={onRemoveTrack}
          onPlayButton={onPlayButton}
          playingTrackID={playingTrackID}
          droppableId="playlistTracks"
          isDropDisabled={isSaving}
        />
        <button className={`CurrentPlaylist-save`} onClick={onSave}>
          {isSaving ? "SAVING..." : "SAVE TO SPOTIFY"}
        </button>
      </div>
    );
  }

  componentDidMount() {
    const { current: playlist } = this.playlistRef;
    playlist.style.height = playlist.offsetHeight + "px";

    playlist.ontransitionend = ({ propertyName }) => {
      if (propertyName === "height") {
        playlist.style.height = playlist.offsetHeight + "px";
      }
    };
  }

  componentDidUpdate({ tracks: prevTracks }) {
    const { current: playlist } = this.playlistRef;
    const { tracks } = this.props;
    const { clientHeight, scrollHeight } = playlist;

    if (prevTracks.length === 0 && tracks.length === 1) {
    }

    if (prevTracks.length === tracks.length) return;

    if (tracks.length > prevTracks.length) {
      if (clientHeight === scrollHeight) return;
      playlist.style.height = playlist.scrollHeight + "px";
    }

    if (tracks.length < prevTracks.length) {
      const prevHeight = playlist.offsetHeight;
      playlist.style.height = "auto";

      const height = playlist.offsetHeight;
      playlist.style.height = prevHeight + "px";

      getComputedStyle(playlist).getPropertyValue("height");

      playlist.style.height = height + "px";
    }
  }
}
