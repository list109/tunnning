import React from "react";
import { Playlist } from "../Playlist/Playlist";
import { Icons } from "../Icons/Icons";
import "./UserPlaylists.css";

export class UserPlaylists extends React.Component {
  containerRef = React.createRef();

  render() {
    const { playlists, onLoad } = this.props;
    const failedLoading = typeof playlists[0] === "string";
    const getMessage = (message) => (
      <p className="UserPlaylists-message">{message}</p>
    );
    const content = failedLoading
      ? getMessage(playlists[0])
      : this.getPlaylistsTemplate(playlists);

    const icon = <i className="UserPlaylists-icon">{Icons.get("loading")}</i>;

    return (
      <div className="UserPlaylists" ref={this.containerRef}>
        <h2>
          User's playlists
          <button className="UserPlaylists-button" onClick={onLoad}>
            {Icons.get("reload", 26)}
          </button>
        </h2>
        {playlists.length ? content : icon}
      </div>
    );
  }

  getPlaylistsTemplate(playlists) {
    return playlists.map(({ id, name, tracks, isRenaming }) => (
      <Playlist
        key={id}
        id={id}
        name={name}
        length={tracks.total || 0}
        onRename={this.props.onRenamePlaylist}
        isRenaming={isRenaming}
      />
    ));
  }

  changeClasses() {
    const { current: container } = this.containerRef;
    const { playlists, isToggled } = this.props;

    if (playlists.length < 1 && isToggled) {
      setTimeout(() => container.classList.add("loading"));
    }

    if (playlists.length) container.classList.remove("loading");

    container.classList[isToggled ? "add" : "remove"]("toggled");
  }

  resizeContainer = ({
    isToggled: prevIsToggled,
    playlists: prevPlaylists,
  }) => {
    const { current: container } = this.containerRef;
    const { isToggled, playlists } = this.props;

    const noToggle = prevIsToggled === isToggled;
    const noChange = playlists.length === prevPlaylists.length;

    if (noToggle && isToggled === false) return;
    if (noToggle && noChange) return;

    // the min height is required for the container to extend with fix value whilst data is loading
    // when toggled the height can't go beside two fix values, that is min and max
    container.style.height = `${
      isToggled ? Math.min(Math.max(container.scrollHeight, 400), 500) : 0
    }px`;
  };

  startLoading() {
    const { isToggled, playlists, onLoad } = this.props;
    if (playlists.length < 1 && isToggled) onLoad();
  }

  componentDidMount() {
    const { current: container } = this.containerRef;
    container.style.height = "0px";
  }

  componentDidUpdate(prevProps) {
    this.startLoading();
    this.changeClasses();
    this.resizeContainer(prevProps);
  }
}
